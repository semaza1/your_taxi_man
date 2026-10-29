import { useState } from 'react'
import { ArrowRight, Send, Check } from 'lucide-react'
import InstagramIcon from './InstagramIcon'
import { BUSINESS_CONFIG } from '../config/business'

export default function ContactCta({ onBookClick, onOpenWhatsAppModal }) {
  const [quickMessage, setQuickMessage] = useState('')
  const [contactName, setContactName] = useState('')
  const [sent, setSent] = useState(false)

  const handleQuickSubmit = (e) => {
    e.preventDefault()
    if (!quickMessage.trim()) return

    onOpenWhatsAppModal({
      pickup: 'Kigali / Custom',
      destination: 'Custom Route / Inquiry',
      date: new Date().toISOString().split('T')[0],
      time: 'Flexible',
      passengers: '1-2 Passengers',
      serviceType: 'General Inquiry',
      customNote: `${contactName ? `From: ${contactName}\n` : ''}${quickMessage}`,
    })
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#FBFBFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 rounded-2xl sm:rounded-3xl p-7 sm:p-12 lg:p-16 text-white shadow-xl relative overflow-hidden border border-stone-800 text-left">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Narrative & Contact Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-taxi-yellow shrink-0" />
                <span className="text-xs font-semibold uppercase tracking-widest text-stone-400">
                  Direct Inquiries & Reservations
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Plan Your Private Transportation in Rwanda
              </h2>

              <p className="text-sm sm:text-base text-stone-300 max-w-lg leading-relaxed">
                Connect directly with Your Taxi Man to discuss airport arrival times, hotel pickups, or custom travel routes across the country.
              </p>

              {/* Direct Channels */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                
                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hello Your Taxi Man! I would like to inquire about a ride in Rwanda.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-stone-800/80 border border-stone-700/80 hover:border-taxi-yellow transition-colors block"
                >
                  <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">WhatsApp Coordination</p>
                  <p className="text-sm font-bold text-white mt-1">{BUSINESS_CONFIG.whatsappDisplay}</p>
                  <span className="text-[11px] text-taxi-yellow font-medium inline-block mt-0.5">Click to Chat Directly →</span>
                </a>

                {/* Telephone */}
                <a
                  href={`tel:${BUSINESS_CONFIG.phoneNumber.replace(/\s+/g, '')}`}
                  className="p-4 rounded-xl bg-stone-800/80 border border-stone-700/80 hover:border-taxi-yellow transition-colors block"
                >
                  <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Telephone Call</p>
                  <p className="text-sm font-bold text-white mt-1">{BUSINESS_CONFIG.phoneNumber}</p>
                  <span className="text-[11px] text-stone-400 inline-block mt-0.5">Direct Chauffeur Line</span>
                </a>

                {/* Instagram */}
                <a
                  href={BUSINESS_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-stone-800/80 border border-stone-700/80 hover:border-taxi-yellow transition-colors block"
                >
                  <div className="flex items-center gap-1.5">
                    <InstagramIcon className="w-3.5 h-3.5 text-stone-400" />
                    <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Instagram</p>
                  </div>
                  <p className="text-sm font-bold text-white mt-1">{BUSINESS_CONFIG.instagramHandle}</p>
                  <span className="text-[11px] text-stone-400 inline-block mt-0.5">Verified Profile</span>
                </a>

                {/* Service Base */}
                <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700/80">
                  <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Service Coverage</p>
                  <p className="text-sm font-bold text-white mt-1">Kigali & Countrywide</p>
                  <span className="text-[11px] text-stone-400 inline-block mt-0.5">Rwanda Private Chauffeur</span>
                </div>

              </div>

              {/* Primary Call to Action to Dedicated Page */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onBookClick}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm text-stone-900 bg-taxi-yellow hover:bg-taxi-yellowHover transition-colors min-h-[46px]"
                >
                  <span>Go to Dedicated Booking Page</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Quick Note Box */}
            <div className="lg:col-span-5 bg-stone-800/60 rounded-2xl p-6 sm:p-7 border border-stone-700/80">
              <h3 className="text-base font-bold text-white mb-1">Send a Quick Message</h3>
              <p className="text-xs text-stone-400 mb-4 leading-relaxed">
                Have a specific itinerary question or custom request? Prepare a direct WhatsApp message below.
              </p>

              <form onSubmit={handleQuickSubmit} className="space-y-3.5">
                <div>
                  <label htmlFor="cta-name" className="block text-xs font-medium text-stone-300 mb-1">
                    Your Name
                  </label>
                  <input
                    id="cta-name"
                    type="text"
                    placeholder="e.g. Jean / Sarah"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-stone-900 border border-stone-700 text-white placeholder-stone-500 text-[16px] sm:text-sm focus:outline-none focus:border-taxi-yellow"
                  />
                </div>

                <div>
                  <label htmlFor="cta-msg" className="block text-xs font-medium text-stone-300 mb-1">
                    Trip Notes or Question
                  </label>
                  <textarea
                    id="cta-msg"
                    rows={3}
                    placeholder="Describe your dates, routes, or specific requirements..."
                    value={quickMessage}
                    onChange={(e) => setQuickMessage(e.target.value)}
                    required
                    className="w-full p-3 rounded-xl bg-stone-900 border border-stone-700 text-white placeholder-stone-500 text-[16px] sm:text-sm focus:outline-none focus:border-taxi-yellow resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-stone-900 bg-taxi-yellow hover:bg-taxi-yellowHover transition-colors flex items-center justify-center gap-2 min-h-[46px]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Prepare WhatsApp Inquiry</span>
                </button>

                {sent && (
                  <div className="flex items-center gap-2 text-xs text-emerald-400 pt-1">
                    <Check className="w-3.5 h-3.5 shrink-0" />
                    <span>Inquiry prepared! View the WhatsApp dialog.</span>
                  </div>
                )}
              </form>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
