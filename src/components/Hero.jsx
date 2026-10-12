import { ArrowRight, ShieldCheck, MapPin, Car, Mountain } from 'lucide-react'

export default function Hero({ onBookClick, onExploreClick }) {
  return (
    <section id="home" className="relative pt-24 sm:pt-28 lg:pt-32 bg-[#0D0D0E] overflow-hidden">
      
      {/* Full-Bleed Photographic Background Container */}
      <div className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] xl:min-h-[760px] flex flex-col justify-between">
        
        {/* Background Image of White Vehicle overlooking Kigali */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-vehicle.jpg"
            alt="Private chauffeur vehicle overlooking Kigali and the Rwandan hills"
            className="w-full h-full object-cover object-[center_right] sm:object-center"
            loading="eager"
            fetchpriority="high"
            width="1671"
            height="941"
          />
          
          {/* Cinematic Dark Gradient Scrim across Left and Top/Bottom */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 sm:via-black/70 md:via-black/50 lg:via-black/35 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-transparent to-black/70 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Hero Narrative Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24 w-full flex-1 flex flex-col justify-center">
          <div className="max-w-xl lg:max-w-2xl text-left space-y-4 sm:space-y-6">
            
            {/* Eyebrow Tag with Yellow Accent Bar */}
            <div className="flex items-center gap-3">
              <span className="w-8 sm:w-10 h-[2.5px] bg-taxi-yellow rounded-full shrink-0" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-stone-200">
                Private Transportation in Rwanda
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[58px] xl:text-[64px] font-extrabold text-white tracking-tight leading-[1.08] drop-shadow-sm">
              Discover Rwanda.<br />
              <span className="text-taxi-yellow">We’ll Take You There.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-sm sm:text-base lg:text-lg text-stone-200/95 leading-relaxed max-w-xl font-normal drop-shadow-xs">
              Reliable private transportation for your everyday journeys, airport transfers, and experiences exploring Rwanda.
            </p>

            {/* Distinctive Dual Pill Buttons (Matching Mockup) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2 sm:pt-4">
              
              {/* Primary: Yellow Pill with Arrow on the Left */}
              <button
                type="button"
                onClick={onBookClick}
                className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base text-black bg-taxi-yellow hover:bg-taxi-yellowHover shadow-xl transition-all duration-200 active:scale-95 min-h-[50px] focus:outline-none focus:ring-2 focus:ring-taxi-yellow focus:ring-offset-2 focus:ring-offset-black"
              >
                <ArrowRight className="w-4 h-4 text-black stroke-[2.5]" />
                <span>Book a Ride</span>
              </button>

              {/* Secondary: Translucent Glass Pill with Arrow on the Right */}
              <button
                type="button"
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full font-semibold text-sm sm:text-base text-white bg-black/40 hover:bg-black/70 border border-white/60 hover:border-white shadow-md transition-all duration-200 backdrop-blur-md active:scale-95 min-h-[50px] focus:outline-none focus:ring-2 focus:ring-white"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4 text-white stroke-[2.5]" />
              </button>
            </div>

          </div>
        </div>

        {/* Cursive "Rwanda" Handwritten Watermark in Bottom-Right Corner */}
        <div className="hidden sm:block absolute right-8 lg:right-16 bottom-24 lg:bottom-28 z-10 pointer-events-none select-none">
          <div className="flex flex-col items-center">
            <span className="font-script text-white text-3xl lg:text-4xl tracking-wide drop-shadow-md italic">
              Rwanda
            </span>
            <svg
              className="w-16 h-3 text-taxi-yellow -mt-1"
              viewBox="0 0 100 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12C25 4 60 16 95 8"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Docked 4-Column Hallmark / Feature Bar Across the Bottom */}
        <div className="relative z-20 w-full bg-[#0B0B0C]/95 backdrop-blur-md border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 text-left">
              
              {/* Feature 1: Safe & Reliable */}
              <div className="flex items-center gap-3.5 lg:px-6 lg:first:pl-0 lg:border-r lg:border-white/10">
                <div className="text-taxi-yellow shrink-0">
                  <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.8]" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                    Safe & Reliable
                  </h3>
                  <p className="text-[11px] sm:text-xs text-stone-400 mt-0.5">
                    Your safety comes first
                  </p>
                </div>
              </div>

              {/* Feature 2: Anywhere in Rwanda */}
              <div className="flex items-center gap-3.5 lg:px-6 lg:border-r lg:border-white/10">
                <div className="text-taxi-yellow shrink-0">
                  <MapPin className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.8]" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                    Anywhere in Rwanda
                  </h3>
                  <p className="text-[11px] sm:text-xs text-stone-400 mt-0.5">
                    Pickup and drop-off
                  </p>
                </div>
              </div>

              {/* Feature 3: Comfortable Rides */}
              <div className="flex items-center gap-3.5 lg:px-6 lg:border-r lg:border-white/10">
                <div className="text-taxi-yellow shrink-0">
                  <Car className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.8]" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                    Comfortable Rides
                  </h3>
                  <p className="text-[11px] sm:text-xs text-stone-400 mt-0.5">
                    Modern & well-maintained vehicles
                  </p>
                </div>
              </div>

              {/* Feature 4: Explore More */}
              <div className="flex items-center gap-3.5 lg:px-6 lg:last:pr-0">
                <div className="text-taxi-yellow shrink-0">
                  <Mountain className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.8]" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                    Explore More
                  </h3>
                  <p className="text-[11px] sm:text-xs text-stone-400 mt-0.5">
                    Tours & travel experiences
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
