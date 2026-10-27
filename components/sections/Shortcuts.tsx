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

export default function Shortcuts() {
  return (
    <section className="relative overflow-hidden bg-bg-alt py-24 sm:py-28 lg:py-32">
      <div
        aria-hidden="true"
        className="soft-blob -end-24 top-10 size-[24rem] bg-tint-orange"
      />
      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 xl:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <span
                aria-hidden="true"
                className="mb-5 block h-px w-14 bg-orange"
              />
              <h2 className="display max-w-xs text-[clamp(1.8rem,2.7vw,2.45rem)] leading-[1.35] text-ink">
                {shortcuts.title}
              </h2>
              <div
                aria-hidden="true"
                className="relative mt-10 hidden h-40 w-40 lg:block"
              >
                <span className="absolute inset-0 rounded-full border border-red/20" />
                <span className="absolute inset-7 rounded-full border border-orange/25" />
                <span className="absolute inset-[3.15rem] rounded-full bg-tint-green" />
                <span className="absolute inset-[4.15rem] rounded-full border border-green/25" />
              </div>
            </div>
          </Reveal>

          <Reveal
            className="min-w-0 lg:col-span-8"
            itemSelector=".shortcut-row"
            drawRules
            stagger={0.08}
          >
            <ul className="border-t border-line">
              {shortcuts.items.map((item) => {
                const Icon = icons[item.icon] ?? Tag;

                return (
                  <li key={item.title} className="shortcut-row">
                    <a
                      href={item.href}
                      className="group flex items-center gap-4 px-2 py-5 sm:gap-5 sm:px-4 sm:py-6"
                    >
                      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-tint-green text-green transition-colors duration-300 group-hover:bg-white group-hover:text-orange-deep sm:size-12">
                        <Icon
                          className="size-5"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-[16px] font-semibold leading-snug text-ink sm:text-[17px]">
                          {item.title}
                        </span>
                        <span className="mt-0.5 block text-[12.5px] leading-relaxed text-muted sm:text-[13px]">
                          {item.subtitle}
                        </span>
                      </span>
                      <ArrowLeft
                        className="shortcut-arrow size-5 shrink-0 text-ink"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    </a>
                    <span data-rule aria-hidden="true" />
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
