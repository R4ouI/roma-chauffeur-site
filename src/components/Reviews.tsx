import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Review = {
  id: string;
  created_at: string;
  name: string;
  origin: string | null;
  rating: number;
  comment: string;
};

function Stars({ rating, className = "h-5 w-5" }: { rating: number; className?: string }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`${className} ${i <= rating ? "fill-gold" : "fill-border"}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [thanks, setThanks] = useState(false);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setLoadError(false);
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("approved", true)
      .order("created_at", { ascending: false })
      .limit(12);
    setLoading(false);
    if (error) {
      setLoadError(true);
      console.error("Supabase fetch error:", error);
      return;
    }
    setReviews(data ?? []);
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!name.trim()) {
      setSubmitError("Please enter your name.");
      return;
    }
    if (rating < 1) {
      setSubmitError("Please select a star rating.");
      return;
    }
    if (!comment.trim()) {
      setSubmitError("Please write a short comment.");
      return;
    }

    setSubmitting(true);

    const { error } = await supabase.from("reviews").insert({
      name: name.trim(),
      origin: origin.trim() || null,
      rating,
      comment: comment.trim(),
    });

    setSubmitting(false);

    if (error) {
      setSubmitError("Something went wrong. Please try again.");
      console.error("Supabase insert error:", error);
      return;
    }

    setThanks(true);
    setName("");
    setOrigin("");
    setRating(0);
    setComment("");
    fetchReviews();
  };

  return (
    <section id="reviews" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Guest Stories
          </p>
          <h2 className="font-display text-4xl font-medium text-text-primary lg:text-5xl">
            What Our Guests Say
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-text-secondary">
            Real reviews from real guests. Travelled with us? Share your experience below.
          </p>
        </div>

        {/* Reviews grid */}
        {loading ? (
          <div className="grid gap-8 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-56 animate-pulse rounded-2xl border border-border bg-cream-warm" />
            ))}
          </div>
        ) : loadError ? (
          <div className="mx-auto max-w-md rounded-2xl border border-border bg-cream-warm p-8 text-center">
            <p className="text-sm text-text-secondary">Couldn't load reviews.</p>
            <button
              onClick={fetchReviews}
              className="mt-4 rounded-full border-2 border-border bg-white px-6 py-2.5 text-sm font-medium text-text-secondary hover:border-gold hover:text-gold"
            >
              Try Again
            </button>
          </div>
        ) : reviews.length === 0 ? (
          <div className="mx-auto max-w-md rounded-2xl border border-dashed border-border bg-cream-warm p-8 text-center">
            <p className="text-sm text-text-secondary">
              No reviews yet — be the first to share your experience!
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            {reviews.map((t) => (
              <div
                key={t.id}
                className="rounded-2xl border border-border bg-cream-warm p-8 transition-all duration-300 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/10"
              >
                <Stars rating={t.rating} />

                <p className="mt-6 text-sm leading-relaxed text-text-secondary">
                  "{t.comment}"
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-light text-sm font-semibold text-white">
                    {t.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{t.name}</p>
                    <p className="text-xs text-text-muted">
                      {t.origin
                        ? `${t.origin} • `
                        : ""}
                      {new Date(t.created_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Review form */}
        <div className="mx-auto mt-20 max-w-xl">
          <div className="rounded-2xl border border-border bg-white p-7 shadow-sm lg:p-8">
            <h3 className="font-display text-2xl font-medium text-text-primary">
              Leave a Review
            </h3>
            <p className="mt-2 text-sm text-text-secondary">
              How was your ride with maxromeexecutivechauffeur?
            </p>

            {thanks ? (
              <div className="mt-6 flex flex-col items-center rounded-xl bg-cream-warm p-8 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sage/10">
                  <svg className="h-6 w-6 text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-text-primary">Thank you for your review!</p>
                <p className="mt-1 text-xs text-text-muted">It's now live on the site.</p>
                <button
                  onClick={() => setThanks(false)}
                  className="mt-4 text-xs font-medium text-gold hover:underline"
                >
                  Write another review
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                {/* Star picker */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-text-muted">
                    Your rating *
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setRating(i)}
                        aria-label={`${i} star${i > 1 ? "s" : ""}`}
                        className="transition-transform hover:scale-110"
                      >
                        <svg
                          className={`h-7 w-7 transition-colors ${
                            i <= rating ? "fill-gold" : "fill-border hover:fill-gold/40"
                          }`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="review-name" className="mb-2 block text-xs font-medium text-text-muted">
                      Full name *
                    </label>
                    <input
                      id="review-name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full rounded-xl border border-border bg-cream-warm px-4 py-3.5 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="review-origin" className="mb-2 block text-xs font-medium text-text-muted">
                      Origin (optional)
                    </label>
                    <input
                      id="review-origin"
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      placeholder="London, UK"
                      className="w-full rounded-xl border border-border bg-cream-warm px-4 py-3.5 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="review-comment" className="mb-2 block text-xs font-medium text-text-muted">
                    Your comment *
                  </label>
                  <textarea
                    id="review-comment"
                    required
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us about your ride..."
                    className="w-full rounded-xl border border-border bg-cream-warm px-4 py-3.5 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                  />
                </div>

                {submitError && (
                  <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                    <p className="flex items-center gap-2 text-sm text-red-700">
                      <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      {submitError}
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
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    "Submit Review"
                  )}
                </button>
                <p className="mt-3 text-center text-[11px] text-text-muted">
                  By submitting, you consent to your review being published and accept our{" "}
                  <a href="/privacy-policy.html" className="font-medium text-gold hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
