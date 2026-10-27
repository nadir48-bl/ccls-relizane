import { ArrowLeft, PhoneCall } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { accountCta } from "@/lib/content";

export default function CtaBand() {
  return (
    <section
      id="adhesion"
      data-spy="adhesion"
      aria-labelledby="adhesion-title"
      className="band-green relative overflow-hidden border-y border-white/10 py-20 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -start-32 top-1/2 size-[32rem] -translate-y-1/2 rounded-full border border-white/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -start-16 top-1/2 size-[20rem] -translate-y-1/2 rounded-full border border-orange/20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute end-[7%] top-12 size-3 rounded-full bg-red"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute end-[9%] top-12 size-20 rounded-full border border-white/15"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 xl:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <Reveal className="lg:col-span-8">
            <h2
              id="adhesion-title"
              className="display max-w-4xl text-[clamp(1.9rem,3.6vw,3.25rem)] leading-[1.35] text-white"
            >
              {accountCta.title}
            </h2>
            <p className="mt-5 max-w-2xl text-[14px] leading-[1.95] text-white/85 sm:text-[15px]">
              {accountCta.description}
            </p>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-4">
            <div className="flex flex-col items-stretch gap-3 lg:items-end">
              <a
                href="#contact"
                className="btn btn-white w-full justify-between sm:justify-center lg:w-auto"
              >
                <span>
                  {accountCta.primaryCta}
                  <ArrowLeft className="size-4" strokeWidth={1.75} />
                </span>
              </a>
              <a
                href="#contact"
                className="btn btn-ghost-light w-full sm:w-auto"
              >
                <span>
                  <PhoneCall className="size-4" strokeWidth={1.75} />
                  {accountCta.secondaryCta}
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
