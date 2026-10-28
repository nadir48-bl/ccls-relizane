"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Menu, X } from "lucide-react";
import BrandMark from "@/components/BrandMark";
import { nav, site } from "@/lib/content";

const SPY_MARKER = 120;

function hrefPath(href: string) {
  return href.split("#")[0] || "/";
}

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "";

  const routeItem = nav.items.find((item) => {
    if (item.href.includes("#")) return false;
    const path = hrefPath(item.href);
    return pathname === path || pathname.startsWith(`${path}/`);
  });

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [sectionActive, setSectionActive] = useState<string | null>("top");
  const [indicator, setIndicator] = useState<{
    left: number;
    width: number;
  } | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const frame = useRef(0);

  const active = isHome ? sectionActive : (routeItem?.spy ?? null);
  const isSolid = !isHome || scrolled || open;
  const activeItem = nav.items.find((item) => item.spy === active);
  const activeLabel = activeItem?.label ?? null;
  const showSectionChip = Boolean(
    isSolid && activeLabel && active !== "top",
  );

  useEffect(() => {
    const sections = isHome
      ? Array.from(document.querySelectorAll<HTMLElement>("[data-spy]"))
      : [];

    const update = () => {
      frame.current = 0;
      const y = window.scrollY;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;

      setScrolled(y > 24);

      let current: string | null = null;

      if (sections.length) {
        if (
          y + window.innerHeight >=
          document.documentElement.scrollHeight - 2
        ) {
          current = sections.at(-1)?.getAttribute("data-spy") ?? null;
        } else {
          for (const section of sections) {
            if (section.getBoundingClientRect().top <= SPY_MARKER) {
              current = section.getAttribute("data-spy");
            }
          }
        }
      }

      if (progressRef.current) {
        const progress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
        progressRef.current.style.transform = `scaleX(${progress})`;
      }

      if (current) setSectionActive(current);
    };

    const onScroll = () => {
      if (frame.current) return;
      frame.current = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current) window.cancelAnimationFrame(frame.current);
    };
  }, [isHome]);

  // Slide the active pill from one nav item to the next.
  useEffect(() => {
    const measure = () => {
      const container = navRef.current;
      if (!container) return;

      const link = container.querySelector<HTMLElement>(
        '[data-active="true"]',
      );

      if (!link || link.offsetWidth === 0) {
        setIndicator((previous) => (previous === null ? previous : null));
        return;
      }

      setIndicator((previous) =>
        previous &&
        previous.left === link.offsetLeft &&
        previous.width === link.offsetWidth
          ? previous
          : { left: link.offsetLeft, width: link.offsetWidth },
      );
    };

    measure();
    const raf = window.requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    void document.fonts?.ready.then(measure);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, [active]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const onResize = () => {
      if (window.innerWidth >= 1280) setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 h-[var(--header-h)] w-full transition-colors duration-300 ease-[var(--ease-out)] ${
        isSolid ? "text-ink" : "text-white"
      }`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 border-b border-line bg-[rgba(255,253,248,0.9)] shadow-[0_10px_36px_-12px_rgba(34,26,16,0.18)] backdrop-blur-xl transition-opacity duration-500 ease-[var(--ease-out)] motion-reduce:transition-none ${
          isSolid ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="relative mx-auto flex h-full w-full max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 xl:px-10">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3"
          aria-label={`${site.brandLatin} — ${site.title}`}
        >
          <BrandMark priority />
          <span className="flex min-w-0 flex-col leading-none">
            <span className="brand-latin font-display text-[17px] font-bold sm:text-[18px]">
              {site.brandLatin.split(" ")[0]}{" "}
              <span className="alt-word">{site.brandLatin.split(" ").slice(1).join(" ")}</span>
            </span>
            <span
              className={`mt-1.5 hidden truncate text-[12px] font-bold leading-none sm:block ${
                isSolid ? "text-muted" : "text-white/70"
              }`}
            >
              {site.brandSubtitle.split(" — ")[0] + " — "}
              <span className="alt-word">{site.brandSubtitle.split(" — ")[1]}</span>
            </span>
            {showSectionChip ? (
              <span className="mt-1.5 flex items-center gap-1.5 text-[10.5px] font-medium leading-none text-muted sm:hidden">
                <span
                  aria-hidden="true"
                  className="size-1.5 shrink-0 rounded-full bg-orange"
                />
                <span className="truncate">{activeLabel}</span>
              </span>
            ) : null}
          </span>
        </Link>

        <nav
          ref={navRef}
          aria-label={nav.navLabel}
          className="relative hidden min-w-0 items-center gap-0.5 xl:flex"
        >
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute bottom-1 left-0 top-1 rounded-full bg-tint-orange ring-1 ring-orange/10 transition-[transform,width,opacity] duration-500 ease-[var(--ease-out)] motion-reduce:transition-none ${
              isSolid ? "opacity-100" : "opacity-0"
            }`}
            style={{
              width: indicator?.width ?? 0,
              transform: `translateX(${indicator?.left ?? 0}px)`,
            }}
          />

          {nav.items.map((item) => {
            const isActive = Boolean(item.spy && item.spy === active);
            const isSectionLink = item.href.includes("#");

            const ariaCurrent = !isActive
              ? undefined
              : isHome
                ? isSectionLink
                  ? "location"
                  : undefined
                : isSectionLink
                  ? undefined
                  : "page";

            return (
              <a
                key={item.label}
                href={item.href}
                data-active={isActive ? "true" : undefined}
                aria-current={ariaCurrent}
                onClick={() => {
                  if (isHome && item.spy) setSectionActive(item.spy);
                }}
                className={`relative z-10 whitespace-nowrap px-2.5 py-2 text-[12.5px] font-medium transition-colors duration-200 after:absolute after:bottom-0 after:right-0 after:h-[2px] after:w-full after:origin-right after:scale-x-0 after:rounded-full after:bg-orange after:transition-transform after:duration-300 after:ease-[var(--ease-out)] hover:after:scale-x-100 ${
                  isActive
                    ? isSolid
                      ? "text-orange-deep"
                      : "text-white after:scale-x-100"
                    : isSolid
                      ? "text-ink/70 hover:text-orange-deep"
                      : "text-white/80 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2.5">
          {showSectionChip ? (
            <span
              aria-hidden="true"
              className="hidden shrink-0 items-center gap-1.5 rounded-full border border-line bg-white/70 px-2.5 py-1 text-[10.5px] font-semibold text-orange-deep shadow-sm backdrop-blur-sm sm:flex xl:hidden"
            >
              <span className="size-1.5 shrink-0 rounded-full bg-orange" />
              <span className="max-w-[9rem] truncate">{activeLabel}</span>
            </span>
          ) : null}

          <a
            href={nav.items.find((item) => item.label === nav.cta)?.href ?? "#"}
            className="btn btn-orange hidden min-h-[44px] px-5 py-2.5 text-[13px] md:inline-flex"
          >
            <span>
              {nav.cta}
              <ArrowLeft className="size-4" strokeWidth={1.75} />
            </span>
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? nav.closeLabel : nav.menuLabel}
            className={`grid size-11 place-items-center rounded-full border transition-colors duration-200 xl:hidden ${
              isSolid
                ? "border-line bg-white text-ink hover:border-orange"
                : "border-white/25 bg-white/5 text-white hover:border-white/60"
            }`}
          >
            {open ? (
              <X className="size-5" strokeWidth={1.75} />
            ) : (
              <Menu className="size-5" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        data-open={open ? "true" : "false"}
        className="mobile-nav border-b border-line bg-bg text-ink shadow-[0_24px_50px_rgba(34,26,16,0.12)] xl:hidden"
      >
        <nav
          aria-label={nav.navLabel}
          className="mx-auto grid w-full max-w-[1440px] gap-1 px-4 py-4 sm:px-6"
        >
          {nav.items.map((item) => {
            const isActive = Boolean(item.spy && item.spy === active);
            const isSectionLink = item.href.includes("#");

            const ariaCurrent = !isActive
              ? undefined
              : isHome
                ? isSectionLink
                  ? "location"
                  : undefined
                : isSectionLink
                  ? undefined
                  : "page";

            return (
              <a
                key={item.label}
                href={item.href}
                aria-current={ariaCurrent}
                onClick={() => {
                  setOpen(false);
                  if (isHome && item.spy) setSectionActive(item.spy);
                }}
                className={`flex items-center justify-between rounded-xl px-3 py-3 text-[15px] font-medium transition-colors ${
                  isActive
                    ? "bg-tint-orange text-orange-deep"
                    : "text-ink/80 hover:bg-bg-alt hover:text-ink"
                }`}
              >
                {item.label}
                <ArrowLeft
                  className="size-4 opacity-45"
                  strokeWidth={1.75}
                />
              </a>
            );
          })}
          <a
            href={nav.items.find((item) => item.label === nav.cta)?.href ?? "#"}
            onClick={() => setOpen(false)}
            className="btn btn-orange mt-3 w-full"
          >
            <span>
              {nav.cta}
              <ArrowLeft className="size-4" strokeWidth={1.75} />
            </span>
          </a>
        </nav>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-transparent">
        <div
          ref={progressRef}
          className="h-full w-full origin-right bg-orange"
          style={{ transform: "scaleX(0)" }}
          aria-hidden="true"
        />
      </div>
    </header>
  );
}
