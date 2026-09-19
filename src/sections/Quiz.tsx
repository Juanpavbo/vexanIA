import { useState } from 'react'
import { quizQuestions, services } from '@/data/services'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Compass, RotateCcw, ArrowRight } from 'lucide-react'

export default function Quiz() {
  const [step, setStep] = useState(0)
  const [scores, setScores] = useState<Record<string, number>>({})
  const [done, setDone] = useState(false)

  const answer = (serviceId: string) => {
    const next = { ...scores, [serviceId]: (scores[serviceId] || 0) + 1 }
    setScores(next)
    if (step + 1 < quizQuestions.length) {
      setStep(step + 1)
    } else {
      setDone(true)
    }
  }

  const reset = () => {
    setStep(0)
    setScores({})
    setDone(false)
  }

  const winnerId = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0]
  const winner = services.find((s) => s.id === winnerId)

  return (
    <section id="diagnostico" className="py-20 bg-gradient-to-br from-slate-900 via-cyan-950 to-slate-900">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center">
          <Badge className="mb-4 bg-cyan-500/20 text-cyan-200 border-cyan-400/30">
            <Compass className="w-3.5 h-3.5 mr-1.5" /> Diagnóstico exprés
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            ¿No sabes por dónde empezar?
          </h2>
          <p className="mt-3 text-cyan-200/80 text-lg">
            Responde 3 preguntas y te decimos qué servicio le caería mejor a tu negocio.
          </p>
        </div>

        <Card className="mt-10 border-0 shadow-2xl">
          <CardContent className="p-6 md:p-8">
            {!done ? (
              <>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-500">
                    Pregunta {step + 1} de {quizQuestions.length}
                  </span>
                </div>
                <Progress value={((step + 1) / quizQuestions.length) * 100} className="h-2 mb-6" />
                <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                  {quizQuestions[step].question}
                </h3>
                <div className="mt-6 grid gap-3">
                  {quizQuestions[step].options.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => answer(opt.serviceId)}
                      className="text-left p-4 rounded-xl border-2 border-slate-200 hover:border-cyan-500 hover:bg-cyan-50 transition-all font-medium text-slate-700 hover:text-cyan-800"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              winner && (
                <div className="text-center">
                  <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wide">
                    Tu mejor punto de partida
                  </p>
                  <h3 className="mt-2 text-2xl md:text-3xl font-bold text-slate-900">
                    {winner.name}
                  </h3>
                  <p className="mt-2 text-cyan-600 font-medium">{winner.tagline}</p>
                  <p className="mt-4 text-slate-600 leading-relaxed max-w-xl mx-auto">
                    {winner.plainExplanation.slice(0, 220)}…
                  </p>
                  <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
                    <Button asChild className="bg-cyan-600 hover:bg-cyan-700">
                      <a href="#servicios">
                        Ver la explicación completa <ArrowRight className="w-4 h-4 ml-1" />
                      </a>
                    </Button>
                    <Button asChild variant="outline">
                      <a href="#contacto">Hablar con un asesor</a>
                    </Button>
                  </div>
                  <button
                    onClick={reset}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Volver a intentarlo
                  </button>
                </div>
              )
            )}
          </CardContent>
        </Card>
        <p className="text-center text-cyan-200/60 text-sm mt-6">
          Es orientativo y sin compromiso. El diagnóstico real lo hacemos conversando contigo, gratis.
        </p>
      </div>
    </section>
  )
}
