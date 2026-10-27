import {
  ArrowUp,
  Clock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import BrandMark from "@/components/BrandMark";
import Reveal from "@/components/motion/Reveal";
import { a11y, footer, site, tutelle } from "@/lib/content";

function isPlaceholder(value: string) {
  return value.startsWith("[[") && value.endsWith("]]");
}

export default function Footer() {
  const { contact } = footer;
  const phoneIsPlaceholder = isPlaceholder(contact.phone);
  const emailIsPlaceholder = isPlaceholder(contact.email);

  return (
    <footer
      id="contact"
      data-spy="contact"
      className="band-green relative overflow-hidden border-t border-white/10 pb-8 pt-20 sm:pt-24 text-white"
    >
      {/* Animated Subtle Glowing Top Line */}
      <div className="footer-glow-line" aria-hidden="true">
        <div className="footer-glow-beam" />
      </div>

      {/* Live Merged Wheat Image Layer (hero-wheat.webp) */}
      <div className="footer-wheat-container" aria-hidden="true">
        <div className="footer-wheat-img" />
        <div className="footer-wheat-overlay" />
      </div>

      {/* Signature Animated Concentric Rings & Ornaments matching Global Style */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -start-40 bottom-[-12rem] size-[36rem]"
      >
        <div className="footer-orbit-ring size-full rounded-full border border-white/8" />
        <div className="footer-pulse-ring absolute inset-10 rounded-full border border-orange/20" />
        <div className="absolute inset-24 rounded-full border border-white/5" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-24 -top-24 size-[24rem]"
      >
        <div className="footer-pulse-ring size-full rounded-full border border-orange/15" />
        <div className="absolute inset-12 rounded-full border border-white/5" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute end-[8%] top-14 size-2.5 rounded-full bg-red shadow-[0_0_8px_rgba(216,68,46,0.6)] animate-pulse"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 xl:px-10">
        <div className="grid gap-10 sm:grid-cols-3 lg:grid-cols-12 lg:gap-8">
          {/* Brand & Tutelle Column */}
          <Reveal className="sm:col-span-3 lg:col-span-4">
            <a
              href="#top"
              className="flex items-center gap-3 group"
              aria-label={`${site.brandLatin} — ${site.title}`}
            >
              <BrandMark />
              <span className="flex flex-col">
                <span className="brand-latin font-display text-[18px] font-bold text-white transition-colors group-hover:text-orange">
                  {site.brandLatin}
                </span>
                <span className="mt-1 text-[10.5px] text-white/65">
                  {site.brandSubtitle}
                </span>
              </span>
            </a>

            <div className="mt-3.5 inline-flex items-center gap-1.5 rounded-full border border-orange/30 bg-orange/10 px-3 py-1 text-[11px] font-medium text-orange">
              <ShieldCheck className="size-3.5 shrink-0" />
              <span>{tutelle.items[2]}</span>
            </div>

            <p className="mt-4 max-w-sm text-[13px] leading-[1.95] text-white/65">
              {site.footerDescription}
            </p>
          </Reveal>

          {/* Quick Links Column */}
          <Reveal delay={0.06} className="lg:col-span-2">
            <h3 className="mb-4 flex items-center gap-2 text-[12.5px] font-semibold text-white">
              <span
                aria-hidden="true"
                className="h-px w-5 bg-orange"
              />
              {footer.quickLinksTitle}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {footer.quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="footer-link text-[13px]">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Spaces Column */}
          <Reveal delay={0.12} className="lg:col-span-3">
            <h3 className="mb-4 flex items-center gap-2 text-[12.5px] font-semibold text-white">
              <span
                aria-hidden="true"
                className="h-px w-5 bg-orange"
              />
              {footer.spacesTitle}
            </h3>
            <ul className="flex flex-col gap-3">
              {footer.spaces.map((space) => (
                <li key={space.label}>
                  <a
                    href={space.href}
                    className="footer-link text-[13px] leading-relaxed"
                  >
                    {space.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Contact Details Column */}
          <Reveal delay={0.18} className="lg:col-span-3">
            <h3 className="mb-4 flex items-center gap-2 text-[12.5px] font-semibold text-white">
              <span
                aria-hidden="true"
                className="h-px w-5 bg-orange"
              />
              {footer.contactTitle}
            </h3>
            <ul className="flex flex-col gap-3 text-[13px] leading-relaxed">
              <li className="flex items-start gap-2.5 text-white/70">
                <MapPin
                  className="mt-1 size-4 shrink-0 text-orange"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <span className="break-words">{contact.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone
                  className="mt-1 size-4 shrink-0 text-orange"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                {phoneIsPlaceholder ? (
                  <span dir="ltr" className="text-orange/90">
                    {contact.phone}
                  </span>
                ) : (
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    dir="ltr"
                    className="footer-link text-orange"
                  >
                    {contact.phone}
                  </a>
                )}
              </li>
              <li className="flex items-start gap-2.5">
                <Mail
                  className="mt-1 size-4 shrink-0 text-orange"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                {emailIsPlaceholder ? (
                  <span dir="ltr" className="break-all text-orange/90">
                    {contact.email}
                  </span>
                ) : (
                  <a
                    href={`mailto:${contact.email}`}
                    dir="ltr"
                    className="footer-link break-all text-orange"
                  >
                    {contact.email}
                  </a>
                )}
              </li>
              <li className="flex items-start gap-2.5 text-white/65">
                <Clock
                  className="mt-1 size-4 shrink-0 text-orange"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <span>{contact.hours}</span>
              </li>
            </ul>
          </Reveal>
        </div>

        {/* Footer Bottom Bar */}
        <div className="mt-16 flex items-center justify-between gap-4 border-t border-orange/20 pt-5 sm:mt-20">
          <p className="flex min-w-0 items-start gap-2.5 text-[11px] leading-relaxed text-white/60 sm:text-[11.5px]">
            <span
              aria-hidden="true"
              className="mt-1.5 size-1.5 shrink-0 rounded-full bg-orange"
            />
            <span>
              <span className="font-medium text-orange">
                {footer.copyrightYear}
              </span>{" "}
              {footer.copyrightText}
            </span>
          </p>
          <a
            href="#top"
            aria-label={a11y.backToTop}
            className="footer-top"
            title={a11y.backToTop}
          >
            <ArrowUp
              className="size-4"
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
