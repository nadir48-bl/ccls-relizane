import { ArrowLeft } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { services } from "@/lib/content";

export default function Services() {
  return (
    <section
      id="services"
      data-spy="services"
      aria-labelledby="services-title"
      className="relative overflow-hidden bg-bg py-24 sm:py-28 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="soft-blob -start-28 top-28 size-[27rem] bg-tint-green"
      />
      <div
        aria-hidden="true"
        className="soft-blob end-[-6rem] bottom-8 size-[25rem] bg-tint-orange"
      />
      <div
        aria-hidden="true"
        className="ring-mark end-[-8rem] top-10 size-[22rem]"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 xl:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="kicker">{services.kicker}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="services-title"
                className="display h2 mt-4 max-w-4xl text-ink"
              >
                {services.title}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="lg:col-span-4">
            <p className="lede max-w-md lg:ms-auto">{services.lede}</p>
          </Reveal>
        </div>

        <Reveal
          className="mt-12 sm:mt-16"
          itemSelector=".service-row"
          drawRules
          stagger={0.09}
        >
          <ol className="border-t border-line">
            {services.items.map((item) => (
              <li key={item.number} className="service-row group">
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-7 sm:gap-7 sm:py-9 lg:gap-9">
                  <span
                    dir="ltr"
                    className="service-number w-[2.1ch] shrink-0 text-center"
                    aria-hidden="true"
                  >
                    {item.number}
                  </span>
                  <div className="min-w-0">
                    <h3 className="display text-[clamp(1.25rem,2vw,1.7rem)] leading-snug text-ink transition-colors duration-300 group-hover:text-orange-deep">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-3xl text-[13px] leading-[1.95] text-muted sm:text-[13.8px]">
                      {item.description}
                    </p>
                  </div>
                  <ArrowLeft
                    className="service-arrow size-5 shrink-0 text-ink sm:size-6"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </div>
                <span data-rule aria-hidden="true" />
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
