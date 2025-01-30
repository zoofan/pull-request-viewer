export function parseLinkHeader(header: string | null): Record<string, string> {
  if (!header) return {};

  const links: Record<string, string> = {};
  const parts = header.split(",");

  parts.forEach((part) => {
    const section = part.split(";");
    if (section.length !== 2) return;

    const url = section[0].replace(/<(.*)>/, "$1").trim();
    const name = section[1].replace(/rel="(.*)"/, "$1").trim();
    links[name] = url;
  });

  return links;
}
