import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle, ArrowRight } from 'lucide-react'

const pains = [
  'Tu equipo copia información entre correos, archivos y sistemas.',
  'No sabes cuál archivo de Excel tiene la información correcta.',
  'Tus clientes esperan demasiado por una respuesta.',
  'Solo conoces los resultados cuando termina el mes.',
  'Los procesos dependen de una sola persona.',
  'Pierdes tiempo elaborando informes manualmente.',
]

export default function Pains() {
  return (
    <section id="problemas" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            Sé honesto contigo
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            ¿Tu negocio enfrenta alguno de estos problemas?
          </h2>
          <p className="mt-4 text-slate-600 text-lg">
            Si respondes que sí a uno o más, ya hay una oportunidad clara de mejorar sin contratar
            más personal.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pains.map((p) => (
            <Card
              key={p}
              className="border-slate-200 bg-white hover:shadow-md hover:border-amber-300 transition-all"
            >
              <CardContent className="p-5 flex gap-3 items-start">
                <span className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-4.5 h-4.5 text-amber-600" />
                </span>
                <p className="text-slate-700 text-sm md:text-base leading-relaxed">{p}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-base px-8">
            <a href="#diagnostico">
              Quiero identificar oportunidades de mejora <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
