import { faqs } from '@/data/services'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export default function Faq() {
  return (
    <section id="preguntas" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            Preguntas frecuentes
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Lo que todo dueño de negocio nos pregunta
          </h2>
        </div>
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-semibold text-slate-800 text-base">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed text-base">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
