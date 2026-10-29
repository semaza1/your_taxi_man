import { ArrowUp } from 'lucide-react'
import InstagramIcon from './InstagramIcon'
import { BUSINESS_CONFIG } from '../config/business'

const CURRENT_YEAR = new Date().getFullYear()

export default function Footer({ onNavigate }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNavClick = (e, sectionId) => {
    e.preventDefault()
    if (window.location.pathname !== '/') {
      if (onNavigate) onNavigate('/')
      setTimeout(() => {
        const el = document.getElementById(sectionId)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      const el = document.getElementById(sectionId)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-stone-950 text-stone-400 border-t border-stone-800 pt-14 pb-12 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-10 rounded-xl bg-white border border-stone-700 p-0.5 flex items-center justify-center font-bold overflow-hidden shrink-0 shadow-sm">
                <img
                  src="/images/your_taxi_man_logo.png"
                  alt="Your Taxi Man Logo"
                  className="w-full h-full object-contain"
                  width="44"
                  height="34"
                />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight flex items-center gap-1.5">
                {BUSINESS_CONFIG.name}
                <span className="w-1.5 h-1.5 rounded-full bg-taxi-yellow inline-block shrink-0" />
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              Independent private transportation and curated travel service based in Kigali, Rwanda. Dedicated to safe, comfortable, and reliable airport arrivals, business mobility, and provincial exploration.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href={BUSINESS_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-stone-900 hover:bg-taxi-yellow hover:text-stone-950 text-stone-300 border border-stone-800 flex items-center justify-center transition-all min-h-[36px] min-w-[36px]"
                aria-label="Instagram Profile"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <span className="text-xs text-stone-400">
                Instagram: <strong className="text-stone-200">{BUSINESS_CONFIG.instagramHandle}</strong>
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="hover:text-taxi-yellow transition-colors py-1 inline-block">Home</a>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate && onNavigate('/book')} className="hover:text-taxi-yellow transition-colors py-1 text-left font-semibold text-stone-200">Book a Ride</button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate && onNavigate('/journal')} className="hover:text-taxi-yellow transition-colors py-1 text-left font-semibold text-stone-200">Stories from the Road</button>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="hover:text-taxi-yellow transition-colors py-1 inline-block">Services</a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-taxi-yellow transition-colors py-1 inline-block">About</a>
              </li>
              <li>
                <a href="#why-us" onClick={(e) => handleNavClick(e, 'why-us')} className="hover:text-taxi-yellow transition-colors py-1 inline-block">How It Works</a>
              </li>
              <li>
                <a href="#rwanda-travel" onClick={(e) => handleNavClick(e, 'rwanda-travel')} className="hover:text-taxi-yellow transition-colors py-1 inline-block">Rwanda Travel</a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="hover:text-taxi-yellow transition-colors py-1 inline-block">Contact</a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button type="button" onClick={() => onNavigate && onNavigate('/book', 'Airport Transfer')} className="hover:text-taxi-yellow transition-colors py-1 text-left">Airport Transfers (KGL)</button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate && onNavigate('/book', 'City Ride & Chauffeur')} className="hover:text-taxi-yellow transition-colors py-1 text-left">Kigali City Rides</button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate && onNavigate('/book', 'Tourism & Sightseeing')} className="hover:text-taxi-yellow transition-colors py-1 text-left">Tourism & Sightseeing</button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate && onNavigate('/book', 'Long-Distance Intercity')} className="hover:text-taxi-yellow transition-colors py-1 text-left">Intercity Transfers</button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate && onNavigate('/book', 'Driving Experience')} className="hover:text-taxi-yellow transition-colors py-1 text-left">Scenic Road Trips</button>
              </li>
            </ul>
          </div>

          {/* Operating Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Operating Standards</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Serving Kigali City, Kigali International Airport (KGL), Musanze, Rubavu, and all provincial corridors across Rwanda.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-900 text-stone-300 border border-stone-800 text-[11px] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-taxi-yellow shrink-0" />
                Available 24/7 By Advance Booking
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {CURRENT_YEAR} {BUSINESS_CONFIG.name}. All rights reserved.</p>

          <p className="text-[11px] text-stone-500 text-center sm:text-left">
            Private Transportation & Guided Tourism • Rwanda
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-stone-300 transition-colors min-h-[36px] px-2"
            aria-label="Scroll to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  )
}
