import { ArrowRight } from 'lucide-react'

export default function RwandaTravelPreview({ onPlanTripClick }) {
  const destinations = [
    {
      region: 'Central Province',
      name: 'Kigali City & Culture',
      description: 'Clean avenues, Kigali Genocide Memorial, lively artisan centers, and dining across Kimihurura and Kiyovu.',
    },
    {
      region: 'Northern Province',
      name: 'Musanze & Volcanoes',
      description: 'The iconic gateway to Volcanoes National Park, gorilla trekking basecamps, and dramatic Virunga peaks.',
    },
    {
      region: 'Western Province',
      name: 'Lake Kivu (Rubavu & Karongi)',
      description: 'Tranquil freshwater beaches, serene lakeside resorts, and winding panoramic terraced hill drives.',
    },
    {
      region: 'Eastern Province',
      name: 'Akagera Savannah',
      description: 'Scenic eastern plains, wildlife safari drives, and expansive rolling lake vistas.',
    },
  ]

  return (
    <section id="rwanda-travel" className="py-20 sm:py-28 bg-[#0D0D0E] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 text-left">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[2.5px] bg-taxi-yellow rounded-full shrink-0" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400">
                Explore Rwanda
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Curated Journeys Across the Land of a Thousand Hills
            </h2>
            <p className="mt-3 text-sm sm:text-base text-stone-400 leading-relaxed">
              Rwanda is celebrated for its immaculate roadways, peaceful tea plantations, and dramatic mountain landscapes. Let Your Taxi Man handle the driving so you can absorb every vista.
            </p>
          </div>

          <button
            type="button"
            onClick={onPlanTripClick}
            className="self-stretch sm:self-start lg:self-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold text-xs sm:text-sm text-black bg-taxi-yellow hover:bg-taxi-yellowHover transition-colors shadow-lg min-h-[46px] active:scale-95"
          >
            <span>Plan a Custom Trip (/book)</span>
            <ArrowRight className="w-4 h-4 text-black stroke-[2.5]" />
          </button>
        </div>

        {/* Scenic Landscape Visual Banner */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 mb-10 shadow-xl aspect-[16/9] md:aspect-[21/9] bg-stone-900">
          <img
            src="/images/rwanda-scenic.jpg"
            alt="Scenic panoramic view of Rwanda emerald hills"
            className="w-full h-full object-cover object-center"
            loading="lazy"
            width="1200"
            height="670"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

          <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8 text-white text-left max-w-xl">
            <span className="text-[11px] font-mono uppercase tracking-wider text-taxi-yellow font-bold block mb-1">
              Scenic Highway Experience
            </span>
            <h3 className="text-lg sm:text-2xl font-bold text-white leading-tight">
              Smooth Hill Highways & Restful Lake Corridors
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 mt-1.5 leading-relaxed">
              Travel at your own pace with a dedicated chauffeur experienced in countrywide inter-provincial roads.
            </p>
          </div>
        </div>

        {/* 4 Regional Travel Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-left">
          {destinations.map((dest) => (
            <div
              key={dest.name}
              className="p-5 sm:p-6 rounded-2xl bg-[#18181B] border border-white/10 hover:border-taxi-yellow/40 transition-colors"
            >
              <span className="text-[11px] font-mono font-bold text-taxi-yellow uppercase tracking-wide block mb-1">
                {dest.region}
              </span>
              <h4 className="text-base font-bold text-white mb-2">
                {dest.name}
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                {dest.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
