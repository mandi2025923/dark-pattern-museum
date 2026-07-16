export const siteConfig = {
  name: "Dark Pattern Museum",
  tagline: "You were designed to stay — not to understand.",
  warning:
    "This site is a critical design project. Some interactions simulate manipulative UX patterns found on real platforms — for academic reflection, not actual deception.",
  university: "University of Birmingham",
  program: "MA Digital Media and Creative Industries",
  closingQuote: "You were never the customer. You were the product.",
  footerNotice:
    "Critical Design Prototype · No User Data Collection · For Academic & Educational Purposes Only",
} as const;

export const glossary = {
  roachMotel:
    "Roach Motel (Hard to Cancel): A dark pattern where subscriptions are easy to join but difficult to cancel. Term coined by UX researcher Harry Brignull (2010).",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/archive", label: "Archive" },
  { href: "/rooms", label: "Exhibit Hall" },
  { href: "/attention", label: "Attention" },
  { href: "/about", label: "About" },
] as const;
