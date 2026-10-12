import { useState, useEffect } from 'react'
import { Menu, X, ArrowRight, Phone, MessageSquare } from 'lucide-react'
import InstagramIcon from './InstagramIcon'
import { BUSINESS_CONFIG } from '../config/business'

export default function Navbar({ currentPath, onNavigate }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15)
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
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'How It Works', href: '#why-us' },
    { label: 'Rwanda Travel', href: '#rwanda-travel' },
    { label: 'Contact', href: '#contact' },
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
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-stone-200 py-3'
          : 'bg-[#FBFBFA]/90 backdrop-blur-xs py-4 border-b border-stone-200/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          
          {/* Brand Wordmark & Mark */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault()
              setIsMobileMenuOpen(false)
              if (currentPath !== '/') onNavigate('/')
              else window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="flex items-center gap-2.5 group p-1 shrink-0"
            aria-label="Your Taxi Man Home"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden bg-stone-900 border border-stone-200 shrink-0">
              <img
                src="/images/your_taxi_man.jpg"
                alt="Your Taxi Man Logo"
                className="w-full h-full object-cover"
                width="36"
                height="36"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-stone-900 leading-none">
                Your Taxi Man
              </span>
              <span className="text-[10px] tracking-wider uppercase text-stone-400 font-medium mt-0.5">
                Rwanda Chauffeur
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-600">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link)}
                className="hover:text-stone-900 transition-colors py-1 focus:outline-none focus:text-stone-900"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action CTAs on Desktop */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={BUSINESS_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Your Taxi Man on Instagram"
              className="p-2 text-stone-500 hover:text-stone-900 rounded-lg transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
              title="Instagram: @your_taxi_man"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={() => onNavigate('/book')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-stone-900 bg-taxi-yellow hover:bg-taxi-yellowHover shadow-xs transition-all duration-200 active:scale-98 min-h-[42px]"
            >
              <span>Book a Ride</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Right Controls: Book Button + Hamburger */}
          <div className="flex items-center sm:hidden gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('/book')}
              className="text-xs font-bold px-3 py-2 rounded-lg bg-taxi-yellow text-stone-900 shadow-xs active:scale-95 transition-transform min-h-[38px] flex items-center"
            >
              Book
            </button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-stone-900 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-400 min-w-[44px] min-h-[44px] flex items-center justify-center"
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
        <div className="sm:hidden fixed inset-x-0 top-[60px] bottom-0 bg-stone-950/40 backdrop-blur-xs z-50 flex flex-col justify-start">
          <div className="bg-white border-b border-stone-200 px-5 pt-4 pb-6 shadow-xl max-h-[calc(100vh-60px)] overflow-y-auto text-left">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className="flex items-center justify-between px-3.5 py-3 rounded-xl text-base font-semibold text-stone-800 hover:bg-stone-50 transition-colors min-h-[48px]"
                >
                  <span>{link.label}</span>
                </a>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-stone-100 space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  onNavigate('/book')
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-sm font-bold text-stone-900 bg-taxi-yellow hover:bg-taxi-yellowHover shadow-xs min-h-[48px]"
              >
                <span>Book a Ride (/book)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hello Your Taxi Man! I would like to inquire about a ride in Rwanda.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-stone-100 text-stone-800 border border-stone-200 text-xs font-bold min-h-[44px]"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-stone-700" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={`tel:${BUSINESS_CONFIG.phoneNumber.replace(/\s+/g, '')}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-stone-100 text-stone-800 border border-stone-200 text-xs font-bold min-h-[44px]"
                >
                  <Phone className="w-3.5 h-3.5 text-stone-700" />
                  <span>Direct Call</span>
                </a>
              </div>

              <a
                href={BUSINESS_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 pt-2 text-xs font-medium text-stone-500 hover:text-stone-900 min-h-[40px]"
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
