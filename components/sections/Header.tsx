"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Menu, X } from "lucide-react";
import BrandMark from "@/components/BrandMark";
import { nav, site } from "@/lib/content";

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>("top");
  const [progress, setProgress] = useState(0);
  const lastY = useRef(0);
  const frame = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    const update = () => {
      frame.current = 0;
      const y = window.scrollY;
      const delta = y - lastY.current;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;

      setSolid(y > 24);
      setProgress(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0);

      if (!open && y > 160 && Math.abs(delta) > 6) {
        setHidden(delta > 0);
      } else if (y <= 160 || delta < 0) {
        setHidden(false);
      }

      lastY.current = y;
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
  }, [open]);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-spy]"),
    );

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActive(visible[0].target.getAttribute("data-spy"));
        }
      },
      { rootMargin: "-38% 0px -46% 0px", threshold: [0, 0.05, 0.2, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

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

  const isSolid = solid || open;

  return (
    <header
      className={`sticky top-0 z-50 h-[var(--header-h)] w-full border-b transition-[transform,background-color,color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        isSolid
          ? "border-line bg-[rgba(255,253,248,0.9)] text-ink shadow-[0_10px_36px_-12px_rgba(34,26,16,0.18)] backdrop-blur-xl"
          : "border-transparent bg-transparent text-white"
      }`}
    >
      <div className="mx-auto flex h-full w-full max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 xl:px-10">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3"
          aria-label={`${site.brandLatin} — ${site.title}`}
        >
          <BrandMark priority />
          <span className="flex min-w-0 flex-col leading-none">
            <span className="brand-latin font-display text-[16px] font-bold sm:text-[17px]">
              {site.brandLatin}
            </span>
            <span
              className={`mt-1.5 hidden truncate text-[10.5px] font-medium leading-none sm:block ${
                isSolid ? "text-muted" : "text-white/70"
              }`}
            >
              {site.brandSubtitle}
            </span>
          </span>
        </Link>

        <nav
          aria-label={nav.navLabel}
          className="hidden min-w-0 items-center gap-0.5 xl:flex"
        >
          {nav.items.map((item) => {
            const isActive = Boolean(item.spy && item.spy === active);

            return (
              <a
                key={item.label}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative whitespace-nowrap px-2.5 py-2 text-[12.5px] font-medium transition-colors duration-200 after:absolute after:bottom-0 after:right-0 after:h-[2px] after:w-full after:origin-right after:scale-x-0 after:rounded-full after:bg-orange after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:after:scale-x-100 ${
                  isActive
                    ? "text-orange-deep after:scale-x-100"
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

      {open ? (
        <div
          id="mobile-nav"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-var(--header-h))] overflow-y-auto border-b border-line bg-bg text-ink shadow-[0_24px_50px_rgba(34,26,16,0.12)] xl:hidden"
        >
          <nav
            aria-label={nav.navLabel}
            className="mx-auto grid w-full max-w-[1440px] gap-1 px-4 py-4 sm:px-6"
          >
            {nav.items.map((item) => {
              const isActive = Boolean(item.spy && item.spy === active);

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
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
      ) : null}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-transparent">
        <div
          className="h-full w-full origin-right bg-orange transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${progress})` }}
          aria-hidden="true"
        />
      </div>
    </header>
  );
}
