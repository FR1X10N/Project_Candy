import HeroSection from '@/sections/HeroSection'
import AboutSection from '@/sections/AboutSection'
import ServicesSection from '@/sections/ServicesSection'
import ContactSection from '@/sections/ContactSection'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const App = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
