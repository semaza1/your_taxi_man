import { useState, useId } from 'react'
import { MapPin, Calendar, Clock, Users, Car, MessageSquare, ArrowRight } from 'lucide-react'

const DEFAULT_DATE = new Date().toISOString().split('T')[0]

export default function BookingBar({ onBookingSubmit, onGoToFullBooking, preselectedService }) {
  const pickupId = useId()
  const destId = useId()
  const dateId = useId()
  const timeId = useId()
  const passId = useId()
  const serviceId = useId()

  const [formData, setFormData] = useState({
    pickup: '',
    destination: '',
    date: DEFAULT_DATE,
    time: '09:00',
    passengers: '1-2 Passengers',
    serviceType: preselectedService || 'Airport Transfer',
  })

  const [errors, setErrors] = useState({})

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

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!formData.pickup.trim()) newErrors.pickup = 'Please enter pickup location'
    if (!formData.destination.trim()) newErrors.destination = 'Please enter destination'
    if (!formData.date) newErrors.date = 'Please choose date'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onBookingSubmit(formData)
  }

  return (
    <section id="booking" className="relative z-20 -mt-4 sm:-mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-elevated border border-taxi-border p-4 sm:p-7 md:p-8">
        
        {/* Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-5 border-b border-taxi-border/80 text-left">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-taxi-heading flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-taxi-yellow shrink-0" />
              Book or Inquire for a Private Ride
            </h2>
            <p className="text-xs sm:text-sm text-taxi-text mt-0.5">
              Instant ride request prepared directly for WhatsApp coordination with your driver.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-taxi-heading border border-slate-200">
              No Upfront Payment
            </span>
          </div>
        </div>

        {/* Responsive Mobile-First Booking Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            
            {/* Pickup Location */}
            <div className={`p-3 rounded-xl border transition-all ${
              errors.pickup ? 'border-red-400 bg-red-50/30' : 'border-taxi-border bg-slate-50/50 hover:border-slate-300 focus-within:border-taxi-black focus-within:bg-white'
            }`}>
              <label htmlFor={pickupId} className="flex items-center gap-1.5 text-xs font-bold text-taxi-heading mb-1 uppercase tracking-wide">
                <MapPin className="w-3.5 h-3.5 text-taxi-yellow shrink-0" />
                <span>Pickup Location</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                id={pickupId}
                name="pickup"
                type="text"
                placeholder="e.g. Kigali Airport (KGL) or Hotel"
                value={formData.pickup}
                onChange={handleChange}
                className="w-full h-10 bg-transparent text-[16px] sm:text-sm text-taxi-heading font-medium placeholder-slate-400 focus:outline-none"
              />
              {errors.pickup && (
                <p className="text-[11px] text-red-500 font-medium mt-1">{errors.pickup}</p>
              )}
            </div>

            {/* Destination */}
            <div className={`p-3 rounded-xl border transition-all ${
              errors.destination ? 'border-red-400 bg-red-50/30' : 'border-taxi-border bg-slate-50/50 hover:border-slate-300 focus-within:border-taxi-black focus-within:bg-white'
            }`}>
              <label htmlFor={destId} className="flex items-center gap-1.5 text-xs font-bold text-taxi-heading mb-1 uppercase tracking-wide">
                <MapPin className="w-3.5 h-3.5 text-taxi-black shrink-0" />
                <span>Destination</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                id={destId}
                name="destination"
                type="text"
                placeholder="e.g. Volcanoes NP, Lake Kivu, Kigali"
                value={formData.destination}
                onChange={handleChange}
                className="w-full h-10 bg-transparent text-[16px] sm:text-sm text-taxi-heading font-medium placeholder-slate-400 focus:outline-none"
              />
              {errors.destination && (
                <p className="text-[11px] text-red-500 font-medium mt-1">{errors.destination}</p>
              )}
            </div>

            {/* Service Type */}
            <div className="p-3 rounded-xl border border-taxi-border bg-slate-50/50 hover:border-slate-300 focus-within:border-taxi-black focus-within:bg-white">
              <label htmlFor={serviceId} className="flex items-center gap-1.5 text-xs font-bold text-taxi-heading mb-1 uppercase tracking-wide">
                <Car className="w-3.5 h-3.5 text-taxi-yellow shrink-0" />
                <span>Service Category</span>
              </label>
              <select
                id={serviceId}
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full h-10 bg-transparent text-[16px] sm:text-sm text-taxi-heading font-medium focus:outline-none cursor-pointer"
              >
                <option value="Airport Transfer">Airport Transfer (KGL)</option>
                <option value="City Ride & Chauffeur">City Ride & Chauffeur (Kigali)</option>
                <option value="Tourism & Sightseeing">Tourism & Sightseeing Trip</option>
                <option value="Long-Distance Intercity">Long-Distance Intercity Travel</option>
                <option value="Driving Experience">Driving Experience</option>
                <option value="Custom Private Route">Custom Private Route</option>
              </select>
            </div>

            {/* Travel Date */}
            <div className={`p-3 rounded-xl border transition-all ${
              errors.date ? 'border-red-400 bg-red-50/30' : 'border-taxi-border bg-slate-50/50 hover:border-slate-300 focus-within:border-taxi-black focus-within:bg-white'
            }`}>
              <label htmlFor={dateId} className="flex items-center gap-1.5 text-xs font-bold text-taxi-heading mb-1 uppercase tracking-wide">
                <Calendar className="w-3.5 h-3.5 text-taxi-black shrink-0" />
                <span>Travel Date</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                id={dateId}
                name="date"
                type="date"
                min={DEFAULT_DATE}
                value={formData.date}
                onChange={handleChange}
                className="w-full h-10 bg-transparent text-[16px] sm:text-sm text-taxi-heading font-medium focus:outline-none cursor-pointer"
              />
              {errors.date && (
                <p className="text-[11px] text-red-500 font-medium mt-1">{errors.date}</p>
              )}
            </div>

            {/* Preferred Time */}
            <div className="p-3 rounded-xl border border-taxi-border bg-slate-50/50 hover:border-slate-300 focus-within:border-taxi-black focus-within:bg-white">
              <label htmlFor={timeId} className="flex items-center gap-1.5 text-xs font-bold text-taxi-heading mb-1 uppercase tracking-wide">
                <Clock className="w-3.5 h-3.5 text-taxi-yellow shrink-0" />
                <span>Preferred Time</span>
              </label>
              <input
                id={timeId}
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full h-10 bg-transparent text-[16px] sm:text-sm text-taxi-heading font-medium focus:outline-none cursor-pointer"
              />
            </div>

            {/* Number of Passengers */}
            <div className="p-3 rounded-xl border border-taxi-border bg-slate-50/50 hover:border-slate-300 focus-within:border-taxi-black focus-within:bg-white">
              <label htmlFor={passId} className="flex items-center gap-1.5 text-xs font-bold text-taxi-heading mb-1 uppercase tracking-wide">
                <Users className="w-3.5 h-3.5 text-taxi-black shrink-0" />
                <span>Passengers</span>
              </label>
              <select
                id={passId}
                name="passengers"
                value={formData.passengers}
                onChange={handleChange}
                className="w-full h-10 bg-transparent text-[16px] sm:text-sm text-taxi-heading font-medium focus:outline-none cursor-pointer"
              >
                <option value="1 Passenger">1 Passenger</option>
                <option value="2 Passengers">2 Passengers</option>
                <option value="3-4 Passengers">3–4 Passengers</option>
                <option value="5+ Passengers (Group)">5+ Passengers (Group)</option>
              </select>
            </div>

          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs text-taxi-muted">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span>Fast response via WhatsApp • Personal driver confirmation</span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              {onGoToFullBooking && (
                <button
                  type="button"
                  onClick={onGoToFullBooking}
                  className="inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl text-xs font-bold text-taxi-heading hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200 min-h-[46px]"
                >
                  <span>Open Full Form (/book)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm text-taxi-black bg-taxi-yellow hover:bg-taxi-yellowHover shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-taxi-yellow focus:ring-offset-2"
              >
                <MessageSquare className="w-4 h-4 text-taxi-black fill-current" />
                <span>Continue to WhatsApp</span>
              </button>
            </div>
          </div>
        </form>

      </div>
    </section>
  )
}
