import { processSteps } from '@/data/services'
import { Badge } from '@/components/ui/badge'
import { Building2 } from 'lucide-react'

export default function Process() {
  return (
    <section id="como-trabajamos" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            Cómo trabajamos
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Un proceso simple, pensado para dueños de negocio ocupados
          </h2>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((s, i) => (
            <div key={s.step} className="relative">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 h-full shadow-sm hover:shadow-md transition-shadow">
                <span className="w-10 h-10 rounded-full bg-cyan-600 text-white font-bold flex items-center justify-center text-lg">
                  {s.step}
                </span>
                <h3 className="mt-4 font-bold text-slate-900 text-lg">{s.title}</h3>
                <p className="mt-2 text-slate-600 text-sm leading-relaxed">{s.desc}</p>
              </div>
              {i < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-cyan-200" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-14 bg-white rounded-2xl border border-slate-200 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm">
          <span className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center shrink-0">
            <Building2 className="w-7 h-7 text-emerald-600" />
          </span>
          <div>
            <h3 className="font-bold text-slate-900 text-lg">
              ¿Por qué trabajamos con empresas registradas ante el RUES?
            </h3>
            <p className="mt-2 text-slate-600 leading-relaxed">
              Porque un negocio formal es un negocio listo para crecer. Si tu empresa ya está
              registrada ante el Registro Único Empresarial y Social (RUES), tienes todo lo
              necesario para acceder a estas soluciones: facturación electrónica, cuentas de correo
              empresariales y herramientas en la nube con costos pensados para pequeñas empresas.
              Y si estás en proceso de formalizarte, también te orientamos.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
