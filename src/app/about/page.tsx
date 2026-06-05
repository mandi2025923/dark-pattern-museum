import type { Metadata } from "next";
import { AboutContent } from "@/sections/about/AboutContent";
import { AboutHero } from "@/sections/about/AboutHero";

export const metadata: Metadata = {
  title: "About",
  description:
    "Project background, theoretical framework, and ethical boundaries for Dark Pattern Museum.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutContent />
    </>
  );
}
