/**
 * Ensures an untrusted URL is safe to use in an `<a href="...">` tag.
 * Blocks `javascript:`, `data:`, `vbscript:`, etc.
 * Only permits `http:`, `https:`, `mailto:`, `tel:`, or relative paths (`/`).
 */
export function safeHref(url: unknown, fallback = '#'): string {
  if (typeof url !== 'string' || !url) return fallback;
  const trimmed = url.trim();
  if (!trimmed) return fallback;

  // Disallow javascript:, data:, vbscript: even if mixed case or with control characters
  const normalized = trimmed.replace(/[\x00-\x1F\x7F]/g, '').toLowerCase();
  if (
    normalized.startsWith('javascript:') ||
    normalized.startsWith('data:') ||
    normalized.startsWith('vbscript:')
  ) {
    return fallback;
  }

  if (
    trimmed.startsWith('/') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('mailto:') ||
    trimmed.startsWith('tel:')
  ) {
    return trimmed;
  }

  return fallback;
}
