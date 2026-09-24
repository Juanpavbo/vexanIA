import type { IncomingMessage, ServerResponse } from 'http'

/**
 * POST /api/lead
 * Crea un Lead en Zoho CRM. Las credenciales viven SOLO en variables de
 * entorno de Vercel: ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN,
 * ZOHO_DC (ej: "com", "com.co", "eu").
 * Si Zoho falla, el lead igual queda registrado en los logs de Vercel
 * (fallback) y se responde 200 para no perder al visitante.
 *
 * Los campos "Interés" y "Mensaje" se guardan también como Nota ligada al
 * lead, porque la edición actual de Zoho limita la cantidad de campos
 * personalizados del módulo Leads.
 */

interface LeadBody {
  name?: string
  company?: string
  whatsapp?: string
  email?: string
  interest?: string
  message?: string
  utm?: Record<string, string>
  page?: string
}

const INTEREST_LABELS: Record<string, string> = {
  automatizacion: 'Automatización de tareas repetitivas',
  apps: 'Aplicaciones de negocio a la medida',
  agentes: 'Asistentes virtuales con IA',
  analitica: 'Reportes e inteligencia de negocio',
  nose: 'Aún no lo tiene claro',
}

function splitName(fullName: string): { first: string; last: string } {
  const parts = fullName.trim().split(/\s+/)
  if (parts.length === 1) return { first: parts[0], last: parts[0] }
  return { first: parts.slice(0, -1).join(' '), last: parts[parts.length - 1] }
}

async function getAccessToken(): Promise<string> {
  const dc = process.env.ZOHO_DC || 'com'
  const params = new URLSearchParams({
    refresh_token: process.env.ZOHO_REFRESH_TOKEN || '',
    client_id: process.env.ZOHO_CLIENT_ID || '',
    client_secret: process.env.ZOHO_CLIENT_SECRET || '',
    grant_type: 'refresh_token',
  })
  const res = await fetch(`https://accounts.zoho.${dc}/oauth/v2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  })
  if (!res.ok) {
    throw new Error(`Zoho token error: ${res.status} ${await res.text()}`)
  }
  const data = (await res.json()) as { access_token?: string }
  if (!data.access_token) throw new Error('Zoho no devolvió access_token')
  return data.access_token
}

async function readBody(req: IncomingMessage): Promise<string> {
  const chunks: Buffer[] = []
  for await (const chunk of req) chunks.push(chunk as Buffer)
  return Buffer.concat(chunks).toString('utf8')
}

export default async function handler(req: IncomingMessage & { method?: string }, res: ServerResponse) {
  const send = (status: number, body: unknown) => {
    res.statusCode = status
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(body))
  }

  if (req.method !== 'POST') {
    return send(405, { ok: false, error: 'Method not allowed' })
  }

  let body: LeadBody
  try {
    body = JSON.parse(await readBody(req)) as LeadBody
  } catch {
    return send(400, { ok: false, error: 'JSON inválido' })
  }

  const name = (body.name || '').trim()
  const company = (body.company || '').trim()
  const email = (body.email || '').trim()
  const whatsapp = (body.whatsapp || '').trim()
  if (!name || !company || (!email && !whatsapp)) {
    return send(400, { ok: false, error: 'Faltan campos obligatorios' })
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return send(400, { ok: false, error: 'Correo inválido' })
  }

  // Red de seguridad: el lead SIEMPRE queda en los logs de Vercel,
  // aunque Zoho falle. Así ningún contacto se pierde.
  console.log('LEAD_CAPTURED', JSON.stringify({ ...body, at: new Date().toISOString() }))

  const { first, last } = splitName(name)
  const interestLabel = INTEREST_LABELS[body.interest || ''] || body.interest || ''

  const record: Record<string, string> = {
    First_Name: first,
    Last_Name: last,
    Company: company,
    Lead_Source: body.utm?.utm_source
      ? `Landing - ${body.utm.utm_source}`
      : 'Landing Page vexanIA',
    Description: [
      interestLabel && `Interés: ${interestLabel}`,
      body.message && `Mensaje: ${body.message}`,
      body.utm &&
        `UTM: ${Object.entries(body.utm)
          .filter(([, v]) => v)
          .map(([k, v]) => `${k}=${v}`)
          .join(' | ')}`,
      body.page && `URL: ${body.page}`,
    ]
      .filter(Boolean)
      .join('\n'),
  }
  if (email) record.Email = email
  if (whatsapp) record.Phone = whatsapp

  try {
    const token = await getAccessToken()
    const dc = process.env.ZOHO_DC || 'com'
    const zohoRes = await fetch(`https://www.zohoapis.${dc}/crm/v2/Leads`, {
      method: 'POST',
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: [record], trigger: ['workflow'] }),
    })
    const zohoData = (await zohoRes.json()) as {
      data?: { status: string; code?: string; message?: string; details?: { id?: string } }[]
    }
    const firstResult = zohoData.data?.[0]
    if (!zohoRes.ok || !firstResult || firstResult.status !== 'success') {
      console.error('ZOHO_ERROR', JSON.stringify(zohoData))
      // El lead ya está en logs (LEAD_CAPTURED). Respondemos ok para no
      // perder la conversión; el equipo lo recupera de Vercel logs.
      return send(200, { ok: true, crm: false })
    }

    // Los campos "Interés" y "Mensaje" además se registran como Nota
    // ligada al lead (visible al abrir el registro en el CRM).
    const noteLines = [
      'Respuestas del formulario de la landing',
      interestLabel && `• Qué le gustaría mejorar: ${interestLabel}`,
      body.message && `• Detalle: ${body.message}`,
    ].filter(Boolean)
    if (noteLines.length > 1 && firstResult.details?.id) {
      try {
        await fetch(`https://www.zohoapis.${dc}/crm/v2/Notes`, {
          method: 'POST',
          headers: {
            Authorization: `Zoho-oauthtoken ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: [
              {
                Note_Title: 'Respuestas del formulario',
                Note_Content: noteLines.join('\n'),
                Parent_Id: firstResult.details.id,
                se_module: 'Leads',
              },
            ],
          }),
        })
      } catch (noteErr) {
        console.error('ZOHO_NOTE_ERROR', noteErr instanceof Error ? noteErr.message : noteErr)
        // No interrumpe: el lead ya está creado.
      }
    }

    return send(200, { ok: true, crm: true })
  } catch (err) {
    console.error('ZOHO_EXCEPTION', err instanceof Error ? err.message : err)
    return send(200, { ok: true, crm: false })
  }
}
