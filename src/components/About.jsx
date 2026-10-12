import { ArrowRight } from 'lucide-react'
import { BUSINESS_CONFIG } from '../config/business'

export default function About({ onBookClick }) {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#0D0D0E] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Authentic Chauffeur Imagery */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#18181B]">
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
              <div className="p-4 sm:p-5 bg-[#141416] border-t border-white/10 flex items-center gap-3.5 text-left">
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 shrink-0">
                  <img
                    src="/images/your_taxi_man.jpg"
                    alt="Your Taxi Man"
                    className="w-full h-full object-cover"
                    width="48"
                    height="48"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">
                    Your Taxi Man
                  </p>
                  <p className="text-[11px] text-stone-400">
                    Private Chauffeur & Tourism Guide • Kigali, Rwanda
                  </p>
                  <p className="text-[11px] text-taxi-yellow font-semibold mt-0.5">
                    Direct WhatsApp: {BUSINESS_CONFIG.whatsappDisplay}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 text-left">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2.5px] bg-taxi-yellow rounded-full shrink-0" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400">
                About the Business
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Personalized Transportation with Authentic Rwandan Hospitality
            </h2>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
              Your Taxi Man is an independent private driving and curated travel service based in Kigali, Rwanda. Dedicated to safe, comfortable, and reliable transportation, we assist international visitors, business professionals, and local residents across the Land of a Thousand Hills.
            </p>

            <p className="text-sm text-stone-400 leading-relaxed">
              Whether you need a punctual airport transfer at Kigali International (KGL), point-to-point business mobility between meetings, or an experienced local driver for a multi-day journey to Musanze and Lake Kivu, your comfort and itinerary come first.
            </p>

            {/* Standard Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#18181B] border border-white/10">
                <h3 className="text-xs font-bold text-white uppercase tracking-wide">
                  Punctual & Discreet
                </h3>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                  Reliable scheduling, flight monitoring, and dedicated vehicle comfort for peace of mind.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#18181B] border border-white/10">
                <h3 className="text-xs font-bold text-white uppercase tracking-wide">
                  Local Route Insight
                </h3>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                  First-hand familiarity with Rwandan road conditions, scenic lookouts, and regional destinations.
                </p>
              </div>
            </div>

            {/* Call to action pill */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onBookClick}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-black bg-taxi-yellow hover:bg-taxi-yellowHover transition-colors shadow-lg min-h-[46px] active:scale-95"
              >
                <span>Book a Ride with Your Taxi Man</span>
                <ArrowRight className="w-4 h-4 text-black stroke-[2.5]" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
