import { ArrowRight } from 'lucide-react'
import { BUSINESS_CONFIG } from '../config/business'

export default function About({ onBookClick }) {
  return (
    <section id="about" className="py-16 sm:py-24 bg-white border-y border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Authentic Chauffeur Imagery */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-md bg-stone-100">
              <div className="aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden">
                <img
                  src="/images/image1.jpg"
                  alt="Your Taxi Man chauffeur in clean vehicle in Rwanda"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                  width="1200"
                  height="1130"
                />
              </div>

              {/* Driver Attribution Strip */}
              <div className="p-4 sm:p-5 bg-white border-t border-stone-100 flex items-center gap-3.5 text-left">
                <div className="w-14 h-11 rounded-xl overflow-hidden border border-stone-200 bg-white p-1 shrink-0 flex items-center justify-center shadow-xs">
                  <img
                    src="/images/your_taxi_man_logo.png"
                    alt="Your Taxi Man Official Logo"
                    className="w-full h-full object-contain"
                    width="52"
                    height="38"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-900">
                    Your Taxi Man
                  </p>
                  <p className="text-[11px] text-stone-500">
                    Private Chauffeur & Guided Travel • "Ride safe, arrive Happy"
                  </p>
                  <p className="text-[11px] text-stone-700 font-semibold mt-0.5">
                    WhatsApp: {BUSINESS_CONFIG.whatsappDisplay}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative / About Text Content */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 text-left">
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-taxi-yellow shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-widest text-stone-500">
                About the Business
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
              Personalized Transportation with Authentic Rwandan Hospitality
            </h2>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Your Taxi Man is an independent private driving and curated travel service based in Kigali, Rwanda. Dedicated to safe, comfortable, and reliable transportation, we assist international visitors, business professionals, and local residents across the Land of a Thousand Hills.
            </p>

            <p className="text-sm text-stone-600 leading-relaxed">
              Whether you need a punctual airport transfer at Kigali International (KGL), point-to-point business mobility between meetings, or an experienced local driver for a multi-day journey to Musanze and Lake Kivu, your comfort and itinerary come first.
            </p>

            {/* Editorial Standard Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80">
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wide">
                  Punctual & Discreet
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Reliable scheduling, flight monitoring, and dedicated vehicle comfort for peace of mind.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80">
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wide">
                  Local Route Insight
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  First-hand familiarity with Rwandan road conditions, scenic lookouts, and regional destinations.
                </p>
              </div>
            </div>

            {/* Call to action */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onBookClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-stone-900 bg-taxi-yellow hover:bg-taxi-yellowHover transition-colors shadow-xs min-h-[46px]"
              >
                <span>Book a Ride with Your Taxi Man</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
