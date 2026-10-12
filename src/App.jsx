import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import WhyChooseUs from './components/WhyChooseUs'
import RwandaTravelPreview from './components/RwandaTravelPreview'
import ContactCta from './components/ContactCta'
import Footer from './components/Footer'
import WhatsAppModal from './components/WhatsAppModal'
import BookingPage from './components/BookingPage'

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/')
  const [modalOpen, setModalOpen] = useState(false)
  const [activeBookingData, setActiveBookingData] = useState(null)
  const [selectedServiceCategory, setSelectedServiceCategory] = useState('')

  // Handle URL changes & popstate (browser back/forward button)
  useEffect(() => {
    const handleLocationChange = () => {
      const pathname = window.location.pathname || '/'
      setCurrentPath(pathname)
      const searchParams = new URLSearchParams(window.location.search)
      const serviceParam = searchParams.get('service')
      if (serviceParam) {
        setSelectedServiceCategory(serviceParam)
      }
    }

    handleLocationChange()
    window.addEventListener('popstate', handleLocationChange)
    return () => window.removeEventListener('popstate', handleLocationChange)
  }, [])

  const navigate = (path, serviceCategory = '') => {
    if (serviceCategory) {
      setSelectedServiceCategory(serviceCategory)
    }
    const fullUrl = serviceCategory
      ? `${path}?service=${encodeURIComponent(serviceCategory)}`
      : path
    window.history.pushState({}, '', fullUrl)
    setCurrentPath(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleOpenWhatsAppModal = (inquiryData) => {
    setActiveBookingData(inquiryData)
    setModalOpen(true)
  }

  const handleServiceSelect = (category) => {
    // Navigate directly to the dedicated /book page with this category selected
    navigate('/book', category)
  }

  // Dedicated /book Route
  if (currentPath === '/book') {
    return (
      <BookingPage
        key={selectedServiceCategory || 'default'}
        onBackToHome={() => navigate('/')}
        preselectedService={selectedServiceCategory}
      />
    )
  }

  // Homepage: Dedicated editorial presentation without embedded booking form
  return (
    <div className="min-h-screen bg-[#0D0D0E] text-stone-300 flex flex-col font-sans selection:bg-taxi-yellow selection:text-black antialiased overflow-x-hidden">
      {/* Top Editorial Navigation */}
      <Navbar currentPath={currentPath} onNavigate={navigate} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Photography-Led Hero Section */}
        <Hero
          onBookClick={() => navigate('/book')}
          onExploreClick={() => scrollToSection('services')}
        />

        {/* Tailored Services Portfolio with photography and typography */}
        <Services onSelectService={handleServiceSelect} />

        {/* Authentic About Chauffeur & Standards */}
        <About onBookClick={() => navigate('/book')} />

        {/* Service Values & How Booking Works */}
        <WhyChooseUs onBookClick={() => navigate('/book')} />

        {/* Scenic Rwanda Travel Showcase */}
        <RwandaTravelPreview
          onPlanTripClick={() => navigate('/book', 'Tourism & Sightseeing')}
        />

        {/* Contact & Direct Inquiries */}
        <ContactCta
          onBookClick={() => navigate('/book')}
          onOpenWhatsAppModal={handleOpenWhatsAppModal}
        />
      </main>

      {/* Refined Footer */}
      <Footer onNavigate={navigate} />

      {/* Direct Contact Coordination Modal */}
      <WhatsAppModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        bookingDetails={activeBookingData}
      />
    </div>
  )
}
