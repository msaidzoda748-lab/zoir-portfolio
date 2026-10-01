/** Пайванд танҳо ҳамон вақт фаъол аст, ки суроғаи воқеии http(s) ё tg:// бошад. */
export function isValidLink(url: string | undefined | null): url is string {
  if (!url) return false;
  const value = url.trim();
  if (!value) return false;
  try {
    const parsed = new URL(value);
    return ['http:', 'https:', 'tg:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}
