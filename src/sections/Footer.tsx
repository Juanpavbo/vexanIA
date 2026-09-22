import { Sparkles } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-bold text-white">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </span>
          <span className="lowercase">
            vexan<span className="text-cyan-400 uppercase">IA</span>
          </span>
        </div>
        <p className="text-sm text-center">
          Consultoría en automatización, aplicaciones, inteligencia artificial y reportes para
          micro y pequeñas empresas en Colombia.
        </p>
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} vexanIA · Hecho con 💙 para las mipymes
        </p>
      </div>
    </footer>
  )
}
