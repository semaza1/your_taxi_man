import { useState, useEffect } from 'react'
import { Menu, X, ArrowRight, Phone, MessageSquare } from 'lucide-react'
import InstagramIcon from './InstagramIcon'
import { BUSINESS_CONFIG } from '../config/business'

export default function Navbar({ currentPath, onNavigate }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
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
    { label: 'Home', href: '#home', path: '/' },
    { label: 'Services', href: '#services', path: '/' },
    { label: 'About', href: '#about', path: '/' },
    { label: 'Contact', href: '#contact', path: '/' },
  ]

  const handleLinkClick = (e, item) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)

    if (item.href === '#home') {
      if (currentPath !== '/') {
        onNavigate('/')
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }

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
          ? 'bg-[#0D0D0E]/95 backdrop-blur-md shadow-xl border-b border-white/10 py-3.5'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5 sm:py-6 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo & Wordmark (Matching Mockup) */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault()
              setIsMobileMenuOpen(false)
              if (currentPath !== '/') onNavigate('/')
              else window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="flex flex-col text-left group p-1 shrink-0 focus:outline-none"
            aria-label="Your Taxi Man Home"
          >
            <div className="flex items-baseline gap-1.5 leading-none">
              <span className="font-black text-xl sm:text-2xl tracking-tight text-white">
                YOUR
              </span>
              <span className="font-black text-xl sm:text-2xl tracking-tight text-taxi-yellow">
                TAXI
              </span>
              <span className="font-black text-xl sm:text-2xl tracking-tight text-white">
                MAN
              </span>
            </div>
            <span className="text-[8px] sm:text-[9px] tracking-[0.28em] uppercase text-stone-300 font-semibold mt-1">
              — RIDE • EXPLORE • DISCOVER —
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-9 text-sm font-medium">
            {navLinks.map((link) => {
              const isHomeActive = link.label === 'Home' && currentPath === '/'
              return (
                <div key={link.label} className="relative py-1 flex flex-col items-center">
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link)}
                    className={`transition-colors duration-150 ${
                      isHomeActive
                        ? 'text-taxi-yellow font-bold'
                        : 'text-stone-200 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </a>
                  {isHomeActive && (
                    <span className="w-5 h-[2.5px] bg-taxi-yellow rounded-full mt-1 inline-block" />
                  )}
                </div>
              )
            })}
          </nav>

          {/* Right Action CTAs: Book a Ride Pill + Hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Book a Ride Pill Button */}
            <button
              type="button"
              onClick={() => onNavigate('/book')}
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold text-black bg-taxi-yellow hover:bg-taxi-yellowHover shadow-md transition-all duration-200 active:scale-95 min-h-[42px] focus:outline-none focus:ring-2 focus:ring-taxi-yellow"
            >
              <ArrowRight className="w-4 h-4 text-black stroke-[2.5]" />
              <span>Book a Ride</span>
            </button>

            {/* Hamburger Button (Present on desktop & mobile per mockup) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-taxi-yellow min-w-[42px] min-h-[42px] flex items-center justify-center transition-colors"
              aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Slide-Down Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-x-0 top-[68px] sm:top-[76px] bottom-0 bg-black/60 backdrop-blur-sm z-50 flex flex-col justify-start">
          <div className="bg-[#121214] border-b border-white/10 px-5 pt-5 pb-7 shadow-2xl max-h-[calc(100vh-76px)] overflow-y-auto text-left animate-fadeIn">
            <div className="flex flex-col space-y-1.5">
              {navLinks.map((link) => {
                const isHomeActive = link.label === 'Home' && currentPath === '/'
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-colors min-h-[48px] ${
                      isHomeActive
                        ? 'bg-taxi-yellow/15 text-taxi-yellow font-bold'
                        : 'text-stone-200 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isHomeActive && (
                      <span className="w-2 h-2 rounded-full bg-taxi-yellow" />
                    )}
                  </a>
                )
              })}
            </div>

            <div className="mt-5 pt-5 border-t border-white/10 space-y-3">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  onNavigate('/book')
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-full text-sm font-bold text-black bg-taxi-yellow hover:bg-taxi-yellowHover shadow-md min-h-[48px]"
              >
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                <span>Book a Ride (/book)</span>
              </button>

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hello Your Taxi Man! I would like to inquire about a ride in Rwanda.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-semibold min-h-[44px]"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-taxi-yellow" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={`tel:${BUSINESS_CONFIG.phoneNumber.replace(/\s+/g, '')}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-semibold min-h-[44px]"
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
