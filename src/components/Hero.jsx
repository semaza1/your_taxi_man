import { ArrowRight, ShieldCheck, MapPin, Car, Mountain } from 'lucide-react'

export default function Hero({ onBookClick, onExploreClick }) {
  const hallmarks = [
    {
      icon: ShieldCheck,
      title: 'Safe & Reliable',
      subtitle: 'Your safety comes first',
    },
    {
      icon: MapPin,
      title: 'Anywhere in Rwanda',
      subtitle: 'Pickup and drop-off',
    },
    {
      icon: Car,
      title: 'Comfortable Rides',
      subtitle: 'Modern & well-maintained vehicles',
    },
    {
      icon: Mountain,
      title: 'Explore More',
      subtitle: 'Tours & travel experiences',
    },
  ]

  return (
    <section id="home" className="relative bg-stone-950 text-white overflow-hidden min-h-[680px] sm:min-h-[680px] lg:h-screen lg:max-h-[960px] flex flex-col justify-between">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source media="(max-width: 639px)" srcSet="/images/hero-vehicle-mobile-crop1.jpg" />
          <img
            src="/images/hero-vehicle.jpg"
            alt="Modern private vehicle on a scenic road overlooking Rwanda's green hills and Kigali skyline"
            className="w-full h-full object-cover object-[50%_bottom] sm:object-[68%_center] md:object-[center_right] lg:object-right"
            loading="eager"
            fetchpriority="high"
            width="1200"
            height="670"
          />
        </picture>

        {/* Targeted Lighting Gradients:
            - On mobile: top-to-bottom fade protects the headline and text while leaving the vehicle below bright and unobstructed
            - On desktop: left-to-right fade creates contrast on the left while the vehicle pops on the right */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-950/85 via-42% to-transparent sm:bg-gradient-to-r sm:from-stone-950 sm:via-stone-950/75 sm:via-45% sm:to-transparent lg:from-stone-950 lg:via-stone-950/65 lg:via-45% lg:to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-stone-950/90 via-stone-950/40 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-stone-950/90 to-transparent pointer-events-none" />
      </div>

      {/* Main Hero Content: Vertically centered on desktop */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-10 flex-1 flex flex-col justify-center">
        
        {/* Left Hero Narrative */}
        <div className="max-w-2xl text-left space-y-4 sm:space-y-5">
          
          {/* Eyebrow with yellow accent bar */}
          <div className="inline-flex items-center gap-2.5">
            <span className="w-8 sm:w-10 h-[2.5px] bg-taxi-yellow inline-block rounded-full shrink-0" />
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.18em] uppercase text-stone-300">
              Private Transportation in Rwanda
            </span>
          </div>

          {/* High-Impact Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[60px] font-extrabold tracking-tight leading-[1.1] text-white">
            Discover Rwanda.
            <span className="block text-taxi-yellow mt-1">
              We’ll Take You There.
            </span>
          </h1>

          {/* Subtitle Description */}
          <p className="text-sm sm:text-base lg:text-lg text-stone-200/90 max-w-lg leading-relaxed pt-0.5">
            Reliable private transportation for your everyday journeys, airport transfers, and experiences exploring Rwanda.
          </p>

          {/* Dual Call-to-Action Pill Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 sm:pt-3">
            {/* Primary Action Button */}
            <button
              type="button"
              onClick={onBookClick}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-xs sm:text-base text-stone-950 bg-taxi-yellow hover:bg-taxi-yellowHover shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-taxi-yellow focus:ring-offset-2 focus:ring-offset-stone-950"
            >
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>Book a Ride</span>
            </button>

            {/* Secondary Action Button */}
            <button
              type="button"
              onClick={onExploreClick}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full font-semibold text-sm sm:text-base text-white bg-black/40 hover:bg-black/60 border border-white/40 hover:border-white/70 backdrop-blur-xs shadow-sm transition-all duration-200 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>

        {/* Script "Rwanda" signature flourish on lower right of car */}
        <div className="hidden sm:flex absolute right-6 sm:right-10 lg:right-16 bottom-20 lg:bottom-24 z-10 flex-col items-end pointer-events-none select-none">
          <span className="font-['Caveat',cursive] text-4xl lg:text-5xl text-white tracking-wide rotate-[-4deg] drop-shadow-lg">
            Rwanda
          </span>
          <span className="w-20 lg:w-24 h-[3px] bg-taxi-yellow rounded-full -mt-1 mr-1 rotate-[-3deg] shadow-xs" />
        </div>

      </div>

      {/* Docked 4-Column Hallmark Bar */}
      <div className="relative z-20 bg-stone-950/90 backdrop-blur-md border-t border-white/10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 py-4 sm:py-5 gap-4 md:gap-0 md:divide-x md:divide-white/10">
            {hallmarks.map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className={`flex items-center gap-3 text-left ${
                    idx === 0 ? 'md:pr-5 lg:pr-6' : idx === hallmarks.length - 1 ? 'md:pl-5 lg:pl-6' : 'md:px-5 lg:px-6'
                  }`}
                >
                  <div className="text-taxi-yellow shrink-0">
                    <Icon className="w-5 sm:w-6 h-5 sm:h-6 stroke-[1.8]" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-stone-400 mt-0.5 leading-tight">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
