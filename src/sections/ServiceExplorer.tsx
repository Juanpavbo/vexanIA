import { useState } from 'react'
import { services, type Service } from '@/data/services'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import {
  Zap,
  Smartphone,
  Bot,
  BarChart3,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ArrowRight,
  TrendingUp,
  Wrench,
} from 'lucide-react'

const iconMap = {
  zap: Zap,
  smartphone: Smartphone,
  bot: Bot,
  chart: BarChart3,
}

function ServiceDetail({ service }: { service: Service }) {
  const Icon = iconMap[service.icon]
  return (
    <div>
      <DialogHeader>
        <div className="flex items-center gap-3 mb-1">
          <span
            className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shrink-0`}
          >
            <Icon className="w-6 h-6 text-white" />
          </span>
          <div>
            <DialogTitle className="text-xl md:text-2xl text-left">{service.name}</DialogTitle>
            <p className="text-sm text-slate-500 text-left mt-1">{service.tagline}</p>
          </div>
        </div>
      </DialogHeader>
      <Tabs defaultValue="que-es" className="mt-4">
        <TabsList className="grid grid-cols-4 w-full h-auto">
          <TabsTrigger value="que-es" className="text-xs sm:text-sm py-2">
            ¿Qué es?
          </TabsTrigger>
          <TabsTrigger value="para-quien" className="text-xs sm:text-sm py-2">
            ¿Para quién?
          </TabsTrigger>
          <TabsTrigger value="alcance" className="text-xs sm:text-sm py-2">
            Alcance
          </TabsTrigger>
          <TabsTrigger value="casos" className="text-xs sm:text-sm py-2">
            Casos reales
          </TabsTrigger>
        </TabsList>

        <TabsContent value="que-es" className="mt-5 space-y-5">
          <p className="text-slate-700 leading-relaxed">{service.plainExplanation}</p>
          <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-900">En otras palabras…</p>
              <p className="text-sm text-amber-800 mt-1">{service.analogy}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 flex items-center gap-2 mb-2">
              <Wrench className="w-4 h-4 text-slate-500" /> ¿Con qué herramientas lo hacemos?
            </p>
            <div className="flex flex-wrap gap-2 mb-2">
              {service.tools.map((t) => (
                <Badge key={t} variant="secondary">
                  {t}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-slate-500">{service.toolsNote}</p>
          </div>
        </TabsContent>

        <TabsContent value="para-quien" className="mt-5">
          <p className="text-slate-700 mb-4">
            Este servicio es ideal para ti si en tu negocio pasa alguna de estas cosas:
          </p>
          <ul className="space-y-3">
            {service.forWhom.map((item) => (
              <li key={item} className="flex gap-3 items-start">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
          <Separator className="my-5" />
          <div className="grid grid-cols-3 gap-3">
            {service.benefits.map((b) => (
              <div key={b.label} className="text-center bg-slate-50 rounded-xl p-3">
                <p className="text-xl md:text-2xl font-bold text-cyan-600">{b.value}</p>
                <p className="text-xs text-slate-500 mt-1 leading-tight">{b.label}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="alcance" className="mt-5 space-y-5">
          <div>
            <p className="font-semibold text-slate-900 mb-3">✅ Lo que SÍ incluye:</p>
            <ul className="space-y-2.5">
              {service.includes.map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-slate-900 mb-3">Para que no haya malentendidos:</p>
            <ul className="space-y-2.5">
              {service.notIncludes.map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <XCircle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                  <span className="text-slate-500 text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="casos" className="mt-5 space-y-4">
          {service.cases.map((c) => (
            <Card key={c.title} className="border-slate-200">
              <CardContent className="p-4 md:p-5">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div>
                    <p className="font-semibold text-slate-900">{c.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{c.business}</p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-emerald-500 shrink-0" />
                </div>
                <div className="mt-4 grid md:grid-cols-[1fr_auto_1fr] gap-3 items-center text-sm">
                  <div className="bg-red-50 border border-red-100 rounded-lg p-3">
                    <p className="text-xs font-semibold text-red-700 mb-1">ANTES</p>
                    <p className="text-red-900/80">{c.before}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 mx-auto rotate-90 md:rotate-0" />
                  <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3">
                    <p className="text-xs font-semibold text-emerald-700 mb-1">DESPUÉS</p>
                    <p className="text-emerald-900/80">{c.after}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm font-medium text-cyan-700 bg-cyan-50 rounded-lg px-3 py-2">
                  📈 {c.result}
                </p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
      <div className="mt-6">
        <Button asChild className="w-full bg-cyan-600 hover:bg-cyan-700">
          <a href="#contacto" onClick={() => {}}>
            Quiero esto en mi negocio
          </a>
        </Button>
      </div>
    </div>
  )
}

export default function ServiceExplorer() {
  const [selected, setSelected] = useState<Service | null>(null)

  return (
    <section id="servicios" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            Nuestros servicios
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Cuatro formas de hacer tu empresa más fácil de manejar
          </h2>
          <p className="mt-4 text-slate-600 text-lg">
            Haz clic en cada servicio para entender qué es, para quién es, qué incluye y cómo ha
            funcionado en negocios reales. <span className="font-medium">Sin tecnicismos.</span>
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 gap-6">
          {services.map((s) => {
            const Icon = iconMap[s.icon]
            return (
              <button
                key={s.id}
                onClick={() => setSelected(s)}
                className="text-left group focus:outline-none"
              >
                <Card className="h-full border-slate-200 transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 group-hover:border-cyan-300">
                  <CardContent className="p-6">
                    <span
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </span>
                    <h3 className="mt-4 text-xl font-bold text-slate-900">{s.name}</h3>
                    <p className="mt-1 text-sm font-medium text-cyan-600">{s.tagline}</p>
                    <p className="mt-3 text-slate-600 text-sm leading-relaxed line-clamp-3">
                      {s.plainExplanation}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-600 group-hover:gap-2.5 transition-all">
                      Ver explicación completa <ArrowRight className="w-4 h-4" />
                    </span>
                  </CardContent>
                </Card>
              </button>
            )
          })}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selected && <ServiceDetail service={selected} />}
        </DialogContent>
      </Dialog>
    </section>
  )
}
