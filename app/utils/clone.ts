/**
 * Deep clones an object using structuredClone (faster than JSON methods).
 * Falls back to JSON methods for older browsers or incompatible objects.
 * @param value - The value to clone
 * @returns A deep clone of the value
 */
export function deepClone<T>(value: T): T {
  try {
    if (typeof structuredClone !== "undefined") {
      return structuredClone(value);
    }
  } catch {
    // Fall through to JSON method if structuredClone fails
  }
  return JSON.parse(JSON.stringify(value));
}
