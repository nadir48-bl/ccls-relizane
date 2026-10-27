"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type CounterProps = {
  value: number;
  suffix?: string;
  decimals?: number;
  unit?: string;
};

function format(value: number, decimals = 0) {
  if (decimals > 0) {
    return value
      .toFixed(decimals)
      .replace(".", ",")
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export default function Counter({
  value,
  suffix,
  decimals = 0,
  unit,
}: CounterProps) {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const number = numberRef.current;
    if (!wrapper || !number) return;

    const finalValue = format(value, decimals);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      number.textContent = finalValue;
      return;
    }

    number.textContent = format(0, decimals);

    const state = { value: 0 };
    const tween = gsap.to(state, {
      value,
      duration: 1.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: wrapper,
        start: "top 86%",
        once: true,
      },
      onUpdate: () => {
        number.textContent = format(state.value, decimals);
      },
      onComplete: () => {
        number.textContent = finalValue;
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value, decimals]);

  return (
    <span ref={wrapperRef} className="inline-flex items-baseline gap-2">
      <span dir="ltr" className="inline-flex items-baseline">
        <span ref={numberRef} aria-hidden="true">
          {format(value, decimals)}
        </span>
        {suffix ? <span aria-hidden="true">{suffix}</span> : null}
      </span>
      {unit ? (
        <span
          aria-hidden="true"
          className="text-[0.42em] font-medium opacity-75"
        >
          {unit}
        </span>
      ) : null}
      <span className="sr-only">
        {format(value, decimals)}
        {suffix ?? ""} {unit ?? ""}
      </span>
    </span>
  );
}
