import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CheckCircle2, MessageCircle } from 'lucide-react'

export default function Contact() {
  const [sent, setSent] = useState(false)

  return (
    <section id="contacto" className="py-20 bg-gradient-to-br from-cyan-600 to-violet-700">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="text-white">
            <Badge className="mb-4 bg-white/15 text-white border-white/20">
              <MessageCircle className="w-3.5 h-3.5 mr-1.5" /> Hablemos de tu negocio
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Agenda tu diagnóstico gratuito
            </h2>
            <p className="mt-4 text-cyan-100 leading-relaxed">
              En una conversación de 30 minutos entendemos cómo funciona tu negocio y te decimos,
              en lenguaje claro, qué se puede mejorar y cuánto te ahorrarías. Sin compromiso y sin
              tecnicismos.
            </p>
            <ul className="mt-6 space-y-3 text-cyan-50">
              {[
                'Conversación de 30 minutos, virtual o presencial',
                'Propuesta clara con tiempos y costos',
                'Si no te conviene, te lo decimos de frente',
              ].map((t) => (
                <li key={t} className="flex gap-2.5 items-start">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-white/15 text-sm text-cyan-100 space-y-1.5">
              <p>
                📧 <span className="font-medium">vexania@zohomail.com</span>
              </p>
              <p>📍 Bogotá D.C. y municipios de Cundinamarca</p>
              <p>🕐 Lun–Vie 8:00–18:00 · Sáb 9:00–13:00</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl">
            {sent ? (
              <div className="text-center py-10">
                <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
                <h3 className="mt-4 text-xl font-bold text-slate-900">¡Recibimos tu mensaje!</h3>
                <p className="mt-2 text-slate-600">
                  Te contactaremos muy pronto para agendar tu diagnóstico gratuito.
                </p>
              </div>
            ) : (
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault()
                  setSent(true)
                }}
              >
                <div>
                  <label className="text-sm font-medium text-slate-700">Tu nombre</label>
                  <Input required placeholder="Ej: María Gómez" className="mt-1.5" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Nombre de tu empresa
                  </label>
                  <Input required placeholder="Ej: Distribuidora La Esquina" className="mt-1.5" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">WhatsApp o correo</label>
                  <Input required placeholder="¿Dónde te contactamos?" className="mt-1.5" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    ¿Qué te gustaría mejorar?
                  </label>
                  <Select>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Elige una opción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="automatizacion">
                        Dejar de hacer tareas repetitivas a mano
                      </SelectItem>
                      <SelectItem value="apps">
                        Organizar el control del negocio (papel / Excel)
                      </SelectItem>
                      <SelectItem value="agentes">
                        Responder a mis clientes más rápido
                      </SelectItem>
                      <SelectItem value="analitica">
                        Saber cómo va mi negocio con datos claros
                      </SelectItem>
                      <SelectItem value="nose">Aún no lo tengo claro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Cuéntanos un poco más (opcional)
                  </label>
                  <Textarea
                    placeholder="Ej: Pasamos muchas horas registrando pedidos a mano…"
                    className="mt-1.5"
                    rows={3}
                  />
                </div>
                <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700" size="lg">
                  Solicitar mi diagnóstico gratuito
                </Button>
                <p className="text-xs text-slate-400 text-center">
                  Tus datos solo se usan para contactarte. Nada de spam.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
