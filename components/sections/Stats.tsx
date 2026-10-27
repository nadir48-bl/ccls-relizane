import Counter from "@/components/motion/Counter";
import { stats } from "@/lib/content";

export default function Stats() {
  return (
    <section
      id="chiffres"
      data-spy="chiffres"
      aria-label={stats.ariaLabel}
      className="band-green relative py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -start-24 top-1/2 size-[28rem] -translate-y-1/2 rounded-full border border-white/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute end-[9%] top-10 size-20 rounded-full border border-orange/25"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute end-[10.5%] top-12 size-2 rounded-full bg-red"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 xl:px-10">
        <div
          id="reseau"
          className="grid grid-cols-2 gap-y-10 lg:grid-cols-4 lg:gap-y-0"
        >
          {stats.items.map((item) => (
            <div key={item.label} className="stat-cell px-4 sm:px-7 lg:px-8">
              <div className="stat-number text-orange">
                <Counter
                  value={item.value}
                  suffix={item.suffix}
                  decimals={item.decimals}
                  unit={item.unit}
                />
              </div>
              <p className="mt-3 max-w-[13rem] text-[13px] font-medium leading-relaxed text-white/82 sm:text-[14px]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
