// If there is no remainder when x % 1, it's an integer.
export function isInt(x: number): boolean {
  return x % 1 === 0
}
