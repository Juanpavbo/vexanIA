# vexanIA — Landing Page

Landing page de **vexanIA**: consultoría de automatización, aplicaciones a la medida, inteligencia artificial e inteligencia de negocio para micro y pequeñas empresas (mipymes) en Colombia.

## Stack

- **React 19** + **TypeScript**
- **Vite 7** (build y dev server)
- **Tailwind CSS 3** + **shadcn/ui** (componentes Radix)
- **react-router**, **react-hook-form**, **zod**, **lucide-react**

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

El proyecto está listo para Vercel:

1. Importa este repositorio en [vercel.com/new](https://vercel.com/new).
2. Vercel detecta **Vite** automáticamente (build: `npm run build`, output: `dist`).
3. `vercel.json` ya incluye el rewrite SPA para que todas las rutas sirvan `index.html`.

Cada push a `main` genera un despliegue automático de producción.

## Estructura

```
src/
  sections/      Secciones de la landing (Hero, Servicios, Quiz, FAQ, Contacto...)
  data/          Contenido de servicios
  components/ui/ Componentes shadcn/ui
  pages/         Páginas
```
