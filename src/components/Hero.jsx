import { ArrowRight } from 'lucide-react'

export default function Hero({ onBookClick, onExploreClick }) {
  return (
    <section id="home" className="relative pt-24 pb-14 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 bg-[#FBFBFA] border-b border-stone-200/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Hero Narrative */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 text-left">
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-taxi-yellow shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-widest text-stone-500">
                Private Transportation & Tourism in Rwanda
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-stone-900 tracking-tight leading-[1.12]">
              Discover Rwanda.{' '}
              <span className="block text-stone-900">
                We'll Take You There.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-stone-600 max-w-xl leading-relaxed">
              Private rides, airport transfers, and personalized journeys for discovering Rwanda with comfort and confidence.
            </p>

            {/* Clear Primary Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onBookClick}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base text-taxi-black bg-taxi-yellow hover:bg-taxi-yellowHover shadow-xs transition-all duration-200 active:scale-98 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-taxi-yellow focus:ring-offset-2"
              >
                <span>Book a Ride</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base text-stone-800 bg-white hover:bg-stone-50 border border-stone-300 shadow-xs transition-all duration-200 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-stone-400"
              >
                <span>Explore Our Services</span>
              </button>
            </div>

            {/* Editorial Hallmarks (Clean Typography, No Icon Bloat) */}
            <div className="pt-6 border-t border-stone-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 text-left">
              <div>
                <p className="text-xs font-bold text-stone-900 uppercase tracking-wide">Airport Meet & Greet</p>
                <p className="text-[12px] text-stone-500 mt-0.5">Flight tracking & terminal greeting at Kigali (KGL)</p>
              </div>
              <div>
                <p className="text-xs font-bold text-stone-900 uppercase tracking-wide">Countrywide Routes</p>
                <p className="text-[12px] text-stone-500 mt-0.5">Musanze, Lake Kivu, Nyungwe, and city rides</p>
              </div>
              <div>
                <p className="text-xs font-bold text-stone-900 uppercase tracking-wide">Direct Confirmation</p>
                <p className="text-[12px] text-stone-500 mt-0.5">Coordinate directly with your private chauffeur</p>
              </div>
            </div>
          </div>

          {/* Right Hero Visual: Authentic Transportation Photography */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-200/90 bg-white">
              <div className="aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden">
                <img
                  src="/images/hero-vehicle.jpg"
                  alt="Private vehicle driving on scenic road in Rwanda"
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                  fetchpriority="high"
                  width="1200"
                  height="670"
                />
              </div>

              {/* Understated Editorial Caption Strip */}
              <div className="p-4 sm:p-5 bg-white border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-left">
                <div>
                  <p className="text-xs font-bold text-stone-900">
                    Kigali City & Scenic Rwanda Expeditions
                  </p>
                  <p className="text-[11px] text-stone-500">
                    Clean, air-conditioned vehicle with licensed professional chauffeur
                  </p>
                </div>
                <span className="self-start sm:self-auto text-[11px] font-semibold px-2.5 py-1 rounded-md bg-stone-100 text-stone-700">
                  24/7 By Advance Booking
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
