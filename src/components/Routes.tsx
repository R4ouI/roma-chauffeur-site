import { useState } from "react";
import { transferRoutes, tourRoutes } from "../data";

type Props = {
  onSelect: (label: string, priceCar: number, priceVan: number) => void;
};

export default function Routes({ onSelect }: Props) {
  const [tab, setTab] = useState<"transfer" | "tour">("transfer");
  const [expandedTour, setExpandedTour] = useState<string | null>(null);

  return (
    <section id="routes" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Fixed Price, Zero Surprises • Car or Van
          </p>
          <h2 className="font-display text-4xl font-medium text-text-primary lg:text-5xl">
            Predefined Routes
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-text-secondary">
            Choose a transfer or a guided tour — every route has a fixed price, private chauffeur included. Car seats up to 4 guests, van up to 7. Prefer something else? Build your own below.
          </p>

          {/* Tab switcher */}
          <div className="mt-8 inline-flex max-w-full rounded-full border border-border bg-cream-warm p-1">
            <button
              onClick={() => setTab("transfer")}
              className={`whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-semibold transition-all sm:px-6 sm:text-sm ${
                tab === "transfer"
                  ? "bg-text-primary text-white shadow"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Transfer Routes
              <span className={`ml-1.5 rounded-full px-2 py-0.5 text-xs sm:ml-2 ${tab === "transfer" ? "bg-white/20 text-white" : "bg-border text-text-muted"}`}>{transferRoutes.length}</span>
            </button>
            <button
              onClick={() => setTab("tour")}
              className={`whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-semibold transition-all sm:px-6 sm:text-sm ${
                tab === "tour"
                  ? "bg-text-primary text-white shadow"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Tour Routes
              <span className={`ml-1.5 rounded-full px-2 py-0.5 text-xs sm:ml-2 ${tab === "tour" ? "bg-white/20 text-white" : "bg-border text-text-muted"}`}>{tourRoutes.length}</span>
            </button>
          </div>
        </div>

        {/* Transfer Grid */}
        {tab === "transfer" && (
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {transferRoutes.map((r) => (
              <div
                key={r.id}
                className="group flex min-w-0 flex-col justify-between rounded-2xl border border-border bg-white p-5 transition-all hover:border-gold/40 hover:shadow-md"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-flex rounded-full bg-cream-warm px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gold">
                      Transfer
                    </span>
                    <span className="text-xs text-text-muted">{r.duration}</span>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-sm font-medium text-text-primary">
                    <span className="truncate">{r.from}</span>
                    <svg className="h-3.5 w-3.5 flex-shrink-0 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <span className="truncate text-gold">{r.to}</span>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                  <div className="space-y-0.5">
                    <div className="text-xs">
                      <span className="font-display text-lg font-medium text-text-primary">€{r.priceCar}</span>
                      <span className="ml-1.5 text-text-muted">Car</span>
                    </div>
                    <div className="text-xs">
                      <span className="font-display text-lg font-medium text-text-primary">€{r.priceVan}</span>
                      <span className="ml-1.5 text-text-muted">Van</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onSelect(r.label, r.priceCar, r.priceVan);
                      document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex-shrink-0 whitespace-nowrap rounded-full bg-text-primary px-4 py-2 text-xs font-semibold text-white transition-colors group-hover:bg-gold"
                  >
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tour List */}
        {tab === "tour" && (
          <div className="mt-12 grid gap-4">
            {tourRoutes.map((t) => (
              <div
                key={t.id}
                className="group min-w-0 rounded-2xl border border-border bg-white p-6 transition-all hover:border-gold/40 hover:shadow-md lg:p-7"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-gold/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold">
                        Tour • max {t.hours}h
                      </span>
                      <span className="rounded-full border border-border px-3 py-1 text-[11px] font-medium text-text-muted">
                        Private chauffeur
                      </span>
                      {t.extraHourPrice && (
                        <span className="rounded-full border border-border px-3 py-1 text-[11px] font-medium text-text-muted">
                          Extra hour +€{t.extraHourPrice}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-3 pr-4 text-sm font-semibold leading-snug text-text-primary lg:text-[15px]">
                      {t.label.replace("Tour: ", "")}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-secondary">
                      {t.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {t.highlights.map((h) => (
                        <span key={h} className="rounded-full bg-cream-warm px-3 py-1 text-xs text-text-muted">
                          {h}
                        </span>
                      ))}
                    </div>
                    {expandedTour === t.id && (
                      <p className="mt-3 text-xs leading-relaxed text-text-muted">
                        Includes hotel/port pickup, professional driver, bottled water and flexible photo stops. Entrance fees not included unless stated. Car seats up to 4 guests, van up to 7.
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5 lg:flex-col lg:items-end lg:border-t-0 lg:pt-0">
                    <div className="text-right">
                      <div className="text-xs text-text-muted">
                        <span className="font-display text-lg font-medium text-text-primary">€{t.priceCar}</span> Car
                      </div>
                      <div className="mt-1 text-xs text-text-muted">
                        <span className="font-display text-lg font-medium text-text-primary">€{t.priceVan}</span> Van
                      </div>
                      <button
                        onClick={() => setExpandedTour(expandedTour === t.id ? null : t.id)}
                        className="mt-1 text-xs text-gold hover:underline"
                      >
                        {expandedTour === t.id ? "Hide details" : "Details"}
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        onSelect(t.label, t.priceCar, t.priceVan);
                        document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="flex-shrink-0 whitespace-nowrap rounded-full bg-text-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gold"
                    >
                      Select Tour
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="mt-8 text-center text-xs text-text-muted">
          Prices are per vehicle — car up to 4 guests, van up to 7. All taxes included. Need a larger group? Contact us at +39 328 123 4961.
        </p>
      </div>
    </section>
  );
}
