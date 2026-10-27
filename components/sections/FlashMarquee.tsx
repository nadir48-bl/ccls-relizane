import { flash } from "@/lib/content";

export default function FlashMarquee() {
  return (
    <section className="flash-band band-green border-y border-white/10">
      <div className="mx-auto flex w-full max-w-[1440px] items-center gap-3 px-4 py-3 sm:gap-5 sm:px-6 xl:px-10">
        <span className="shrink-0 rounded-full bg-red px-2.5 py-1 text-[10.5px] font-semibold leading-none text-white">
          {flash.label}
        </span>

        <div
          className="marquee min-w-0 flex-1"
          dir="ltr"
          role="region"
          aria-label={flash.ariaLabel}
        >
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                className="marquee-group"
                aria-hidden={copy === 1 ? "true" : undefined}
              >
                {[0, 1].map((pass) =>
                  flash.items.map((item) => (
                    <li
                      key={`${copy}-${pass}-${item}`}
                      className="marquee-item"
                      dir="rtl"
                      aria-hidden={
                        copy === 1 || pass === 1 ? "true" : undefined
                      }
                    >
                      <span
                        aria-hidden="true"
                        className="marquee-dot shrink-0"
                      />
                      <span>{item}</span>
                    </li>
                  )),
                )}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
