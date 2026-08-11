import { useState, useMemo } from "react";
import { customLocations } from "../data";

type Props = {
  onConfirm: (summary: string, price: number) => void;
};

export default function CustomRoute({ onConfirm }: Props) {
  const [from, setFrom] = useState("Rome City Center");
  const [to, setTo] = useState("FCO Fiumicino Airport");
  const [stops, setStops] = useState<string[]>([]);
  const [hours, setHours] = useState(3);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const estimate = useMemo(() => {
    const isLong = [from, to].some((v) => ["Florence", "Naples"].some((city) => v.includes(city)));
    const base = isLong ? 120 : 80;
    return base + hours * 42 + stops.length * 28;
  }, [hours, stops, from, to]);

  const addStop = () => {
    if (stops.length >= 4) return;
    setStops([...stops, "Vatican City"]);
  };
  const updateStop = (i: number, val: string) => {
    const next = [...stops];
    next[i] = val;
    setStops(next);
  };
  const removeStop = (i: number) => setStops(stops.filter((_, idx) => idx !== i));

  const summary =
    stops.length === 0
      ? `${from} → ${to} • ${hours}h`
      : `${from} → ${stops.join(" → ")} → ${to} • ${hours}h`;

  const canConfirm = from !== to && date && time;

  return (
    <section id="custom" className="bg-cream-warm py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: builder */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Tailor Made • Max 7 Guests • Min 3 Hours
            </p>
            <h2 className="font-display text-4xl font-medium text-text-primary lg:text-5xl">
              Build your own
              <br />
              route.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-text-secondary">
              Configure origin, destination, extra stops and duration — minimum 3 hours, up to 7 guests. Get an instant estimate and book it as a custom ride.
            </p>

            <div className="mt-8 rounded-2xl border border-border bg-white p-6 shadow-sm lg:p-7">
              <div className="grid gap-5">
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

                {/* Stops */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-xs font-medium text-text-muted">Intermediate stops (optional) — max 7 guests total</label>
                    <button
                      type="button"
                      onClick={addStop}
                      disabled={stops.length >= 4}
                      className="rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-text-secondary hover:border-gold hover:text-gold disabled:opacity-40"
                    >
                      + Add stop
                    </button>
                  </div>
                  {stops.length === 0 ? (
                    <p className="rounded-xl border border-dashed border-border bg-cream-warm px-4 py-3 text-xs text-text-muted">
                      No extra stops — direct ride. Add villages, photo stops or pickups.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {stops.map((s, i) => (
                        <div key={i} className="flex gap-2">
                          <select
                            value={s}
                            onChange={(e) => updateStop(i, e.target.value)}
                            className="flex-1 rounded-xl border border-border bg-cream-warm px-3 py-2.5 text-sm outline-none focus:border-gold"
                          >
                            {customLocations.map((loc) => (
                              <option key={loc} value={loc}>{loc}</option>
                            ))}
                          </select>
                          <button
                            type="button"
                            onClick={() => removeStop(i)}
                            className="rounded-xl border border-border px-3 text-text-muted hover:border-red-200 hover:text-red-500"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Duration slider */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-xs font-medium text-text-muted">Duration (minimum 3 hours)</label>
                    <span className="rounded-full bg-text-primary px-3 py-1 text-xs font-semibold text-white">{hours} hours</span>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={12}
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                    className="w-full accent-gold"
                  />
                  <div className="flex justify-between text-[11px] text-text-muted">
                    <span>3h</span><span>7h</span><span>12h</span>
                  </div>
                  <p className="mt-2 text-xs text-text-muted">Custom routes require a minimum booking of 3 hours.</p>
                </div>

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
              <p className="text-xs font-semibold uppercase tracking-widest text-gold">Your custom route • max 7 guests</p>

              <div className="mt-4 flex items-start gap-3 rounded-xl bg-cream-warm p-4">
                <div className="mt-1 flex flex-col items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-gold" />
                  <div className="my-1 h-10 w-px bg-border" />
                  {stops.length > 0 && (
                    <>
                      {stops.map((_, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <div className="h-2 w-2 rounded-full border-2 border-gold bg-white" />
                          <div className="my-1 h-6 w-px bg-border" />
                        </div>
                      ))}
                    </>
                  )}
                  <div className="h-2.5 w-2.5 rounded-full bg-text-primary" />
                </div>
                <div className="flex-1 space-y-3 text-sm">
                  <div>
                    <p className="text-xs text-text-muted">Pickup</p>
                    <p className="font-medium text-text-primary">{from}</p>
                  </div>
                  {stops.map((s, i) => (
                    <div key={i}>
                      <p className="text-xs text-text-muted">Stop {i + 1}</p>
                      <p className="font-medium text-text-primary">{s}</p>
                    </div>
                  ))}
                  <div>
                    <p className="text-xs text-text-muted">Drop-off</p>
                    <p className="font-medium text-text-primary">{to}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-y border-border py-5">
                <div>
                  <p className="text-xs text-text-muted">Estimated price</p>
                  <p className="font-display text-3xl font-medium text-text-primary">€{estimate}</p>
                  <p className="text-xs text-text-muted">per vehicle • max 7 guests • min 3h</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-text-muted">Summary</p>
                  <p className="max-w-[160px] text-xs font-medium text-text-primary">{summary}</p>
                </div>
              </div>

              <ul className="mt-6 space-y-2 text-sm text-text-secondary">
                <li className="flex gap-2"><span className="text-sage">✓</span> Private chauffeur & premium vehicle (up to 7 pax)</li>
                <li className="flex gap-2"><span className="text-sage">✓</span> Flexible stops & photo breaks</li>
                <li className="flex gap-2"><span className="text-sage">✓</span> Free cancellation 24h before</li>
              </ul>

              <button
                onClick={() => {
                  if (!canConfirm) {
                    alert("Please select date and pickup time.");
                    return;
                  }
                  onConfirm(`${summary} • ${date} ${time}`, estimate);
                  document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-7 w-full rounded-full bg-gradient-to-r from-gold to-gold-light py-4 text-sm font-semibold text-white shadow-lg shadow-gold/25 hover:shadow-xl"
              >
                Use This Custom Route
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
