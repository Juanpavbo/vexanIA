# vexanIA — Landing Page

Landing page de **vexanIA**: consultoría de automatización inteligente, datos e IA para micro y pequeñas empresas (mipymes) en Colombia.

## Stack

- **React 19** + **TypeScript** + **Vite 7**
- **Tailwind CSS 3** + **shadcn/ui** (componentes Radix)
- **Vercel Analytics** + **Speed Insights** (métricas de visitas y rendimiento)
- Funciones serverless de Vercel (`api/`) para integraciones

## Integraciones

- **Zoho CRM** — el formulario de contacto crea un Lead vía `POST /api/lead`
  (función serverless). Variables de entorno requeridas en Vercel
  (Settings → Environment Variables, nunca en el código):
  - `ZOHO_CLIENT_ID`
  - `ZOHO_CLIENT_SECRET`
  - `ZOHO_REFRESH_TOKEN`
  - `ZOHO_DC` (data center: `com`, `com.co`, `eu`...)

  El interés y el mensaje del formulario se guardan además como **Nota**
  ligada al lead. Red de seguridad: si Zoho falla, el lead queda registrado
  en los logs de Vercel (`LEAD_CAPTURED`) y el visitante no se pierde.

- **Cal.com** — agendamiento de diagnóstico embebido tras enviar el
  formulario (o vía "agenda directamente"). Enlace en `src/config.ts`
  (`CAL_LINK`).

- **Zoho SalesIQ** — chat en vivo embebido en `index.html`.

- **UTM** — se capturan `utm_source/medium/campaign/term/content` y la URL
  de origen con cada lead.

## Desarrollo local

Requisitos: Node.js 20+

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build de producción

```bash
npm run build    # genera dist/
npm run preview  # sirve el build localmente
```

## Despliegue en Vercel

1. Importa este repositorio en [vercel.com/new](https://vercel.com/new).
2. Vercel detecta **Vite** automáticamente (build: `npm run build`, output: `dist`).
3. `vercel.json` incluye el rewrite SPA para servir `index.html` en todas las rutas.
4. Activa **Web Analytics** y **Speed Insights** en el dashboard del proyecto.
5. Agrega las variables `ZOHO_*` antes de publicar el formulario.

Cada push a `main` genera un despliegue automático de producción.

## Estructura

```
api/
  lead.ts            Función serverless: crea el lead en Zoho CRM + nota
src/
  config.ts          Enlace de Cal.com u otras integraciones
  sections/          Secciones de la landing (Hero, Servicios, Quiz, FAQ, Contacto...)
  data/              Contenido de servicios
  components/ui/     Componentes shadcn/ui usados por la landing
  pages/             Páginas
```
