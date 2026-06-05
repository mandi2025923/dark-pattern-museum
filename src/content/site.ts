export const siteConfig = {
  name: "Dark Pattern Museum",
  tagline: "You were designed to stay — not to understand.",
  warning:
    "This site is a critical design project. Some interactions simulate manipulative UX patterns found on real-world platforms, intended solely for academic reflection and educational use.",
  university: "University of Birmingham",
  program: "MA Digital Media and Creative Industries",
  closingQuote: "You were never the customer. You were the product.",
  footerNotice:
    "Critical Design Prototype · No User Data Collection · For Academic & Educational Purposes Only",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/archive", label: "Archive" },
  { href: "/rooms", label: "Exhibit Hall" },
  { href: "/attention", label: "Attention" },
  { href: "/about", label: "About" },
] as const;
