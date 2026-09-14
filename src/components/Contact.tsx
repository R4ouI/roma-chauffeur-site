import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Contact() {
  return (
    <section id="contact" className="border-t border-border bg-white">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-2 lg:px-10 lg:py-32">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Reach Us
          </p>
          <h2 className="font-display text-4xl font-medium text-text-primary lg:text-5xl">
            Prefer to talk?
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-text-secondary">
            Our team at maxromeexecutivechauffeur is available 24/7. Whether
            you have a question about a route or need a custom itinerary, we are
            here.
          </p>

          <div className="mt-10 space-y-5">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold/20 to-gold/10">
                <svg
                  className="h-5 w-5 text-gold"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-text-muted">Email</p>
                <a
                  href="mailto:maxromeexecutivechauffeur@outlook.it"
                  className="text-sm font-medium text-text-primary hover:text-gold"
                >
                  maxromeexecutivechauffeur@outlook.it
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold/20 to-gold/10">
                <svg
                  className="h-5 w-5 text-gold"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-text-muted">Phone & WhatsApp</p>
                <a
                  href="tel:+393281234961"
                  className="text-sm font-medium text-text-primary hover:text-gold"
                >
                  +39 328 123 4961
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold/20 to-gold/10">
                <svg
                  className="h-5 w-5 text-gold"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 2.5a9.5 9.5 0 00-9.5 9.5c0 5.25 9.5 12.5 9.5 12.5S21.5 17.25 21.5 12A9.5 9.5 0 0012 2.5z" />
                  <circle cx="12" cy="11" r="3" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-text-muted">Instagram / TikTok</p>
                <a
                  href="https://instagram.com/maxrome.executivechauffeur"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-text-primary hover:text-gold"
                >
                  @maxrome.executivechauffeur
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <a
              href="https://instagram.com/maxrome.executivechauffeur"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-text-primary px-5 py-2.5 text-xs font-semibold text-white hover:bg-black"
            >
              Instagram
            </a>
            <a
              href="https://tiktok.com/@maxrome.executivechauffeur"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-xs font-semibold text-text-primary hover:border-gold hover:text-gold"
            >
              TikTok
            </a>
            <a
              href="https://wa.me/393281234961"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#1ebe5d]"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div className="flex flex-col justify-center lg:pl-8">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-text-muted">
            Or send a message
          </p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!date) {
      setError("Please select a preferred date.");
      return;
    }
    if (!time) {
      setError("Please select a preferred time.");
      return;
    }

    setSubmitting(true);

    const { error: insertError } = await supabase
      .from("contact_messages")
      .insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim() || null,
        preferred_date: date,
        preferred_time: time,
        message: message.trim() || null,
      });

    setSubmitting(false);

    if (insertError) {
      setError(
        "Something went wrong. Please try again or contact us directly by phone."
      );
      console.error("Supabase insert error:", insertError);
      return;
    }

    // Fire-and-forget: trigger email edge function
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
        table: "contact_messages",
        schema: "public",
        record: {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim() || null,
          preferred_date: date,
          preferred_time: time,
          message: message.trim() || null,
        },
      }),
    }).catch(() => {
      // Silent fail — message is saved, email can be retried manually
    });

    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-border bg-cream-warm text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-sage/20 to-sage/10">
          <svg
            className="h-6 w-6 text-sage"
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
        <h3 className="font-display text-2xl font-medium text-text-primary">
          Thank you
        </h3>
        <p className="mt-2 max-w-xs text-sm text-text-secondary">
          Our team will reach out within 2 hours at
          maxromeexecutivechauffeur@outlook.it. Grazie!
        </p>
        <button
          onClick={() => {
            setSent(false);
            setName("");
            setEmail("");
            setPhone("");
            setDate("");
            setTime("");
            setMessage("");
          }}
          className="mt-6 rounded-full border-2 border-border bg-white px-8 py-3 text-sm font-medium text-text-secondary hover:border-gold hover:text-gold"
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Full name"
          name="name"
          required
          placeholder="Jane Doe"
          value={name}
          onChange={setName}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          required
          placeholder="jane@mail.com"
          value={email}
          onChange={setEmail}
        />
      </div>
      <Input
        label="Phone (optional)"
        name="phone"
        type="tel"
        placeholder="+39 328 123 4961"
        value={phone}
        onChange={setPhone}
      />
      <Input
        label="Preferred date"
        name="date"
        type="date"
        required
        value={date}
        onChange={setDate}
      />
      <Input
        label="Preferred time"
        name="time"
        type="time"
        required
        value={time}
        onChange={setTime}
      />
      <div>
        <label className="mb-2 block text-xs font-medium text-text-muted">
          Message (optional)
        </label>
        <textarea
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your trip — any preferences, special requests..."
          className="w-full rounded-xl border border-border bg-cream-warm px-4 py-3.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/20"
        />
      </div>

      {/* Error message */}
      {error && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
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
        className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold-light py-4 text-sm font-semibold text-white shadow-lg shadow-gold/25 transition-all hover:shadow-xl hover:shadow-gold/35 disabled:cursor-not-allowed disabled:opacity-60"
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
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>
      <p className="text-center text-[11px] text-text-muted">
        By submitting, you accept our{" "}
        <a href="/privacy-policy.html" className="font-medium text-gold hover:underline">
          Privacy Policy
        </a>
        . We'll respond from maxromeexecutivechauffeur@outlook.it within a few
        hours.
      </p>
    </form>
  );
}

function Input({
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
      <label htmlFor={name} className="mb-2 block text-xs font-medium text-text-muted">
        {label}
      </label>
      <input
        id={name}
        required={required}
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-cream-warm px-4 py-3.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/20"
      />
    </div>
  );
}
