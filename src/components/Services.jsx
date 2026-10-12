import { ArrowRight } from 'lucide-react'

export default function Services({ onSelectService }) {
  return (
    <section id="services" className="py-20 sm:py-28 bg-[#111113] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16 text-left">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-[2.5px] bg-taxi-yellow rounded-full shrink-0" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400">
              Services & Private Transportation
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Tailored Journeys for Every Travel Need in Rwanda
          </h2>

          <p className="mt-3 text-sm sm:text-base text-stone-400 leading-relaxed">
            Whether arriving for international summits in Kigali or embarking on a scenic expedition to Volcanoes National Park, travel with personal attention and dependable timing.
          </p>
        </div>

        {/* Featured Services with Photography (Visual Storytelling) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10">
          
          {/* Featured Card 1: Airport Transfers */}
          <div className="bg-[#18181B] rounded-2xl border border-white/10 overflow-hidden shadow-lg hover:border-taxi-yellow/40 transition-all flex flex-col justify-between text-left group">
            <div className="aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-stone-900 relative">
              <img
                src="/images/about-kigali.jpg"
                alt="Kigali roads and airport route"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                loading="lazy"
                width="1200"
                height="896"
              />
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-taxi-yellow text-[11px] font-bold px-3 py-1 rounded-full border border-white/10 shadow-xs">
                Airport Route
              </div>
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase text-taxi-yellow">Service 01</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  Airport Transfers (KGL)
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 font-medium mt-0.5">
                  Kigali International Airport Arrivals & Departures
                </p>
                <p className="text-sm text-stone-300 leading-relaxed mt-3.5">
                  Punctual, stress-free transfers with real-time flight tracking, personalized terminal meet-and-greet, and full luggage assistance to your hotel or residence.
                </p>

                <div className="flex flex-wrap gap-2 pt-4">
                  <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-stone-300">Flight Monitoring</span>
                  <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-stone-300">Terminal Meet & Greet</span>
                  <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-stone-300">Luggage Assistance</span>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => onSelectService('Airport Transfer')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-xs sm:text-sm text-black bg-taxi-yellow hover:bg-taxi-yellowHover transition-colors min-h-[44px] active:scale-95 shadow-md"
                >
                  <span>Book Airport Transfer</span>
                  <ArrowRight className="w-4 h-4 text-black stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>

          {/* Featured Card 2: Tourism & Scenic Expeditions */}
          <div className="bg-[#18181B] rounded-2xl border border-white/10 overflow-hidden shadow-lg hover:border-taxi-yellow/40 transition-all flex flex-col justify-between text-left group">
            <div className="aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-stone-900 relative">
              <img
                src="/images/rwanda-scenic.jpg"
                alt="Scenic landscape of Rwanda rolling hills and Lake Kivu"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                loading="lazy"
                width="1200"
                height="670"
              />
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-taxi-yellow text-[11px] font-bold px-3 py-1 rounded-full border border-white/10 shadow-xs">
                Countrywide Tourism
              </div>
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase text-taxi-yellow">Service 02</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  Tourism & Scenic Sightseeing
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 font-medium mt-0.5">
                  Volcanoes National Park, Lake Kivu & Provincial Travel
                </p>
                <p className="text-sm text-stone-300 leading-relaxed mt-3.5">
                  Custom day tours and multi-day overland journeys. Travel at your own pace with a knowledgeable driver familiar with scenic lookouts and Rwandan hill roads.
                </p>

                <div className="flex flex-wrap gap-2 pt-4">
                  <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-stone-300">Custom Itineraries</span>
                  <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-stone-300">Scenic Lookouts</span>
                  <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-stone-300">Provincial Routes</span>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => onSelectService('Tourism & Sightseeing')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-xs sm:text-sm text-black bg-taxi-yellow hover:bg-taxi-yellowHover transition-colors min-h-[44px] active:scale-95 shadow-md"
                >
                  <span>Book Tourism Journey</span>
                  <ArrowRight className="w-4 h-4 text-black stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Supporting Editorial Services Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-left">
          
          {/* Card 03: City Chauffeur */}
          <div className="bg-[#18181B] p-6 rounded-2xl border border-white/10 hover:border-taxi-yellow/40 transition-colors flex flex-col justify-between group">
            <div>
              <span className="text-[11px] font-mono font-bold text-taxi-yellow">03</span>
              <h4 className="text-base font-bold text-white mt-1">
                Kigali City Chauffeur
              </h4>
              <p className="text-xs text-stone-400 font-medium mt-0.5 mb-2.5">
                Urban Point-to-Point & Hourly
              </p>
              <p className="text-xs text-stone-300 leading-relaxed">
                Dedicated transportation for business meetings, conferences, embassy appointments, dining, and evening outings across Kigali.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => onSelectService('City Ride & Chauffeur')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-taxi-yellow hover:text-white transition-colors py-1 min-h-[36px]"
              >
                <span>Request City Ride</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Card 04: Long-Distance Intercity */}
          <div className="bg-[#18181B] p-6 rounded-2xl border border-white/10 hover:border-taxi-yellow/40 transition-colors flex flex-col justify-between group">
            <div>
              <span className="text-[11px] font-mono font-bold text-taxi-yellow">04</span>
              <h4 className="text-base font-bold text-white mt-1">
                Long-Distance Intercity
              </h4>
              <p className="text-xs text-stone-400 font-medium mt-0.5 mb-2.5">
                Direct Provincial Transfers
              </p>
              <p className="text-xs text-stone-300 leading-relaxed">
                Comfortable transfers connecting Kigali to Musanze, Rubavu, Huye, and other districts across Rwanda with flexible rest stops.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => onSelectService('Long-Distance Intercity')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-taxi-yellow hover:text-white transition-colors py-1 min-h-[36px]"
              >
                <span>Request Intercity</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Card 05: Driving Experiences */}
          <div className="bg-[#18181B] p-6 rounded-2xl border border-white/10 hover:border-taxi-yellow/40 transition-colors flex flex-col justify-between group">
            <div>
              <span className="text-[11px] font-mono font-bold text-taxi-yellow">05</span>
              <h4 className="text-base font-bold text-white mt-1">
                Scenic Driving Experience
              </h4>
              <p className="text-xs text-stone-400 font-medium mt-0.5 mb-2.5">
                Curated Hill Highway Routes
              </p>
              <p className="text-xs text-stone-300 leading-relaxed">
                Scenic highway driving experiences through Rwanda’s winding mountain corridors for licensed drivers seeking memorable road trips.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => onSelectService('Driving Experience')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-taxi-yellow hover:text-white transition-colors py-1 min-h-[36px]"
              >
                <span>Inquire Route</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Card 06: Private Events & VIP */}
          <div className="bg-[#18181B] p-6 rounded-2xl border border-white/10 hover:border-taxi-yellow/40 transition-colors flex flex-col justify-between group">
            <div>
              <span className="text-[11px] font-mono font-bold text-taxi-yellow">06</span>
              <h4 className="text-base font-bold text-white mt-1">
                Private Delegations & VIP
              </h4>
              <p className="text-xs text-stone-400 font-medium mt-0.5 mb-2.5">
                Executive Courtesy & Events
              </p>
              <p className="text-xs text-stone-300 leading-relaxed">
                Coordinated chauffeur services for diplomatic visits, corporate summits, weddings, and distinguished guests visiting Rwanda.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => onSelectService('Custom Private Route')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-taxi-yellow hover:text-white transition-colors py-1 min-h-[36px]"
              >
                <span>Request Service</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>

        </div>

        {/* Clear Notice on Transparent Pricing */}
        <div className="mt-10 sm:mt-12 text-center text-xs text-stone-400">
          <p>
            Rates are quoted transparently based on distance, duration, and custom itinerary details. Direct WhatsApp confirmation ensures agreed-upon pricing prior to departure.
          </p>
        </div>

      </div>
    </section>
  )
}
