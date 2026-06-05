export const routes = {
  home: "/",
  archive: "/archive",
  exhibits: "/exhibits",
  rooms: "/rooms",
  attention: "/attention",
  reflection: "/reflection",
  exit: "/exit",
  about: "/about",
} as const;

export function archiveRoute(slug: string) {
  return `${routes.archive}/${slug}`;
}

export function roomRoute(slug: string) {
  return `${routes.rooms}/${slug}`;
}
