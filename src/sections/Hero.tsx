import { Button } from '@/components/ui/button'
import { ArrowDown, CheckCircle2 } from 'lucide-react'

export default function Hero() {
  return (
    <section id="inicio" className="relative pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-violet-50" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-200/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-violet-200/40 rounded-full blur-3xl" />
      <div className="relative max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
          Automatiza tareas, organiza tus datos
          <span className="block bg-gradient-to-r from-cyan-600 to-violet-600 bg-clip-text text-transparent">
            y toma mejores decisiones
          </span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Ayudamos a negocios, micros y pequeñas empresas a ahorrar tiempo, mejorar procesos y
          controlar su negocio con automatización, aplicaciones, inteligencia artificial y
          reportes fáciles de entender.{' '}
          <span className="font-semibold text-slate-800">
            Te lo explicamos sin palabras técnicas.
          </span>
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button size="lg" asChild className="bg-cyan-600 hover:bg-cyan-700 text-base px-8">
            <a href="#diagnostico">Descubre qué necesita tu negocio</a>
          </Button>
          <Button size="lg" variant="outline" asChild className="text-base px-8">
            <a href="#servicios">Ver los servicios explicados fácil</a>
          </Button>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-slate-600">
          {[
            'Sin necesidad de saber de tecnología',
            'Sobre las herramientas que ya usas',
            'Diagnóstico inicial gratuito',
          ].map((t) => (
            <span key={t} className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              {t}
            </span>
          ))}
        </div>
        <a href="#servicios" className="inline-block mt-14 text-slate-400 animate-bounce">
          <ArrowDown className="w-6 h-6" />
        </a>
      </div>
    </section>
  )
}
