"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { news } from "@/lib/content";

const AUTOPLAY_MS = 7000;
const total = news.slides.length;

const pad = (value: number) => String(value).padStart(2, "0");

export default function News() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [inView, setInView] = useState(true);
  const [reduced, setReduced] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const elapsedRef = useRef(0);

  const paused =
    !playing || hovered || focused || !tabVisible || !inView || reduced;
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
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
          setIndex((current) => (current + 1) % total);
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

  const goTo = (nextIndex: number) => {
    elapsedRef.current = 0;
    progressRef.current?.style.setProperty("--progress", "0");
    setIndex(((nextIndex % total) + total) % total);
  };

  const onStagePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;

    const stage = stageRef.current;
    if (!stage) return;

    const rect = stage.getBoundingClientRect();
    stage.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    stage.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };

  const slide = news.slides[index];

  return (
    <section
      id="news"
      ref={sectionRef}
      data-spy="news"
      aria-labelledby="news-title"
      className="relative overflow-hidden bg-bg py-24 sm:py-28 lg:py-32"
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
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="kicker">{news.kicker}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="news-title" className="display h2 mt-4 text-ink">
                {news.titleBefore}
                <em className="alt-word">{news.titleEm}</em>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.14} className="lg:col-span-5">
            <div className="flex flex-wrap items-end justify-between gap-5 border-t border-line pt-5 sm:gap-8 lg:justify-end lg:border-t-0 lg:pt-0">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.04em] text-muted">
                  {news.updatedLabel}
                </p>
                <p className="mt-1 text-[12.5px] font-medium text-ink">
                  {news.slides[0].date}
                </p>
              </div>
              <span aria-hidden="true" className="h-9 w-px bg-line" />
              <div className="flex items-baseline gap-1.5">
                <span
                  dir="ltr"
                  className="display text-[2.15rem] leading-none tabular-nums text-ink"
                >
                  {pad(total)}
                </span>
                <span className="text-[11px] font-medium text-muted">
                  {news.countLabel}
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal
          className="mt-10 sm:mt-12"
          y={44}
          itemSelector=".news-item"
          stagger={0.08}
        >
          <div
            className="news-shell group/shell relative overflow-hidden rounded-[24px] border border-white/10 lg:rounded-[30px]"
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
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-12 top-0 z-30 h-px bg-linear-to-l from-transparent via-orange/60 to-transparent"
            />

            <div className="grid lg:grid-cols-12">
              <div
                id="news-stage"
                ref={stageRef}
                onPointerMove={onStagePointerMove}
                className="news-stage relative min-h-[430px] overflow-hidden sm:min-h-[500px] lg:col-span-8 lg:min-h-[620px]"
              >
                {news.slides.map((item, slideIndex) => (
                  <div
                    key={item.id}
                    aria-hidden={slideIndex !== index}
                    data-active={slideIndex === index}
                    className="news-stage-img absolute inset-0"
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

                <div aria-hidden="true" className="news-veil" />
                <div aria-hidden="true" className="news-spot" />

                <div className="absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-3 p-4 sm:p-5 lg:p-6">
                  <div className="flex min-h-7 flex-wrap items-center gap-2.5">
                    {slide.badge ? (
                      <span className="news-badge">{slide.badge}</span>
                    ) : null}
                    <span className="news-date">{slide.date}</span>
                  </div>

                  <span className="news-counter" dir="ltr">
                    <span className="text-white">{pad(index + 1)}</span>
                    <span className="text-white/40">/</span>
                    <span className="text-white/55">{pad(total)}</span>
                  </span>
                </div>

                <div
                  key={slide.id}
                  className="absolute inset-x-3 bottom-3 z-20 sm:inset-x-5 sm:bottom-5"
                >
                  <div className="news-dock rounded-2xl p-4 sm:p-6 lg:p-7">
                    <div className="news-mask">
                      <h3 className="news-rise display text-[clamp(1.4rem,2.7vw,2.35rem)] leading-[1.35] text-white">
                        {slide.title}
                      </h3>
                    </div>
                    <div className="news-mask mt-2.5">
                      <p className="news-rise news-rise-2 line-clamp-2 max-w-2xl text-[13px] leading-[1.9] text-white/70 sm:line-clamp-none sm:text-[14px]">
                        {slide.excerpt}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 z-30 flex gap-0.5"
                >
                  {news.slides.map((item, slideIndex) => (
                    <span
                      key={item.id}
                      className="news-seg"
                      data-done={slideIndex < index}
                    >
                      <span
                        ref={
                          slideIndex === index && !reduced
                            ? progressRef
                            : undefined
                        }
                        className="news-seg-fill"
                        style={
                          { "--progress": slideIndex < index ? 1 : 0 } as CSSProperties
                        }
                      />
                    </span>
                  ))}
                </div>
              </div>

              <aside className="news-rail relative flex flex-col border-t border-white/10 lg:col-span-4 lg:border-s lg:border-t-0">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -end-16 -top-16 size-48 rounded-full border border-white/[0.06]"
                />

                <div className="flex items-center justify-between gap-3 px-4 pb-1 pt-4 sm:px-5">
                  <span className="text-[10px] font-semibold tracking-[0.06em] text-white/60">
                    {news.listLabel}
                  </span>
                  <span className="text-[10px] font-medium tabular-nums text-white/45" dir="ltr">
                    {pad(index + 1)} — {pad(total)}
                  </span>
                </div>

                <ul className="relative flex flex-col gap-1 px-2 py-2 lg:flex-1">
                  {news.slides.map((item, slideIndex) => {
                    const isActive = slideIndex === index;

                    return (
                      <li key={item.id} className="flex lg:flex-1">
                        <button
                          type="button"
                          onClick={() => goTo(slideIndex)}
                          aria-controls="news-stage"
                          aria-current={isActive ? "true" : undefined}
                          className="news-item group/item relative flex h-full w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-start sm:gap-3.5 sm:px-3 sm:py-3"
                        >
                          <span className="news-thumb-wrap relative size-12 shrink-0 overflow-hidden rounded-[10px] sm:size-14">
                            <Image
                              src={item.image.src}
                              alt=""
                              fill
                              sizes="56px"
                              className="news-thumb-img object-cover"
                            />
                          </span>

                          <span className="flex min-w-0 flex-1 flex-col justify-center">
                            <span className="flex items-center gap-2 text-[10px] font-medium text-white/60">
                              <span
                                dir="ltr"
                                className="news-item-index tabular-nums"
                              >
                                {pad(slideIndex + 1)}
                              </span>
                              <span
                                aria-hidden="true"
                                className="h-px w-3 bg-white/20"
                              />
                              <span>{item.date}</span>
                            </span>
                            <span className="news-item-title mt-1 line-clamp-2 text-[13px] font-semibold leading-[1.55] text-white/75 sm:text-[13.5px]">
                              {item.title}
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <div className="relative flex items-center justify-between gap-2 border-t border-white/10 p-2.5 sm:p-3">
                  {!reduced ? (
                    <button
                      type="button"
                      onClick={() => setPlaying((value) => !value)}
                      aria-label={playing ? news.pauseLabel : news.playLabel}
                      className="news-ctrl"
                    >
                      {playing ? (
                        <Pause
                          className="size-3.5"
                          strokeWidth={1.9}
                          aria-hidden="true"
                        />
                      ) : (
                        <Play
                          className="size-3.5"
                          strokeWidth={1.9}
                          aria-hidden="true"
                        />
                      )}
                      <span>{playing ? news.pauseLabel : news.playLabel}</span>
                    </button>
                  ) : (
                    <span className="text-[10px] text-white/55" />
                  )}

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => goTo(index - 1)}
                      aria-label={news.previousLabel}
                      className="news-arrow"
                    >
                      <ArrowRight
                        className="size-4"
                        strokeWidth={1.9}
                        aria-hidden="true"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => goTo(index + 1)}
                      aria-label={news.nextLabel}
                      className="news-arrow"
                    >
                      <ArrowLeft
                        className="size-4"
                        strokeWidth={1.9}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
