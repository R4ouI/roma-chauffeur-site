import { useEffect, useState } from "react";
import { transferRoutes, tourRoutes } from "../data";
import { supabase } from "../lib/supabase";

type Props = {
  selectedLabel: string;
  selectedPrice: number | null;
};

export default function Booking({ selectedLabel, selectedPrice }: Props) {
  const [routeLabel, setRouteLabel] = useState("");
  const [price, setPrice] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [guests, setGuests] = useState("2 Guests");

  // Controlled form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [pickup, setPickup] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  useEffect(() => {
    if (selectedLabel) {
      setRouteLabel(selectedLabel);
      setPrice(selectedPrice);
    }
  }, [selectedLabel, selectedPrice]);

  // Sync custom route date/time from CustomRoute component (if available)
  useEffect(() => {
    if (selectedLabel && selectedLabel.includes("•")) {
      const parts = selectedLabel.split(" • ");
      if (parts.length >= 2) {
        const dateTimePart = parts[parts.length - 1];
        const dateTimeMatch = dateTimePart.match(/(\d{4}-\d{2}-\d{2})\s+(.+)/);
        if (dateTimeMatch) {
          if (!date) setDate(dateTimeMatch[1]);
          if (!time) setTime(dateTimeMatch[2]);
        }
        // Also try to extract pickup from the same label if it contains the custom summary
        const summaryPart = parts.slice(0, -1).join(" • ");
        if (summaryPart.includes(" → ") && !pickup) {
          const firstArrow = summaryPart.indexOf(" → ");
          const from = summaryPart.slice(0, firstArrow);
          setPickup(from);
        }
      }
    }
  }, [selectedLabel]);

  const handleRouteChange = (value: string) => {
    setRouteLabel(value);
    setError(null);
    const t = transferRoutes.find((r) => r.label === value);
    if (t) {
      setPrice(t.price);
      return;
    }
    const tour = tourRoutes.find((r) => r.label === value);
    if (tour) {
      setPrice(tour.price);
      return;
    }
    if (value === "") setPrice(null);
    if (value.startsWith("Custom:")) {
      if (selectedPrice) setPrice(selectedPrice);
    }
  };

  const isCustom =
    routeLabel.includes("→") &&
    !transferRoutes.some((r) => r.label === routeLabel) &&
    !tourRoutes.some((r) => r.label === routeLabel);

  const detectRouteType = (): "transfer" | "tour" | "custom" => {
    if (isCustom) return "custom";
    if (transferRoutes.some((r) => r.label === routeLabel)) return "transfer";
    if (tourRoutes.some((r) => r.label === routeLabel)) return "tour";
    return "custom";
  };

  const detectRouteId = (): string | null => {
    const t = transferRoutes.find((r) => r.label === routeLabel);
    if (t) return t.id;
    const tour = tourRoutes.find((r) => r.label === routeLabel);
    if (tour) return tour.id;
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!routeLabel) {
      setError("Please select a route first.");
      return;
    }
    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }
    if (!date) {
      setError("Please select a date.");
      return;
    }
    if (!time) {
      setError("Please select a pickup time.");
      return;
    }
    if (!pickup.trim()) {
      setError("Please enter your pickup location.");
      return;
    }

    setSubmitting(true);

    const { error: insertError } = await supabase.from("reservations").insert({
      route_type: detectRouteType(),
      route_label: routeLabel.replace(/^Custom: /, ""),
      route_id: detectRouteId(),
      price: price || 0,
      customer_name: name.trim(),
      customer_email: email.trim().toLowerCase(),
      customer_phone: phone.trim(),
      reservation_date: date,
      reservation_time: time,
      guests,
      pickup_location: pickup.trim(),
      special_requests: specialRequests.trim() || null,
    });

    setSubmitting(false);

    if (insertError) {
      setError("Something went wrong. Please try again or contact us by phone.");
      console.error("Supabase insert error:", insertError);
      return;
    }

    // Fire-and-forget: trigger email edge function (don't block on failure)
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    fetch(`${supabaseUrl}/functions/v1/send-emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${supabaseKey}`,
      },
      body: JSON.stringify({
        type: "INSERT",
        table: "reservations",
        schema: "public",
        record: {
          route_type: detectRouteType(),
          route_label: routeLabel.replace(/^Custom: /, ""),
          route_id: detectRouteId(),
          price: price || 0,
          customer_name: name.trim(),
          customer_email: email.trim().toLowerCase(),
          customer_phone: phone.trim(),
          reservation_date: date,
          reservation_time: time,
          guests,
          pickup_location: pickup.trim(),
          special_requests: specialRequests.trim() || null,
        },
      }),
    }).catch(() => {
      // Silent fail — reservation is saved, email can be retried manually
    });

    setSubmitted(true);
  };

  return (
    <section id="book" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Your Private Appointment
            </p>
            <h2 className="font-display text-4xl font-medium text-text-primary lg:text-5xl">
              Book Your Ride
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-text-secondary">
              Secure your chauffeur in 60 seconds. Choose a fixed-price route
              above, or configure a custom one — then confirm your appointment
              here. Max 7 guests per vehicle.
            </p>

            <div className="mt-10 space-y-6">
              {[
                {
                  step: "01",
                  title: "Choose route",
                  desc: "Transfer, tour or custom — all with fixed or instant estimate. 7 guests max.",
                },
                {
                  step: "02",
                  title: "Pick date & time",
                  desc: "We're available 24/7. Tell us where to meet you.",
                },
                {
                  step: "03",
                  title: "Instant confirmation",
                  desc: "Receive driver details by email (maxromeexecutivechauffeur@outlook.it) or WhatsApp +39 328 123 4961.",
                },
              ].map((s) => (
                <div key={s.step} className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-text-primary font-display text-lg font-medium text-white">
                    {s.step}
                  </div>
                  <div className="pt-1">
                    <h4 className="font-medium text-text-primary">{s.title}</h4>
                    <p className="mt-1 text-sm text-text-secondary">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-border bg-cream-warm p-6">
              <h4 className="text-sm font-semibold text-text-primary">
                Every booking includes
              </h4>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  "Private chauffeur",
                  "Meet & greet",
                  "Bottled water",
                  "Wi-Fi onboard",
                  "Flexible stops",
                  "Hotel / port pickup",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-sm text-text-secondary"
                  >
                    <svg
                      className="h-4 w-4 flex-shrink-0 text-sage"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-text-muted">
                Capacity: up to 7 guests per vehicle • Child seats free • All
                taxes included
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:pt-2">
            {submitted ? (
              <div className="flex min-h-[520px] flex-col items-center justify-center rounded-2xl border border-sage/20 bg-cream-warm text-center shadow-sm">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sage/10">
                  <svg
                    className="h-10 w-10 text-sage"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="font-display text-3xl font-medium text-text-primary">
                  Appointment Confirmed
                </h3>
                <p className="mt-3 max-w-sm px-6 text-sm leading-relaxed text-text-secondary">
                  {routeLabel ? (
                    <>
                      <span className="font-medium text-text-primary">
                        {routeLabel.replace(/^Custom: /, "")}
                      </span>{" "}
                      — your chauffeur details will arrive by email shortly from{" "}
                      <span className="font-medium">
                        maxromeexecutivechauffeur@outlook.it
                      </span>
                      . For urgent needs:{" "}
                      <a
                        href="tel:+393281234961"
                        className="font-semibold text-gold"
                      >
                        +39 328 123 4961
                      </a>
                      .
                    </>
                  ) : (
                    "You'll receive a confirmation email shortly with chauffeur details."
                  )}
                </p>
                {price && (
                  <p className="mt-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-text-primary shadow-sm">
                    Total: €{price}{" "}
                    <span className="font-normal text-text-muted">
                      • per vehicle • max 7 guests
                    </span>
                  </p>
                )}
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName("");
                    setEmail("");
                    setPhone("");
                    setDate("");
                    setTime("");
                    setPickup("");
                    setSpecialRequests("");
                  }}
                  className="mt-8 rounded-full border-2 border-border bg-white px-8 py-3 text-sm font-medium text-text-secondary hover:border-gold hover:text-gold"
                >
                  Book Another Ride
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-border bg-white p-7 shadow-lg lg:p-8"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-medium text-text-primary">
                    Appointment Details
                  </h3>
                  {price && (
                    <span className="rounded-full bg-gold px-3 py-1 text-sm font-bold text-white">
                      €{price}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-xs text-text-muted">
                  All routes • max 7 guests • large vehicle available on request
                </p>

                {/* Route selector */}
                <div className="mt-6">
                  <label className="mb-2 block text-xs font-medium text-text-muted">
                    Select Route *
                  </label>
                  <select
                    value={routeLabel}
                    onChange={(e) => handleRouteChange(e.target.value)}
                    required
                    className="w-full rounded-xl border border-border bg-cream-warm px-4 py-3.5 text-sm text-text-primary outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                  >
                    <option value="">
                      Choose from the list or build custom...
                    </option>
                    <optgroup label="— Transfer Routes (fixed price, max 7 pax)">
                      {transferRoutes.map((r) => (
                        <option key={r.id} value={r.label}>
                          {r.label} — €{r.price}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="— Tour Routes (fixed price, max 7 pax)">
                      {tourRoutes.map((r) => (
                        <option key={r.id} value={r.label}>
                          {r.label} — €{r.price}
                        </option>
                      ))}
                    </optgroup>
                    {isCustom && selectedLabel === routeLabel && (
                      <option value={routeLabel}>
                        Custom: {routeLabel} — €{price}
                      </option>
                    )}
                  </select>
                  {routeLabel ? (
                    <div className="mt-3 rounded-xl border border-gold/20 bg-gold/5 px-4 py-3">
                      <p className="text-xs font-medium text-gold">Selected</p>
                      <p className="mt-1 text-sm font-medium text-text-primary">
                        {routeLabel.replace(/^Custom: /, "")}
                      </p>
                      {price && (
                        <p className="mt-1 text-sm text-text-secondary">
                          Fixed price:{" "}
                          <span className="font-semibold text-text-primary">
                            €{price}
                          </span>{" "}
                          per vehicle • max 7 guests
                        </p>
                      )}
                      {isCustom && (
                        <p className="mt-1 text-xs text-text-muted">
                          Custom estimate — final confirmation by our team
                          within 2h via email.
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="mt-2 text-xs text-text-muted">
                      Tip: pick a route above, or use "Build your own route"
                      section for a custom estimate.
                    </p>
                  )}
                </div>

                <div className="mt-6 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Full Name *"
                      name="name"
                      required
                      placeholder="Jane Doe"
                      value={name}
                      onChange={setName}
                    />
                    <Field
                      label="Email *"
                      name="email"
                      type="email"
                      required
                      placeholder="jane@mail.com"
                      value={email}
                      onChange={setEmail}
                    />
                  </div>
                  <Field
                    label="Phone Number *"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+39 328 123 4961"
                    value={phone}
                    onChange={setPhone}
                  />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Date *"
                      name="date"
                      type="date"
                      required
                      value={date}
                      onChange={setDate}
                    />
                    <Field
                      label="Pickup Time *"
                      name="time"
                      type="time"
                      required
                      value={time}
                      onChange={setTime}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-medium text-text-muted">
                      Number of Guests * (max 7)
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full rounded-xl border border-border bg-cream-warm px-4 py-3.5 text-sm text-text-primary outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                    >
                      <option>1 Guest</option>
                      <option>2 Guests</option>
                      <option>3 Guests</option>
                      <option>4 Guests</option>
                      <option>5 Guests</option>
                      <option>6 Guests</option>
                      <option>7 Guests</option>
                    </select>
                  </div>
                  <Field
                    label="Hotel / Pickup Location *"
                    name="pickup"
                    required
                    placeholder="Hotel name or address"
                    value={pickup}
                    onChange={setPickup}
                  />
                  <div>
                    <label className="mb-2 block text-xs font-medium text-text-muted">
                      Special Requests (optional)
                    </label>
                    <textarea
                      rows={3}
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="Child seat, language preference, flight number if airport transfer..."
                      className="w-full rounded-xl border border-border bg-cream-warm px-4 py-3.5 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                    />
                  </div>
                </div>

                {/* Error message */}
                {error && (
                  <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                    <p className="flex items-center gap-2 text-sm text-red-700">
                      <svg
                        className="h-4 w-4 flex-shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                      {error}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold-light py-4 text-sm font-semibold text-white shadow-lg shadow-gold/25 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <svg
                        className="h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Booking...
                    </>
                  ) : (
                    <>Confirm Appointment{price ? ` — €${price}` : ""}</>
                  )}
                </button>

                <p className="mt-3 text-center text-[11px] text-text-muted">
                  Free cancellation up to 24h before. Questions?{" "}
                  <a
                    href="tel:+393281234961"
                    className="font-medium text-gold"
                  >
                    +39 328 123 4961
                  </a>{" "}
                  •{" "}
                  <a
                    href="mailto:maxromeexecutivechauffeur@outlook.it"
                    className="font-medium text-gold"
                  >
                    Email
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-text-muted">
        {label}
      </label>
      <input
        required={required}
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-cream-warm px-4 py-3.5 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
      />
    </div>
  );
}
