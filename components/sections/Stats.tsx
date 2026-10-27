import Counter from "@/components/motion/Counter";
import Reveal from "@/components/motion/Reveal";
import { stats } from "@/lib/content";

export default function Stats() {
  return (
    <section
      id={stats.id}
      data-spy={stats.id}
      aria-labelledby="stats-title"
      className="relative overflow-hidden border-t border-line bg-bg-alt py-20 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="soft-blob -end-36 -top-24 size-[28rem] bg-tint-green"
      />
      <div
        aria-hidden="true"
        className="ring-mark -start-32 bottom-[-9rem] size-[24rem]"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 xl:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-14">
          <Reveal className="max-w-2xl">
            <p className="kicker">{stats.kicker}</p>
            <h2
              id="stats-title"
              className="display mt-4 text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.3] text-ink"
            >
              {stats.title}
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="max-w-md lg:pb-1">
            <p className="text-[13.5px] leading-[1.95] text-muted sm:text-[14px]">
              {stats.lede}
            </p>
          </Reveal>
        </div>

        <Reveal
          className="mt-10 sm:mt-12"
          itemSelector=".stat-card"
          stagger={0.08}
        >
          <div
            id={stats.networkId}
            className="stats-panel relative overflow-hidden rounded-[24px] border border-line bg-white shadow-soft"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-10 top-0 h-px bg-linear-to-l from-transparent via-orange/45 to-transparent"
            />

            {stats.items.map((item, index) => (
              <div
                key={item.label}
                className="stat-card group flex flex-col p-6 transition-colors duration-300 hover:bg-tint-green/20 motion-reduce:transition-none sm:p-8 lg:p-9"
              >
                <div className="flex items-center justify-between gap-4">
                  <span
                    dir="ltr"
                    aria-hidden="true"
                    className="stat-index"
                  >
                    0{index + 1}
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-px w-7 bg-orange/35 transition-all duration-500 group-hover:w-12 group-hover:bg-orange motion-reduce:transition-none"
                  />
                </div>

                <div className="mt-10 sm:mt-12">
                  <div className="stat-number text-green-deep">
                    <Counter
                      value={item.value}
                      suffix={item.suffix}
                      decimals={item.decimals}
                      pad={item.pad}
                      unit={item.unit}
                    />
                  </div>
                  <p className="mt-3 max-w-[14rem] text-[12.5px] font-medium leading-[1.85] text-muted sm:text-[13px]">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
