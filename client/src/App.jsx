import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/hooks/useAuth'
import HeroSection from '@/sections/HeroSection'
import AboutSection from '@/sections/AboutSection'
import ServicesSection from '@/sections/ServicesSection'
import ContactSection from '@/sections/ContactSection'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LoginPage from '@/pages/LoginPage'
import AdminPage from '@/pages/AdminPage'

const SitePage = () => (
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

// Route protégée : redirige vers /admin/login si non connecté
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  if (user === undefined) return null // chargement en cours
  if (!user) return <Navigate to="/admin/login" replace />
  return children
}

// Route publique admin : redirige vers /admin si déjà connecté
const GuestRoute = ({ children }) => {
  const { user } = useAuth()
  if (user === undefined) return null
  if (user) return <Navigate to="/admin" replace />
  return children
}

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<SitePage />} />
        <Route
          path="/admin/login"
          element={<GuestRoute><LoginPage /></GuestRoute>}
        />
        <Route
          path="/admin"
          element={<ProtectedRoute><AdminPage /></ProtectedRoute>}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
)

export default App
