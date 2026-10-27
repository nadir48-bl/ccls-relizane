import TutelleBar from "@/components/sections/TutelleBar";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import FlashMarquee from "@/components/sections/FlashMarquee";
import News from "@/components/sections/News";
import Shortcuts from "@/components/sections/Shortcuts";
import Stats from "@/components/sections/Stats";
import Services from "@/components/sections/Services";
import CtaBand from "@/components/sections/CtaBand";
import Footer from "@/components/sections/Footer";
import { a11y } from "@/lib/content";

export default function Page() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
      >
        {a11y.skipToContent}
      </a>

      <TutelleBar />
      <Header />

      <main id="main-content">
        <Hero />
        <FlashMarquee />
        <News />
        <Shortcuts />
        <Stats />
        <Services />
        <CtaBand />
      </main>

      <Footer />
    </>
  );
}
