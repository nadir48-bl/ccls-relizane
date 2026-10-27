"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { news } from "@/lib/content";

const AUTOPLAY_MS = 7000;

export default function News() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [inView, setInView] = useState(true);
  const [reduced, setReduced] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const elapsedRef = useRef(0);

  const paused =
    !playing || hovered || focused || !tabVisible || !inView || reduced;
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const motionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const onMotionChange = () => setReduced(motionQuery.matches);
    onMotionChange();

    const onVisibility = () =>
      setTabVisible(document.visibilityState === "visible");

    onVisibility();
    motionQuery.addEventListener("change", onMotionChange);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      motionQuery.removeEventListener("change", onMotionChange);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.12 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const delta = now - last;
      last = now;

      if (!pausedRef.current) {
        elapsedRef.current += delta;

        if (elapsedRef.current >= AUTOPLAY_MS) {
          elapsedRef.current = 0;
          progressRef.current?.style.setProperty("--progress", "0");
          setIndex((current) => (current + 1) % news.slides.length);
        } else {
          progressRef.current?.style.setProperty(
            "--progress",
            String(elapsedRef.current / AUTOPLAY_MS),
          );
        }
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const selectSlide = (nextIndex: number) => {
    elapsedRef.current = 0;
    progressRef.current?.style.setProperty("--progress", "0");
    setIndex(nextIndex);
  };

  const slide = news.slides[index];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-bg py-24 sm:py-28 lg:py-32"
      aria-labelledby="news-title"
    >
      <div
        aria-hidden="true"
        className="soft-blob -start-24 top-16 size-[26rem] bg-tint-green"
      />
      <div
        aria-hidden="true"
        className="soft-blob end-0 bottom-0 size-[22rem] bg-tint-orange"
      />
      <div
        aria-hidden="true"
        className="ring-mark end-[-9rem] top-24 size-[26rem]"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 xl:px-10">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-8">
            <p className="kicker">{news.kicker}</p>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-8">
            <h2 id="news-title" className="display h2 mt-4 text-ink">
              {news.titleBefore}
              <em className="alt-word">{news.titleEm}</em>
            </h2>
          </Reveal>
        </div>

        <Reveal
          className="mt-10 grid gap-5 sm:mt-12 lg:grid-cols-12 lg:gap-6"
          stagger={0.1}
        >
          <div
            className="min-w-0 lg:col-span-8"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocusCapture={(event) => {
              const target = event.target as HTMLElement;
              if (target.matches(":focus-visible")) setFocused(true);
            }}
            onBlurCapture={(event) => {
              if (
                !event.currentTarget.contains(
                  event.relatedTarget as Node | null,
                )
              ) {
                setFocused(false);
              }
            }}
          >
            <div
              id="news-stage"
              className="card relative overflow-hidden rounded-card"
            >
              <div className="relative min-h-[460px] sm:min-h-[520px] lg:min-h-[560px]">
                {news.slides.map((item, slideIndex) => (
                  <div
                    key={item.id}
                    aria-hidden={slideIndex !== index}
                    className={`absolute inset-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      slideIndex === index
                        ? "opacity-100"
                        : "pointer-events-none opacity-0"
                    }`}
                  >
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      sizes="(min-width: 1024px) 66vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ))}

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,77,42,0.12)_0%,rgba(15,77,42,0.2)_38%,rgba(15,77,42,0.94)_100%)]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(80%_70%_at_88%_8%,rgba(240,126,31,0.2),transparent_55%)]"
                />

                <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4 sm:p-5">
                  <div className="flex min-h-7 flex-wrap items-center gap-2.5">
                    {slide.badge ? (
                      <span className="rounded-full bg-red px-2.5 py-1 text-[10.5px] font-semibold leading-none text-white">
                        {slide.badge}
                      </span>
                    ) : null}
                    <span className="text-[11.5px] font-medium text-white/80">
                      {slide.date}
                    </span>
                  </div>

                  {!reduced ? (
                    <button
                      type="button"
                      onClick={() => setPlaying((value) => !value)}
                      aria-label={
                        playing ? news.pauseLabel : news.playLabel
                      }
                      className="news-pause grid size-9 shrink-0 place-items-center rounded-full text-ink"
                    >
                      {playing ? (
                        <Pause
                          className="size-3.5"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                      ) : (
                        <Play
                          className="size-3.5"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  ) : null}
                </div>

                <div
                  key={slide.id}
                  className="news-slide-enter absolute inset-x-0 bottom-0 z-10 p-4 pb-6 sm:p-6 sm:pb-8 lg:p-8 lg:pb-10"
                >
                  <h3 className="display max-w-3xl text-[clamp(1.55rem,3vw,2.55rem)] leading-[1.3] text-white">
                    {slide.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-[13.5px] leading-[1.9] text-white/80 sm:text-[14.5px]">
                    {slide.excerpt}
                  </p>
                </div>

                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 z-20 h-[3px] bg-white/20"
                >
                  {!reduced ? (
                    <div
                      ref={progressRef}
                      className="news-progress"
                      style={{ "--progress": 0 } as CSSProperties}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <ul
            aria-label={news.listLabel}
            className="card flex min-w-0 flex-col p-2 lg:col-span-4"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocusCapture={(event) => {
              const target = event.target as HTMLElement;
              if (target.matches(":focus-visible")) setFocused(true);
            }}
            onBlurCapture={(event) => {
              if (
                !event.currentTarget.contains(
                  event.relatedTarget as Node | null,
                )
              ) {
                setFocused(false);
              }
            }}
          >
            {news.slides.map((item, slideIndex) => {
              const isActive = slideIndex === index;

              return (
                <li
                  key={item.id}
                  className="flex-1 border-b border-line last:border-b-0"
                >
                  <button
                    type="button"
                    onClick={() => selectSlide(slideIndex)}
                    aria-controls="news-stage"
                    aria-current={isActive ? "true" : undefined}
                    className="news-thumb group flex h-full w-full flex-col justify-center gap-1.5 rounded-[14px] border border-transparent px-3.5 py-4 text-start sm:px-4"
                  >
                    <span className="flex items-center gap-2 text-[10.5px] font-medium text-muted">
                      <span
                        aria-hidden="true"
                        className="news-thumb-dot size-1.5 shrink-0 rounded-full bg-red"
                      />
                      <span
                        dir="ltr"
                        className="news-thumb-index tabular-nums transition-colors duration-200"
                      >
                        {String(slideIndex + 1).padStart(2, "0")}
                      </span>
                      <span>{item.date}</span>
                    </span>
                    <span
                      className={`text-[14px] font-semibold leading-snug transition-colors duration-200 sm:text-[14.5px] ${
                        isActive
                          ? "text-orange-deep"
                          : "text-ink group-hover:text-orange-deep"
                      }`}
                    >
                      {item.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
