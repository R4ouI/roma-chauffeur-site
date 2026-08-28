import { useEffect, useState } from "react";

const links = [
  { label: "Routes", href: "#routes" },
  { label: "Custom", href: "#custom" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-white/95 shadow-sm backdrop-blur-lg"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#top" className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-light shadow-md shadow-gold/30">
            <span className="font-display text-[11px] font-bold leading-none text-white">MR</span>
          </div>
          <span className="truncate text-sm font-semibold tracking-tight text-text-primary sm:text-[15px]">
            maxrome<span className="font-light text-gold">executivechauffeur</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-secondary transition-colors hover:text-gold"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#book"
            className="rounded-full bg-gradient-to-r from-gold to-gold-light px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-gold/20 transition-all hover:shadow-lg hover:shadow-gold/30"
          >
            Book Your Ride
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="text-text-primary md:hidden"
          aria-label="Menu"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? (
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-white/98 px-6 py-6 backdrop-blur-lg md:hidden">
          <div className="flex flex-col gap-5">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-text-secondary transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#book"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-gradient-to-r from-gold to-gold-light px-6 py-3 text-center text-sm font-semibold text-white"
            >
              Book Your Ride
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
