import {
  ArrowUp,
  Clock,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import BrandMark from "@/components/BrandMark";
import Reveal from "@/components/motion/Reveal";
import { a11y, footer, site } from "@/lib/content";

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
      className="band-green relative overflow-hidden border-t border-white/10 pb-8 pt-20 sm:pt-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -start-40 bottom-[-12rem] size-[36rem] rounded-full border border-white/8"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute end-[8%] top-14 size-2.5 rounded-full bg-red"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 xl:px-10">
        <div className="grid gap-10 sm:grid-cols-3 lg:grid-cols-12 lg:gap-8">
          <Reveal className="sm:col-span-3 lg:col-span-4">
            <a
              href="#top"
              className="flex items-center gap-3"
              aria-label={`${site.brandLatin} — ${site.title}`}
            >
              <BrandMark />
              <span className="flex flex-col">
                <span className="brand-latin font-display text-[18px] font-bold text-white">
                  {site.brandLatin}
                </span>
                <span className="mt-1 text-[10.5px] text-white/60">
                  {site.brandSubtitle}
                </span>
              </span>
            </a>
            <p className="mt-5 max-w-sm text-[13px] leading-[1.95] text-white/65">
              {site.footerDescription}
            </p>
          </Reveal>

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

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/12 pt-5 sm:mt-20">
          <p className="text-[11px] leading-relaxed text-white/50 sm:text-[11.5px]">
            {footer.copyright}
          </p>
          <a
            href="#top"
            aria-label={a11y.backToTop}
            className="grid size-10 place-items-center rounded-full border border-white/20 text-white/70 transition-colors duration-200 hover:border-orange hover:text-orange"
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
