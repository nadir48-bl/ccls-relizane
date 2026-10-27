"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  drawRules?: boolean;
  y?: number;
  itemSelector?: string;
};

export default function Reveal({
  children,
  className,
  delay = 0,
  stagger = 0,
  drawRules = false,
  y = 32,
  itemSelector,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      gsap.set(element, { opacity: 1, y: 0 });
      if (drawRules) {
        gsap.set(element.querySelectorAll("[data-rule]"), { scaleX: 1 });
      }
      return;
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        delay,
        scrollTrigger: {
          trigger: element,
          start: "top 78%",
          once: true,
        },
      });

      timeline.fromTo(
        element,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
        },
      );

      if (itemSelector) {
        timeline.fromTo(
          element.querySelectorAll(itemSelector),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: Math.max(stagger, 0.08),
            ease: "power3.out",
          },
          0.08,
        );
      } else if (stagger > 0) {
        timeline.fromTo(
          Array.from(element.children),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger,
            ease: "power3.out",
          },
          0.08,
        );
      }

      if (drawRules) {
        timeline.fromTo(
          element.querySelectorAll("[data-rule]"),
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.9,
            stagger: Math.max(stagger, 0.06),
            ease: "power2.inOut",
          },
          0.18,
        );
      }
    }, element);

    return () => context.revert();
  }, [delay, stagger, drawRules, y, itemSelector]);

  return (
    <div ref={ref} className={className} data-reveal>
      {children}
    </div>
  );
}
