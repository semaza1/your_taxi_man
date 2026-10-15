import { useState, useEffect } from 'react'
import { Menu, X, ArrowRight, Phone, MessageSquare } from 'lucide-react'
import InstagramIcon from './InstagramIcon'
import { BUSINESS_CONFIG } from '../config/business'

export default function Navbar({ currentPath, onNavigate }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      // Section tracking for active navigation indicator
      const sections = ['contact', 'about', 'services', 'home']
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120) {
            setActiveSection(id)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ]

  const handleLinkClick = (e, item) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)

    if (currentPath !== '/') {
      onNavigate('/')
      setTimeout(() => {
        const target = document.querySelector(item.href)
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      const target = document.querySelector(item.href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-stone-950/95 backdrop-blur-md shadow-lg border-b border-stone-800/80 py-3 text-white'
          : 'bg-stone-950/60 sm:bg-transparent backdrop-blur-xs py-4 border-b border-white/10 sm:border-transparent text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          
          {/* Brand Logo & Wordmark */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault()
              setIsMobileMenuOpen(false)
              if (currentPath !== '/') onNavigate('/')
              else window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="flex items-center gap-2 sm:gap-2.5 group p-1 shrink-0"
            aria-label="Your Taxi Man Home"
          >
            <div className="h-9 sm:h-10 w-12 sm:w-14 rounded-lg bg-white p-0.5 shadow-sm border border-white/20 flex items-center justify-center shrink-0 overflow-hidden group-hover:scale-105 transition-transform duration-200">
              <img
                src="/images/your_taxi_man_logo.png"
                alt="Your Taxi Man Logo"
                className="w-full h-full object-contain"
                width="48"
                height="35"
              />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1 font-extrabold text-sm sm:text-base tracking-tight text-white leading-none">
                <span>YOUR</span>
                <span className="text-taxi-yellow">TAXI</span>
                <span>MAN</span>
              </div>
              <span className="text-[8px] sm:text-[9px] tracking-widest uppercase text-stone-300 font-semibold mt-1">
                Ride safe, arrive Happy
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id && currentPath === '/'
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className={`relative py-1 transition-colors duration-150 ${
                    isActive
                      ? 'text-taxi-yellow font-bold'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-[-3px] left-1/2 -translate-x-1/2 w-4 h-[2px] bg-taxi-yellow rounded-full" />
                  )}
                </a>
              )
            })}
          </nav>

          {/* Right Action CTAs on Desktop */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={BUSINESS_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Your Taxi Man on Instagram"
              className="p-2 text-stone-300 hover:text-white rounded-lg transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
              title="Instagram: @your_taxi_man"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>

            {/* Pill "Book a Ride" Button */}
            <button
              type="button"
              onClick={() => onNavigate('/book')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold text-stone-950 bg-taxi-yellow hover:bg-taxi-yellowHover shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 min-h-[42px]"
            >
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              <span>Book a Ride</span>
            </button>
          </div>

          {/* Mobile Right Controls: Book Pill + Hamburger */}
          <div className="flex items-center sm:hidden gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('/book')}
              className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-taxi-yellow text-stone-950 shadow-xs active:scale-95 transition-transform min-h-[38px] flex items-center"
            >
              Book
            </button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:text-taxi-yellow hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-taxi-yellow min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden fixed inset-x-0 top-[60px] bottom-0 bg-stone-950/70 backdrop-blur-sm z-50 flex flex-col justify-start">
          <div className="bg-stone-900 border-b border-stone-800 px-5 pt-4 pb-6 shadow-2xl max-h-[calc(100vh-60px)] overflow-y-auto text-left">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-base font-semibold transition-colors min-h-[48px] ${
                    activeSection === link.id && currentPath === '/'
                      ? 'bg-stone-800 text-taxi-yellow font-bold'
                      : 'text-stone-200 hover:bg-stone-800/60'
                  }`}
                >
                  <span>{link.label}</span>
                </a>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-stone-800 space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  onNavigate('/book')
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-full text-sm font-bold text-stone-950 bg-taxi-yellow hover:bg-taxi-yellowHover shadow-md min-h-[48px]"
              >
                <span>Book a Ride (/book)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hello Your Taxi Man! I would like to inquire about a ride in Rwanda.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-stone-800 text-stone-200 border border-stone-700 text-xs font-bold min-h-[44px]"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-taxi-yellow" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={`tel:${BUSINESS_CONFIG.phoneNumber.replace(/\s+/g, '')}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-stone-800 text-stone-200 border border-stone-700 text-xs font-bold min-h-[44px]"
                >
                  <Phone className="w-3.5 h-3.5 text-taxi-yellow" />
                  <span>Direct Call</span>
                </a>
              </div>

              <a
                href={BUSINESS_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 pt-2 text-xs font-medium text-stone-400 hover:text-white min-h-[40px]"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>Instagram: {BUSINESS_CONFIG.instagramHandle}</span>
              </a>
            </div>
          </div>

          <div
            className="flex-1"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
        </div>
      )}
    </header>
  )
}
