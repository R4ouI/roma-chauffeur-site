import { useState, useMemo } from "react";
import {
  customLocations,
  tourAttractions,
  getDistanceKm,
  pricingRates,
} from "../data";

type Props = {
  onConfirm: (summary: string, priceCar: number, priceVan: number) => void;
};

export default function CustomRoute({ onConfirm }: Props) {
  const [kind, setKind] = useState<"transfer" | "tour">("transfer");
  const [from, setFrom] = useState("Rome City Center");
  const [to, setTo] = useState("FCO Fiumicino Airport");
  const [hours, setHours] = useState(pricingRates.customTourMinHours);
  const [attractions, setAttractions] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const km = useMemo(() => getDistanceKm(from, to), [from, to]);

  const priceCar =
    kind === "transfer"
      ? Math.round(km * pricingRates.transferPerKm.car)
      : hours * pricingRates.tourPerHour.car;
  const priceVan =
    kind === "transfer"
      ? Math.round(km * pricingRates.transferPerKm.van)
      : hours * pricingRates.tourPerHour.van;

  const toggleAttraction = (a: string) => {
    if (attractions.includes(a)) {
      setAttractions(attractions.filter((x) => x !== a));
    } else if (attractions.length < pricingRates.maxAttractions) {
      setAttractions([...attractions, a]);
    }
  };

  const summary =
    kind === "transfer"
      ? `${from} → ${to} • ${km} km`
      : `Tour: Rome • ${hours}h${
          attractions.length ? ` • ${attractions.join(", ")}` : ""
        }`;

  const canConfirm = (kind === "transfer" ? from !== to : true) && date && time;

  return (
    <section id="custom" className="bg-cream-warm py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: builder */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Tailor Made • Per km or per hour
            </p>
            <h2 className="font-display text-4xl font-medium text-text-primary lg:text-5xl">
              Build your own
              <br />
              route.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-text-secondary">
              Choose a transfer — priced per kilometre — or a Rome tour, priced
              per hour with up to 6 tourist attractions. Car seats 4 guests, van
              seats 7. Get an instant estimate and book it as a custom ride.
            </p>

            <div className="mt-8 rounded-2xl border border-border bg-white p-6 shadow-sm lg:p-7">
              {/* Kind toggle */}
              <div className="mb-6 inline-flex rounded-full border border-border bg-cream-warm p-1">
                <button
                  type="button"
                  onClick={() => setKind("transfer")}
                  className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
                    kind === "transfer"
                      ? "bg-text-primary text-white shadow"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  Transfer (per km)
                </button>
                <button
                  type="button"
                  onClick={() => setKind("tour")}
                  className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
                    kind === "tour"
                      ? "bg-text-primary text-white shadow"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  Tour (per hour)
                </button>
              </div>

              <div className="grid gap-5">
                {kind === "transfer" ? (
                  <>
                    {/* From / To */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-xs font-medium text-text-muted">From</label>
                        <select
                          value={from}
                          onChange={(e) => setFrom(e.target.value)}
                          className="w-full rounded-xl border border-border bg-cream-warm px-4 py-3 text-sm text-text-primary outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                        >
                          {customLocations.map((loc) => (
                            <option key={loc} value={loc}>{loc}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="mb-2 block text-xs font-medium text-text-muted">To</label>
                        <select
                          value={to}
                          onChange={(e) => setTo(e.target.value)}
                          className="w-full rounded-xl border border-border bg-cream-warm px-4 py-3 text-sm text-text-primary outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                        >
                          {customLocations.map((loc) => (
                            <option key={loc} value={loc}>{loc}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <p className="rounded-xl border border-dashed border-border bg-cream-warm px-4 py-3 text-xs text-text-muted">
                      ≈ {km} km • €{pricingRates.transferPerKm.car.toFixed(2)}/km car • €{pricingRates.transferPerKm.van.toFixed(2)}/km van
                    </p>
                  </>
                ) : (
                  <>
                    {/* Attractions */}
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <label className="text-xs font-medium text-text-muted">
                          Tourist attractions (optional) — max {pricingRates.maxAttractions}
                        </label>
                        <span className="rounded-full bg-text-primary px-3 py-1 text-xs font-semibold text-white">
                          {attractions.length}/{pricingRates.maxAttractions}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {tourAttractions.map((a) => {
                          const active = attractions.includes(a);
                          return (
                            <button
                              key={a}
                              type="button"
                              onClick={() => toggleAttraction(a)}
                              className={`rounded-full border px-3.5 py-2 text-xs font-medium transition-all ${
                                active
                                  ? "border-gold bg-gold/10 text-gold"
                                  : "border-border bg-cream-warm text-text-secondary hover:border-gold/40 hover:text-gold"
                              }`}
                            >
                              {active ? "✓ " : ""}{a}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Duration slider */}
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <label className="text-xs font-medium text-text-muted">
                          Duration (minimum {pricingRates.customTourMinHours} hours)
                        </label>
                        <span className="rounded-full bg-text-primary px-3 py-1 text-xs font-semibold text-white">{hours} hours</span>
                      </div>
                      <input
                        type="range"
                        min={pricingRates.customTourMinHours}
                        max={pricingRates.customTourMaxHours}
                        value={hours}
                        onChange={(e) => setHours(Number(e.target.value))}
                        className="w-full accent-gold"
                      />
                      <div className="flex justify-between text-[11px] text-text-muted">
                        <span>{pricingRates.customTourMinHours}h</span>
                        <span>{Math.floor((pricingRates.customTourMinHours + pricingRates.customTourMaxHours) / 2)}h</span>
                        <span>{pricingRates.customTourMaxHours}h</span>
                      </div>
                      <p className="mt-2 text-xs text-text-muted">
                        €{pricingRates.tourPerHour.car}/h car • €{pricingRates.tourPerHour.van}/h van — Rome only, up to {pricingRates.maxAttractions} attractions.
                      </p>
                    </div>
                  </>
                )}

                {/* Date time */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-medium text-text-muted">Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full rounded-xl border border-border bg-cream-warm px-4 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-medium text-text-muted">Pickup time</label>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full rounded-xl border border-border bg-cream-warm px-4 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: estimate card */}
          <div className="lg:pt-14">
            <div className="sticky top-24 rounded-2xl border border-border bg-white p-7 shadow-lg lg:p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold">
                Your custom {kind === "transfer" ? "transfer" : "tour"} • car or van
              </p>

              <div className="mt-4 flex items-start gap-3 rounded-xl bg-cream-warm p-4">
                <div className="mt-1 flex flex-col items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-gold" />
                  {kind === "tour" && attractions.length > 0 && (
                    <>
                      {attractions.map((_, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <div className="h-2 w-2 rounded-full border-2 border-gold bg-white" />
                          <div className="my-1 h-6 w-px bg-border" />
                        </div>
                      ))}
                    </>
                  )}
                  {kind === "transfer" && <div className="my-1 h-10 w-px bg-border" />}
                  <div className="h-2.5 w-2.5 rounded-full bg-text-primary" />
                </div>
                <div className="flex-1 space-y-3 text-sm">
                  {kind === "transfer" ? (
                    <>
                      <div>
                        <p className="text-xs text-text-muted">Pickup</p>
                        <p className="font-medium text-text-primary">{from}</p>
                      </div>
                      <div>
                        <p className="text-xs text-text-muted">Drop-off</p>
                        <p className="font-medium text-text-primary">{to}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="text-xs text-text-muted">Start</p>
                        <p className="font-medium text-text-primary">Rome • {hours}h</p>
                      </div>
                      {attractions.map((a, i) => (
                        <div key={a}>
                          <p className="text-xs text-text-muted">Stop {i + 1}</p>
                          <p className="font-medium text-text-primary">{a}</p>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 border-y border-border py-5">
                <div>
                  <p className="text-xs text-text-muted">Car • max 4 guests</p>
                  <p className="font-display text-3xl font-medium text-text-primary">€{priceCar}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted">Van • max 7 guests</p>
                  <p className="font-display text-3xl font-medium text-text-primary">€{priceVan}</p>
                </div>
              </div>

              <ul className="mt-6 space-y-2 text-sm text-text-secondary">
                <li className="flex gap-2"><span className="text-sage">✓</span> Private chauffeur & premium vehicle</li>
                <li className="flex gap-2"><span className="text-sage">✓</span> Flexible stops & photo breaks</li>
                <li className="flex gap-2"><span className="text-sage">✓</span> Free cancellation 24h before</li>
              </ul>

              <button
                onClick={() => {
                  if (!canConfirm) {
                    alert("Please select date and pickup time.");
                    return;
                  }
                  onConfirm(`${summary} • ${date} ${time}`, priceCar, priceVan);
                  document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-7 w-full rounded-full bg-gradient-to-r from-gold to-gold-light py-4 text-sm font-semibold text-white shadow-lg shadow-gold/25 hover:shadow-xl"
              >
                Use This Custom {kind === "transfer" ? "Transfer" : "Tour"}
              </button>

              <p className="mt-3 text-center text-xs text-text-muted">
                You'll confirm details in the booking form below. Questions? +39 328 123 4961
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
