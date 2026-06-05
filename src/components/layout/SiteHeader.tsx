"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { navLinks, siteConfig } from "@/content/site";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-museum-border/80 bg-museum-void/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative flex h-8 w-8 items-center justify-center border border-museum-neon/50 bg-museum-neon/5 font-mono text-xs text-museum-neon">
            DP
          </span>
          <div className="hidden sm:block">
            <p className="font-display text-xs font-bold uppercase tracking-widest text-museum-text group-hover:text-museum-neon transition-colors">
              {siteConfig.name}
            </p>
            <p className="font-mono text-[10px] text-museum-muted tracking-wider">
              CRITICAL DESIGN ARCHIVE
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-1 md:gap-2" aria-label="Main navigation">
          {navLinks.map((link) => {
            const active =
              link.href === "/rooms"
                ? pathname === link.href || pathname.startsWith(`${link.href}/`)
                : pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-3 py-2 font-mono text-[10px] uppercase tracking-[0.15em] md:text-xs md:tracking-[0.2em]"
              >
                <span
                  className={
                    active ? "text-museum-neon" : "text-museum-muted hover:text-museum-text"
                  }
                >
                  {link.label}
                </span>
                {active && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-3 right-3 h-px bg-museum-neon shadow-neon-sm"
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
