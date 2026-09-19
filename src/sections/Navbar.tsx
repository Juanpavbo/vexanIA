import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, Sparkles } from 'lucide-react'

const links = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#diagnostico', label: 'Diagnóstico' },
  { href: '#como-trabajamos', label: 'Cómo trabajamos' },
  { href: '#preguntas', label: 'Preguntas frecuentes' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2 font-bold text-lg text-slate-900">
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </span>
          <span className="lowercase">
            vexan<span className="text-cyan-600 uppercase">IA</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-cyan-600 transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild className="hidden md:inline-flex bg-cyan-600 hover:bg-cyan-700">
            <a href="#contacto">Diagnóstico gratuito</a>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <nav className="flex flex-col gap-4 mt-8">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-lg font-medium text-slate-700 hover:text-cyan-600"
                  >
                    {l.label}
                  </a>
                ))}
                <Button asChild className="mt-4 bg-cyan-600 hover:bg-cyan-700">
                  <a href="#contacto" onClick={() => setOpen(false)}>
                    Diagnóstico gratuito
                  </a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
