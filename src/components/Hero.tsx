export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100vh] items-center overflow-hidden bg-cream-warm">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/15562413/pexels-photo-15562413.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=2200"
          alt="Colosseum at sunset"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32 lg:px-10">
        <div className="max-w-2xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-12 bg-gold" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Transfers • Tours • Custom Routes
            </span>
          </div>

          <h1 className="font-display text-5xl font-medium leading-[1.1] text-text-primary sm:text-6xl lg:text-7xl">
            Rome, on
            <br />
            <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">your schedule.</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg font-light leading-relaxed text-text-secondary">
            Airport transfers and private tours with fixed prices — or build your own itinerary. Chauffeur, premium vehicle and timing included.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#routes"
              className="rounded-full bg-gradient-to-r from-gold to-gold-light px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-gold/25 transition-all hover:shadow-xl hover:shadow-gold/35"
            >
              Choose a Route
            </a>
            <a
              href="#custom"
              className="rounded-full border-2 border-border bg-white px-8 py-4 text-sm font-medium text-text-secondary transition-all hover:border-gold hover:text-gold"
            >
              Build Custom Route
            </a>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 flex flex-wrap items-center gap-8 border-t border-border pt-8">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="font-display text-3xl font-medium text-gold">4.9</span>
                <svg className="h-5 w-5 fill-gold" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <p className="mt-1 text-xs text-text-muted">2,400+ happy guests</p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <div className="font-display text-3xl font-medium text-text-primary">27</div>
              <p className="mt-1 text-xs text-text-muted">Fixed-price routes</p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <div className="font-display text-3xl font-medium text-text-primary">24/7</div>
              <p className="mt-1 text-xs text-text-muted">Concierge</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-text-muted">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="h-12 w-px animate-pulse bg-gradient-to-b from-gold to-transparent" />
        </div>
      </div>
    </section>
  );
}
