"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Users } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { hero } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

const chipIcons = [MapPin, Users];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const photo = photoRef.current;
    if (!section || !photo) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(section.querySelectorAll(".hero-anim"), {
        opacity: 1,
        y: 0,
      });
      gsap.set(section.querySelectorAll(".line-inner"), { yPercent: 0 });
      gsap.set(photo, { scale: 1 });
      return;
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      timeline
        .fromTo(
          photo,
          { scale: 1.06 },
          { scale: 1, duration: 1, ease: "power2.out" },
          0,
        )
        .fromTo(
          section.querySelectorAll(".hero-eyebrow"),
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.45 },
          0.05,
        )
        .fromTo(
          section.querySelectorAll(".line-inner"),
          { yPercent: 112 },
          { yPercent: 0, duration: 0.68, stagger: 0.07 },
          0.1,
        )
        .fromTo(
          section.querySelectorAll(".hero-cta"),
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.06 },
          0.32,
        )
        .fromTo(
          section.querySelectorAll(".hero-chip"),
          { opacity: 0 },
          { opacity: 1, duration: 0.55, stagger: 0.07 },
          0.42,
        );

      gsap.to(photo, {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      data-spy="top"
      className="hero-stage -mt-[var(--header-h)]"
      aria-labelledby="hero-title"
    >
      <div ref={photoRef} className="hero-photo">
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="hero-veil" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -start-40 top-[16%] z-[2] hidden size-[34rem] rounded-full border border-white/15 lg:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute end-[6%] top-[18%] z-[2] hidden size-24 rounded-full border border-orange/30 lg:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute end-[8.5%] top-[20.5%] z-[2] hidden size-2.5 rounded-full bg-red lg:block"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-end px-4 pb-14 pt-40 sm:px-6 sm:pb-16 lg:pb-20 xl:px-10">
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <p className="hero-eyebrow hero-anim flex items-center gap-4 text-white/80">
              <span dir="ltr" className="latin-label">
                {hero.eyebrow}
              </span>
              <span
                aria-hidden="true"
                className="h-px w-12 bg-orange/70 sm:w-20"
              />
            </p>

            <h1
              id="hero-title"
              aria-label={hero.title}
              className="hero-title mt-5 text-white sm:mt-7"
            >
              {hero.titleLines.map((line, index) => (
                <span key={line} className="line-mask" aria-hidden="true">
                  <span
                    className={`line-inner ${
                      index === hero.titleLines.length - 1 ? "text-orange" : ""
                    }`}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
              <Link
                href="/espace-client"
                className="hero-cta hero-anim btn btn-white"
              >
                <span>
                  {hero.primaryCta}
                  <ArrowLeft className="size-4" strokeWidth={1.75} />
                </span>
              </Link>
              <a
                href="#services"
                className="hero-cta hero-anim btn btn-ghost-light"
              >
                <span>{hero.secondaryCta}</span>
              </a>
            </div>
          </div>

          <div className="hidden justify-end gap-3 lg:col-span-4 lg:flex lg:flex-wrap">
            {hero.chips.map((chip, index) => {
              const Icon = chipIcons[index % chipIcons.length];

              return (
                <div
                  key={chip.label}
                  className="hero-chip hero-anim"
                  style={{ animationDelay: `${-3.5 * index}s` }}
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-tint-green text-green">
                    <Icon className="size-4" strokeWidth={1.75} />
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="flex items-baseline gap-1">
                      <span dir="ltr" className="chip-value">
                        {chip.value}
                      </span>
                      <span className="text-[11px] font-medium text-muted">
                        {chip.unit}
                      </span>
                    </span>
                    <span className="text-[10.5px] text-muted">
                      {chip.label}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
