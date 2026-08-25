export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100vh] items-center overflow-hidden bg-cream-warm">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/Spartan.jpg"
          alt="Rome — eternal city"
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
              <div className="font-display text-3xl font-medium text-text-primary">12</div>
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
