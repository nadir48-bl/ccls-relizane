"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type CounterProps = {
  value: number;
  suffix?: string;
  decimals?: number;
  pad?: number;
  unit?: string;
};

function format(value: number, decimals = 0, pad = 0) {
  const formatted =
    decimals > 0
      ? value.toFixed(decimals).replace(".", ",")
      : Math.round(value).toString();
  const [integer, fraction] = formatted.split(",");
  const padded = pad > 0 ? integer.padStart(pad, "0") : integer;
  const grouped = padded.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return fraction ? `${grouped},${fraction}` : grouped;
}

export default function Counter({
  value,
  suffix,
  decimals = 0,
  pad = 0,
  unit,
}: CounterProps) {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const number = numberRef.current;
    if (!wrapper || !number) return;

    const finalValue = format(value, decimals, pad);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      number.textContent = finalValue;
      return;
    }

    const ctx = gsap.context(() => {
      number.textContent = format(0, decimals, pad);
      const state = { value: 0 };
      gsap.to(state, {
        value,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: wrapper,
          start: "top 86%",
          once: true,
        },
        onUpdate: () => {
          if (number) number.textContent = format(state.value, decimals, pad);
        },
        onComplete: () => {
          if (number) number.textContent = finalValue;
        },
      });
    }, wrapper);

    return () => {
      ctx.revert();
    };
  }, [value, decimals, pad]);

  return (
    <span ref={wrapperRef} className="inline-flex items-baseline gap-2">
      <span dir="ltr" className="inline-flex items-baseline">
        <span ref={numberRef} aria-hidden="true">
          {format(value, decimals, pad)}
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
        {format(value, decimals, pad)}
        {suffix ?? ""} {unit ?? ""}
      </span>
    </span>
  );
}
