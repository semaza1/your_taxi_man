import { useState, useId } from 'react'
import {
  ArrowLeft,
  Calendar,
  Car,
  User,
  Phone,
  FileText,
  AlertCircle,
  Check,
  Copy,
  ExternalLink,
  MessageSquare,
  PhoneCall
} from 'lucide-react'
import { BUSINESS_CONFIG } from '../config/business'

const TODAY_STR = new Date().toISOString().split('T')[0]
const CURRENT_YEAR = new Date().getFullYear()

export default function BookingPage({ onBackToHome, preselectedService = '' }) {
  const pickupId = useId()
  const destId = useId()
  const serviceId = useId()
  const dateId = useId()
  const timeId = useId()
  const passId = useId()
  const nameId = useId()
  const phoneId = useId()
  const notesId = useId()

  const [formData, setFormData] = useState({
    serviceType: preselectedService || 'Airport Transfer',
    pickup: '',
    destination: '',
    date: TODAY_STR,
    time: '09:00',
    passengers: '1–2 Passengers',
    customerName: '',
    customerPhone: '',
    notes: '',
  })

  const [errors, setErrors] = useState({})
  const [submittedMessage, setSubmittedMessage] = useState(null)
  const [submittedUrl, setSubmittedUrl] = useState('')
  const [copied, setCopied] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.pickup.trim()) {
      newErrors.pickup = 'Please provide a pickup location.'
    }
    if (!formData.destination.trim()) {
      newErrors.destination = 'Please provide a destination or drop-off point.'
    }
    if (!formData.date) {
      newErrors.date = 'Please select your travel date.'
    }
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Please enter your name.'
    }
    return newErrors
  }

  const buildWhatsAppPayload = (data) => {
    const messageLines = [
      'YOUR TAXI MAN — BOOKING REQUEST',
      '',
      `Pickup: ${data.pickup.trim()}`,
      `Destination: ${data.destination.trim()}`,
      `Date: ${data.date}`,
      `Time: ${data.time || '09:00'}`,
      `Passengers: ${data.passengers}`,
      `Service: ${data.serviceType}`,
      data.customerName.trim() ? `Passenger: ${data.customerName.trim()}` : null,
      data.customerPhone.trim() ? `Contact: ${data.customerPhone.trim()}` : null,
      data.notes.trim() ? `Additional requests: ${data.notes.trim()}` : null,
      '',
      'Hello, I would like to request this ride. Please confirm availability and provide a fare quotation.'
    ].filter((line) => line !== null)

    const fullMessage = messageLines.join('\n')

    // Standards-compliant URL encoding via native URL and URLSearchParams
    const cleanNumber = BUSINESS_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')
    const url = new URL(`https://wa.me/${cleanNumber}`)
    url.searchParams.set('text', fullMessage)

    return {
      message: fullMessage,
      url: url.toString()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateForm()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      const banner = document.getElementById('booking-error-banner')
      if (banner) {
        banner.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }

    const { message, url } = buildWhatsAppPayload(formData)
    setSubmittedMessage(message)
    setSubmittedUrl(url)

    // Open WhatsApp in a new tab/window
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleCopy = () => {
    if (!submittedMessage) return
    navigator.clipboard.writeText(submittedMessage)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-stone-700 flex flex-col font-sans selection:bg-taxi-yellow selection:text-black antialiased">
      
      {/* Top Editorial Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-stone-900 hover:text-stone-600 py-2 px-2.5 -ml-2 rounded-lg hover:bg-stone-100 transition-colors min-h-[44px] min-w-[44px] focus:outline-none focus:ring-2 focus:ring-stone-400"
            aria-label="Return to homepage"
          >
            <ArrowLeft className="w-4 h-4 text-stone-900 shrink-0" />
            <span>Return to Overview</span>
          </button>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg overflow-hidden border border-stone-200 shrink-0">
              <img
                src="/images/your_taxi_man.jpg"
                alt="Your Taxi Man"
                className="w-full h-full object-cover"
                width="28"
                height="28"
              />
            </div>
            <span className="font-extrabold text-sm sm:text-base text-stone-900 tracking-tight">
              Your Taxi Man
            </span>
          </div>

          <a
            href={`tel:${BUSINESS_CONFIG.phoneNumber.replace(/\s+/g, '')}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-lg transition-colors min-h-[40px]"
            title="Direct Chauffeur Call"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Call Chauffeur</span>
          </a>
        </div>
      </header>

      {/* Main Booking Container */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        
        {/* Title & Introduction */}
        <div className="text-left mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-stone-500 block mb-2">
            Private Transportation Request
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
            Reserve Your Ride in Rwanda
          </h1>
          <p className="mt-2.5 text-sm sm:text-base text-stone-600 leading-relaxed">
            Provide your trip details below. Submitting will format your request and open directly in WhatsApp to coordinate timing, confirm availability, and agree on your fare quotation.
          </p>

          <div className="mt-4 p-3.5 rounded-xl bg-stone-100/80 border border-stone-200/80 text-xs text-stone-600 flex items-start gap-2.5">
            <span className="w-2 h-2 rounded-full bg-taxi-yellow shrink-0 mt-1.5" />
            <p>
              <strong>No upfront payment required.</strong> Rates are agreed transparently with your chauffeur before departure.
            </p>
          </div>
        </div>

        {/* Global Error Banner */}
        {Object.keys(errors).length > 0 && (
          <div
            id="booking-error-banner"
            role="alert"
            className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs sm:text-sm flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Please complete the required information:</p>
              <ul className="list-disc list-inside text-xs space-y-0.5 text-red-700 mt-1">
                {Object.values(errors).map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Post-Submission Confirmation Panel */}
        {submittedMessage && (
          <div className="mb-8 p-6 rounded-2xl bg-stone-100 border border-stone-300 text-left space-y-4 shadow-sm animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-stone-900">
                  Booking Request Prepared
                </h2>
                <p className="text-xs text-stone-600">
                  WhatsApp has been opened with your details.
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed bg-white p-3 rounded-lg border border-stone-200">
              <strong>Next step:</strong> Send the pre-filled message in WhatsApp to connect directly with your driver. Your trip will be officially confirmed after agreeing on scheduling and fare quotation.
            </p>

            {/* Generated Message Text Preview */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-stone-700">
                <span>Prepared Message:</span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 text-[11px] bg-white border border-stone-300 hover:bg-stone-50 px-2.5 py-1 rounded-md font-semibold transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Text'}</span>
                </button>
              </div>
              <pre className="p-3.5 rounded-xl bg-stone-900 text-stone-100 text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto border border-stone-800">
                {submittedMessage}
              </pre>
            </div>

            {/* Actions if WhatsApp did not open */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <a
                href={submittedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-xs sm:text-sm text-stone-900 bg-taxi-yellow hover:bg-taxi-yellowHover transition-colors min-h-[44px]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Re-open WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={`tel:${BUSINESS_CONFIG.phoneNumber.replace(/\s+/g, '')}`}
                className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm text-stone-800 bg-white hover:bg-stone-50 border border-stone-300 transition-colors min-h-[44px]"
              >
                <Phone className="w-4 h-4 text-stone-700" />
                <span>Call Chauffeur Directly</span>
              </a>
            </div>
          </div>
        )}

        {/* The Clean, Well-Structured Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-8 space-y-6 text-left"
        >
          {/* Passenger Name & Phone */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold text-stone-900 uppercase tracking-wider pb-2 border-b border-stone-100 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-stone-700" />
              <span>1. Passenger Details</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor={nameId}
                  className="block text-xs font-bold text-stone-800 mb-1.5 uppercase tracking-wide"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id={nameId}
                  name="customerName"
                  type="text"
                  autoComplete="name"
                  placeholder="e.g. Jean-Luc / Sarah Smith"
                  value={formData.customerName}
                  onChange={handleChange}
                  className={`w-full h-11 px-3.5 rounded-xl border text-[16px] sm:text-sm text-stone-900 placeholder-stone-400 bg-white focus:outline-none transition-colors ${
                    errors.customerName
                      ? 'border-red-400 bg-red-50/40 focus:border-red-500'
                      : 'border-stone-300 hover:border-stone-400 focus:border-stone-900'
                  }`}
                />
                {errors.customerName && (
                  <p className="text-[11px] text-red-500 font-medium mt-1">{errors.customerName}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor={phoneId}
                  className="block text-xs font-bold text-stone-800 mb-1.5 uppercase tracking-wide"
                >
                  WhatsApp or Phone Number <span className="text-stone-400 font-normal text-[10px]">(Optional)</span>
                </label>
                <input
                  id={phoneId}
                  name="customerPhone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="e.g. +250 788 000 000"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  className="w-full h-11 px-3.5 rounded-xl border border-stone-300 hover:border-stone-400 focus:border-stone-900 text-[16px] sm:text-sm text-stone-900 placeholder-stone-400 bg-white focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Route & Service Category */}
          <div className="space-y-4 pt-2">
            <h2 className="text-xs font-bold text-stone-900 uppercase tracking-wider pb-2 border-b border-stone-100 flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-stone-700" />
              <span>2. Route & Service</span>
            </h2>

            <div>
              <label
                htmlFor={serviceId}
                className="block text-xs font-bold text-stone-800 mb-1.5 uppercase tracking-wide"
              >
                Service Category
              </label>
              <select
                id={serviceId}
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full h-11 px-3.5 rounded-xl border border-stone-300 hover:border-stone-400 focus:border-stone-900 text-[16px] sm:text-sm text-stone-900 bg-white focus:outline-none transition-colors cursor-pointer"
              >
                <option value="Airport Transfer">Airport Transfer (Kigali International KGL)</option>
                <option value="City Ride & Chauffeur">Kigali City Ride & Point-to-Point Chauffeur</option>
                <option value="Tourism & Sightseeing">Tourism & Sightseeing (Musanze, Lake Kivu, Akagera)</option>
                <option value="Long-Distance Intercity">Long-Distance Intercity Provincial Travel</option>
                <option value="Driving Experience">Scenic Highway Driving Experience</option>
                <option value="Custom Private Route">Custom Private Route / VIP Delegation</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor={pickupId}
                  className="block text-xs font-bold text-stone-800 mb-1.5 uppercase tracking-wide"
                >
                  Pickup Location <span className="text-red-500">*</span>
                </label>
                <input
                  id={pickupId}
                  name="pickup"
                  type="text"
                  placeholder="e.g. Kigali Airport (KGL) or Hotel"
                  value={formData.pickup}
                  onChange={handleChange}
                  className={`w-full h-11 px-3.5 rounded-xl border text-[16px] sm:text-sm text-stone-900 placeholder-stone-400 bg-white focus:outline-none transition-colors ${
                    errors.pickup
                      ? 'border-red-400 bg-red-50/40 focus:border-red-500'
                      : 'border-stone-300 hover:border-stone-400 focus:border-stone-900'
                  }`}
                />
                {errors.pickup && (
                  <p className="text-[11px] text-red-500 font-medium mt-1">{errors.pickup}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor={destId}
                  className="block text-xs font-bold text-stone-800 mb-1.5 uppercase tracking-wide"
                >
                  Destination <span className="text-red-500">*</span>
                </label>
                <input
                  id={destId}
                  name="destination"
                  type="text"
                  placeholder="e.g. Volcanoes NP, Lake Kivu, Kigali"
                  value={formData.destination}
                  onChange={handleChange}
                  className={`w-full h-11 px-3.5 rounded-xl border text-[16px] sm:text-sm text-stone-900 placeholder-stone-400 bg-white focus:outline-none transition-colors ${
                    errors.destination
                      ? 'border-red-400 bg-red-50/40 focus:border-red-500'
                      : 'border-stone-300 hover:border-stone-400 focus:border-stone-900'
                  }`}
                />
                {errors.destination && (
                  <p className="text-[11px] text-red-500 font-medium mt-1">{errors.destination}</p>
                )}
              </div>
            </div>
          </div>

          {/* Schedule & Group */}
          <div className="space-y-4 pt-2">
            <h2 className="text-xs font-bold text-stone-900 uppercase tracking-wider pb-2 border-b border-stone-100 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-stone-700" />
              <span>3. Schedule & Passengers</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor={dateId}
                  className="block text-xs font-bold text-stone-800 mb-1.5 uppercase tracking-wide"
                >
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  id={dateId}
                  name="date"
                  type="date"
                  min={TODAY_STR}
                  value={formData.date}
                  onChange={handleChange}
                  className={`w-full h-11 px-3.5 rounded-xl border text-[16px] sm:text-sm text-stone-900 bg-white focus:outline-none transition-colors cursor-pointer ${
                    errors.date ? 'border-red-400 bg-red-50/40' : 'border-stone-300 hover:border-stone-400 focus:border-stone-900'
                  }`}
                />
                {errors.date && (
                  <p className="text-[11px] text-red-500 font-medium mt-1">{errors.date}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor={timeId}
                  className="block text-xs font-bold text-stone-800 mb-1.5 uppercase tracking-wide"
                >
                  Pickup Time
                </label>
                <input
                  id={timeId}
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full h-11 px-3.5 rounded-xl border border-stone-300 hover:border-stone-400 focus:border-stone-900 text-[16px] sm:text-sm text-stone-900 bg-white focus:outline-none transition-colors cursor-pointer"
                />
              </div>

              <div>
                <label
                  htmlFor={passId}
                  className="block text-xs font-bold text-stone-800 mb-1.5 uppercase tracking-wide"
                >
                  Passengers
                </label>
                <select
                  id={passId}
                  name="passengers"
                  value={formData.passengers}
                  onChange={handleChange}
                  className="w-full h-11 px-3.5 rounded-xl border border-stone-300 hover:border-stone-400 focus:border-stone-900 text-[16px] sm:text-sm text-stone-900 bg-white focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="1 Passenger">1 Passenger</option>
                  <option value="2 Passengers">2 Passengers</option>
                  <option value="3–4 Passengers">3–4 Passengers</option>
                  <option value="5+ Passengers (Group)">5+ Passengers (Group)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-4 pt-2">
            <h2 className="text-xs font-bold text-stone-900 uppercase tracking-wider pb-2 border-b border-stone-100 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-stone-700" />
              <span>4. Additional Requests & Flight Info</span>
            </h2>

            <div>
              <label
                htmlFor={notesId}
                className="block text-xs font-bold text-stone-800 mb-1.5 uppercase tracking-wide"
              >
                Flight Number or Notes <span className="text-stone-400 font-normal text-[10px]">(Optional)</span>
              </label>
              <textarea
                id={notesId}
                name="notes"
                rows={3}
                placeholder="e.g. Flight WB 402 landing at 14:30, 2 large suitcases, child car seat needed..."
                value={formData.notes}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-stone-300 hover:border-stone-400 focus:border-stone-900 text-[16px] sm:text-sm text-stone-900 placeholder-stone-400 bg-white focus:outline-none transition-colors resize-none"
              />
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 space-y-3">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-bold text-sm sm:text-base text-stone-900 bg-taxi-yellow hover:bg-taxi-yellowHover transition-colors shadow-xs active:scale-98 min-h-[50px] focus:outline-none focus:ring-2 focus:ring-taxi-yellow focus:ring-offset-2"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Continue to WhatsApp</span>
            </button>

            <p className="text-[11px] text-stone-500 text-center leading-relaxed">
              Submitting formats your request into a clean message for WhatsApp (<strong>{BUSINESS_CONFIG.whatsappDisplay}</strong>). Your ride is finalized once availability and fare are confirmed with your driver.
            </p>
          </div>
        </form>

        {/* Alternative Direct Contact Card */}
        <div className="mt-8 p-5 rounded-2xl bg-white border border-stone-200 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-stone-900">Prefer direct communication?</p>
            <p className="text-xs text-stone-500 mt-0.5">
              You can also reach out directly by telephone or Instagram DM.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`tel:${BUSINESS_CONFIG.phoneNumber.replace(/\s+/g, '')}`}
              className="px-3.5 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-xs font-bold text-stone-800 transition-colors"
            >
              Call Chauffeur
            </a>
            <a
              href={BUSINESS_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-xs font-bold text-stone-800 transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors py-2 px-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Homepage Overview</span>
          </button>
        </div>

      </main>

      {/* Minimal Dedicated Footer */}
      <footer className="mt-auto py-6 bg-white border-t border-stone-200 text-center text-xs text-stone-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {CURRENT_YEAR} {BUSINESS_CONFIG.name} • Kigali, Rwanda</span>
          <span>WhatsApp & Chauffeur: {BUSINESS_CONFIG.whatsappDisplay}</span>
        </div>
      </footer>
    </div>
  )
}
