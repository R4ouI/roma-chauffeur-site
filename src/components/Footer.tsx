export default function Footer() {
  return (
    <footer className="bg-text-primary text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-light">
                <span className="font-display text-[11px] font-bold text-white">MR</span>
              </div>
              <span className="text-[15px] font-semibold tracking-tight text-white">
                maxrome<span className="font-light text-gold-light">executivechauffeur</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Premium private transfers & tours in Rome and beyond. Fixed prices, luxury chauffeur service, car & van options.
            </p>
            <div className="mt-6 space-y-2 text-sm text-white/70">
              <a href="mailto:maxromeexecutivechauffeur@outlook.it" className="flex items-center gap-2 hover:text-gold-light">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                maxromeexecutivechauffeur@outlook.it
              </a>
              <a href="tel:+393281234961" className="flex items-center gap-2 hover:text-gold-light">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                +39 328 123 4961
              </a>
              <div className="flex gap-4 pt-2">
                <a href="https://instagram.com/maxrome.executivechauffeur" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs hover:border-gold-light hover:text-gold-light">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.2"/></svg>
                  @maxrome.executivechauffeur
                </a>
                <a href="https://tiktok.com/@maxrome.executivechauffeur" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs hover:border-gold-light hover:text-gold-light">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V8.97a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.75a8.16 8.16 0 004.76 1.52V6.84a4.83 4.83 0 01-3.01-.15z"/></svg>
                  TikTok
                </a>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/50">
              Explore
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><a href="#routes" className="transition-colors hover:text-gold-light">Routes</a></li>
              <li><a href="#custom" className="transition-colors hover:text-gold-light">Custom Route</a></li>
              <li><a href="#book" className="transition-colors hover:text-gold-light">Book Now</a></li>
              <li><a href="#reviews" className="transition-colors hover:text-gold-light">Reviews</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/50">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><a href="tel:+393281234961" className="hover:text-gold-light">+39 328 123 4961</a></li>
              <li><a href="mailto:maxromeexecutivechauffeur@outlook.it" className="hover:text-gold-light">Email us</a></li>
              <li><a href="https://instagram.com/maxrome.executivechauffeur" target="_blank" rel="noreferrer" className="hover:text-gold-light">Instagram</a></li>
              <li><a href="https://tiktok.com/@maxrome.executivechauffeur" target="_blank" rel="noreferrer" className="hover:text-gold-light">TikTok</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 md:flex-row">
          <p>© {new Date().getFullYear()} maxromeexecutivechauffeur. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <a href="/legal-notice.html" className="transition-colors hover:text-white/70">Legal Notice</a>
            <a href="/privacy-policy.html" className="transition-colors hover:text-white/70">Privacy Policy</a>
            <a href="/cookie-policy.html" className="transition-colors hover:text-white/70">Cookie Policy</a>
            <a href="/terms-and-conditions.html" className="transition-colors hover:text-white/70">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
