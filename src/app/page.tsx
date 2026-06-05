import { ArchiveTransition } from "@/sections/home/ArchiveTransition";
import { HeroSection } from "@/sections/home/HeroSection";
import { IntroNarrative } from "@/sections/home/IntroNarrative";
import { PreviewSection } from "@/sections/home/PreviewSection";
import { WarningBanner } from "@/sections/home/WarningBanner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WarningBanner />
      <IntroNarrative />
      <PreviewSection />
      <ArchiveTransition />
    </>
  );
}
