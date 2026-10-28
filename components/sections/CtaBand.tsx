"use client";

import { useCallback, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, FileText, PhoneCall, Sparkles } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { accountCta } from "@/lib/content";

export default function CtaBand() {
  const bandRef = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = bandRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--cta-mouse-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--cta-mouse-y", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <section
      id="adhesion"
      ref={bandRef}
      onMouseMove={handleMouseMove}
      data-spy="adhesion"
      aria-labelledby="adhesion-title"
      className="band-green relative overflow-hidden border-y border-white/10 py-5 sm:py-6 lg:py-7 text-white"
    >
      {/* Gliding Glowing Light Beam Effect */}
      <div className="cta-glow-line" aria-hidden="true">
        <div className="cta-glow-beam" />
      </div>

      {/* Interactive Mouse Hover Spotlight */}
      <div className="cta-spotlight" aria-hidden="true" />

      {/* Delicate Geometric Wireframe Accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -start-20 -top-20 size-56"
      >
        <div className="footer-orbit-ring size-full rounded-full border border-white/8" />
        <div className="footer-pulse-ring absolute inset-6 rounded-full border border-orange/20" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-14 -bottom-14 size-44"
      >
        <div className="footer-pulse-ring size-full rounded-full border border-orange/15" />
        <div className="absolute inset-5 rounded-full border border-white/5" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute end-[6%] top-5 size-2 rounded-full bg-red shadow-[0_0_6px_rgba(216,68,46,0.6)] animate-pulse"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 xl:px-10">
        <div className="flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          {/* Text & Badge */}
          <Reveal className="max-w-3xl">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-orange/30 bg-orange/15 px-2.5 py-0.5 text-[11px] font-semibold text-orange">
                <Sparkles className="size-3 shrink-0" />
                <span>خدمات فلاحية وتجارية</span>
              </span>
              <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-white/30" />
              <span className="hidden sm:inline-block text-[11.5px] font-medium text-white/70">
                مرافقة مخصصة للمنتجين والمربين
              </span>
            </div>

            <h2
              id="adhesion-title"
              className="font-display mt-2 text-[17px] sm:text-[19px] lg:text-[21px] font-bold leading-snug tracking-tight text-white"
            >
              {accountCta.title}
            </h2>
            <p className="mt-1 text-[12.5px] sm:text-[13px] leading-relaxed text-white/80">
              {accountCta.description}
            </p>
          </Reveal>

          {/* Action Buttons */}
          <Reveal delay={0.08} className="shrink-0">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/espace-client#dossier"
                className="btn btn-white text-[12.5px] sm:text-[13px] py-2 px-5 group shadow-md"
              >
                <span className="flex items-center gap-2">
                  <FileText className="size-4 shrink-0 text-orange-deep group-hover:text-ink transition-colors" />
                  <span>{accountCta.primaryCta}</span>
                  <ArrowLeft className="size-4 shrink-0 transition-transform duration-300 group-hover:-translate-x-1" />
                </span>
              </Link>

              <a
                href="#contact"
                className="btn btn-ghost-light text-[12.5px] sm:text-[13px] py-2 px-4 group"
              >
                <span className="flex items-center gap-2">
                  <PhoneCall className="size-3.5 shrink-0 text-orange transition-transform duration-300 group-hover:scale-110" />
                  <span>{accountCta.secondaryCta}</span>
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
