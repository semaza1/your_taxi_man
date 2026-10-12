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
    <section id="why-us" className="py-20 sm:py-28 bg-[#111113] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-12 sm:mb-16 text-left">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-[2.5px] bg-taxi-yellow rounded-full shrink-0" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400">
              Straightforward Coordination
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            How Booking with Your Taxi Man Works
          </h2>

          <p className="mt-3 text-sm sm:text-base text-stone-400 leading-relaxed">
            Skip rigid call centers and automated booking engines. We prioritize personal communication and dependable execution from first contact to final drop-off.
          </p>
        </div>

        {/* 3 Editorial Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-14 text-left">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-[#18181B] p-6 sm:p-7 rounded-2xl border border-white/10 shadow-lg flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl font-mono font-bold text-taxi-yellow border-b-2 border-taxi-yellow pb-1 inline-block mb-4">
                  {step.num}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Core Standards Strip */}
        <div className="bg-[#18181B] rounded-2xl border border-white/10 p-6 sm:p-10 shadow-lg text-left">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {standards.map((item) => (
              <div key={item.title}>
                <h4 className="text-sm font-bold text-white uppercase tracking-wide mb-1.5">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-xs text-stone-400">
              Ready to schedule an airport transfer or countrywide trip?
            </p>
            <button
              type="button"
              onClick={onBookClick}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-xs sm:text-sm text-black bg-taxi-yellow hover:bg-taxi-yellowHover transition-colors min-h-[44px] shadow-md active:scale-95"
            >
              <span>Go to Booking Page (/book)</span>
              <ArrowRight className="w-4 h-4 text-black stroke-[2.5]" />
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
