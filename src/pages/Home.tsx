import Navbar from '@/sections/Navbar'
import Hero from '@/sections/Hero'
import Pains from '@/sections/Pains'
import ServiceExplorer from '@/sections/ServiceExplorer'
import Quiz from '@/sections/Quiz'
import Process from '@/sections/Process'
import Faq from '@/sections/Faq'
import Contact from '@/sections/Contact'
import Footer from '@/sections/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Pains />
        <ServiceExplorer />
        <Quiz />
        <Process />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
