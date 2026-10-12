import { ArrowRight } from 'lucide-react'

export default function WhyChooseUs({ onBookClick }) {
  const steps = [
    {
      num: '01',
      title: 'Submit Your Trip Request',
      text: 'Specify your pickup location, destination, date, time, and passenger count on our simple booking page.',
    },
    {
      num: '02',
      title: 'Confirm via WhatsApp',
      text: 'Receive direct driver verification, itinerary confirmation, and an agreed upfront price without hidden fees.',
    },
    {
      num: '03',
      title: 'Relax & Enjoy Your Journey',
      text: 'Meet your chauffeur on time at Kigali Airport or your hotel and experience a smooth, scenic drive across Rwanda.',
    },
  ]

  const standards = [
    {
      title: 'Transparent Pricing',
      description: 'Agreed fixed quotation established before departure. No surprise fees or metered confusion.',
    },
    {
      title: 'Direct Driver Access',
      description: 'Communicate directly with your chauffeur on WhatsApp for flight changes and quick updates.',
    },
    {
      title: 'Flexible Itineraries',
      description: 'Your trip adapts to your schedule, including scenic roadside viewpoints and requested rest stops.',
    },
  ]

  return (
    <section id="why-us" className="py-16 sm:py-24 bg-[#FBFBFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-12 sm:mb-16 text-left">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-taxi-yellow shrink-0" />
            <span className="text-xs font-semibold uppercase tracking-widest text-stone-500">
              Straightforward Coordination
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
            How Booking with Your Taxi Man Works
          </h2>

          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
            Skip rigid call centers and automated booking engines. We prioritize personal communication and dependable execution from first contact to final drop-off.
          </p>
        </div>

        {/* 3 Editorial Steps (No Cheesy Icon Containers) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-14 text-left">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200/90 shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl font-mono font-bold text-stone-900 border-b-2 border-taxi-yellow pb-1 inline-block mb-4">
                  {step.num}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-stone-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Core Standards Strip */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-10 shadow-xs text-left">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {standards.map((item) => (
              <div key={item.title}>
                <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wide mb-1.5">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-xs text-stone-500">
              Ready to schedule an airport transfer or countrywide trip?
            </p>
            <button
              type="button"
              onClick={onBookClick}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-stone-900 bg-taxi-yellow hover:bg-taxi-yellowHover transition-colors min-h-[44px]"
            >
              <span>Go to Booking Page (/book)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
