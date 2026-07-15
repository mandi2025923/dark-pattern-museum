import type { Metadata } from "next";
import { Exo_2, Orbitron, Share_Tech_Mono } from "next/font/google";
import { MuseumShell } from "@/components/museum/MuseumShell";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo2",
  display: "swap",
});

const shareTech = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-share-tech",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dark Pattern Museum",
    template: "%s | Dark Pattern Museum",
  },
  description:
    "Ever clicked a button and immediately regretted it? Walk through four rooms that recreate the tricks platforms use to steer you — safely, locally, with nothing collected.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${exo2.variable} ${shareTech.variable}`}
    >
      <MuseumShell>
        {children}
      </MuseumShell>
    </html>
  );
}
