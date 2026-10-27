import {
  ArrowLeft,
  CalendarDays,
  FileText,
  MapPin,
  Tag,
  Tractor,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { shortcuts } from "@/lib/content";

const icons: Record<string, LucideIcon> = {
  tag: Tag,
  calendar: CalendarDays,
  "file-text": FileText,
  "map-pin": MapPin,
  tractor: Tractor,
};

const pad = (value: number) => String(value).padStart(2, "0");

export default function Shortcuts() {
  return (
    <section
      id="shortcuts"
      aria-labelledby="shortcuts-title"
      className="relative overflow-hidden bg-bg-alt py-24 sm:py-28 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="soft-blob -end-24 top-10 size-[24rem] bg-tint-orange"
      />
      <div
        aria-hidden="true"
        className="ring-mark -start-32 bottom-[-8rem] size-[22rem]"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 xl:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <Reveal>
              <p className="kicker">{shortcuts.kicker}</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2
                id="shortcuts-title"
                className="display mt-4 text-[clamp(1.9rem,3vw,2.7rem)] leading-[1.35] text-ink"
              >
                {shortcuts.title}
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="hidden sm:block">
            <div className="flex items-baseline gap-2.5">
              <span
                dir="ltr"
                aria-hidden="true"
                className="display text-[2.2rem] leading-none tabular-nums text-ink/20"
              >
                {pad(shortcuts.items.length)}
              </span>
              <span className="text-[11px] font-medium text-muted">
                {shortcuts.countLabel}
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal
          className="mt-10 sm:mt-12"
          itemSelector=".shortcut-cell"
          stagger={0.07}
        >
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
            {shortcuts.items.map((item, index) => {
              const Icon = icons[item.icon] ?? Tag;
              const isLast = index === shortcuts.items.length - 1;
              const isWide = index < 2;

              return (
                <li
                  key={item.title}
                  className={`shortcut-cell ${
                    isWide ? "lg:col-span-3" : "lg:col-span-2"
                  } ${isLast ? "sm:col-span-2 lg:col-span-2" : ""}`}
                >
                  <a
                    href={item.href}
                    className="shortcut-card group relative flex h-full min-h-[212px] flex-col overflow-hidden rounded-[20px] border border-line bg-white p-5 sm:p-6"
                  >
                    <span aria-hidden="true" className="shortcut-accent" />
                    <span aria-hidden="true" className="shortcut-glow" />

                    <span className="relative flex items-start justify-between gap-3">
                      <span className="shortcut-icon grid size-12 shrink-0 place-items-center rounded-[14px] bg-tint-green text-green">
                        <Icon
                          className="size-5"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                      </span>
                      <span
                        dir="ltr"
                        aria-hidden="true"
                        className="shortcut-index font-display text-[12px] font-semibold leading-none tabular-nums text-ink/25"
                      >
                        {pad(index + 1)}
                      </span>
                    </span>

                    <span className="relative mt-auto block pt-8">
                      <span
                        className={`shortcut-title block font-display text-[16.5px] font-semibold leading-snug text-ink sm:text-[17.5px] ${
                          isWide ? "lg:text-[1.35rem]" : ""
                        }`}
                      >
                        {item.title}
                      </span>
                      <span
                        className={`mt-1.5 block max-w-[30ch] text-[12.5px] leading-[1.75] text-muted sm:text-[13px] ${
                          isWide ? "lg:text-[13.5px]" : ""
                        }`}
                      >
                        {item.subtitle}
                      </span>
                    </span>

                    <span className="relative mt-5 flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="shortcut-rule h-px flex-1 bg-line"
                      />
                      <span className="shortcut-arrow grid size-9 shrink-0 place-items-center rounded-full border border-line bg-white text-ink">
                        <ArrowLeft
                          className="size-4"
                          strokeWidth={1.8}
                          aria-hidden="true"
                        />
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
