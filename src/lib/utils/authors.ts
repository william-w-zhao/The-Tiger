export function parseAuthorNames(authors: string): string[] {
  return authors
    .split(/,| and /i)
    .map((name) => name.trim())
    .filter(Boolean);
}