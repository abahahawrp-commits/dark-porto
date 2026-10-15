/**
 * Pure portfolio calculation and transformation utilities
 */

/**
 * Formats a loading counter number (0-100) into a 3-digit padded string (e.g. 000, 042, 100).
 */
export function formatCounter(count: number): string {
  const clamped = Math.min(100, Math.max(0, Math.round(count)));
  return String(clamped).padStart(3, '0');
}

/**
 * Returns the column span class for alternating bento grid items:
 * pattern repeats: [7, 5, 5, 7]
 */
export function getBentoColSpan(index: number): 7 | 5 {
  const pattern: (7 | 5)[] = [7, 5, 5, 7];
  return pattern[index % pattern.length];
}

/**
 * Returns role from cycling array safely
 */
export function getCycleItem<T>(index: number, items: readonly T[]): T {
  if (items.length === 0) {
    throw new Error('Items array cannot be empty');
  }
  const safeIndex = ((index % items.length) + items.length) % items.length;
  return items[safeIndex];
}

/**
 * Estimates reading time in minutes based on word count
 */
export function calculateReadingTime(content: string, wpm: number = 200): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / wpm));
}

/**
 * Calculates parallax translation based on scroll progress and speed factor
 */
export function computeParallaxOffset(
  scrollY: number,
  elementTop: number,
  speed: number = 0.2
): number {
  return (scrollY - elementTop) * speed;
}
