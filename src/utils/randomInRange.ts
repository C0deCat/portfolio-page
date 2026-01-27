/**
 * Random number in [min, max] with rounding to `decimals` fractional digits.
 * NOTE: Uses Math.random() => pseudo-random in [0, 1).  :contentReference[oaicite:1]{index=1}
 */
export function randomInRange(min: number, max: number, decimals = 0): number {
  if (
    !Number.isFinite(min) ||
    !Number.isFinite(max) ||
    !Number.isFinite(decimals)
  ) {
    throw new TypeError("min/max/decimals must be finite numbers");
  }
  if (decimals < 0 || !Number.isInteger(decimals)) {
    throw new RangeError("decimals must be a non-negative integer");
  }
  if (max < min) [min, max] = [max, min];

  const value = min + Math.random() * (max - min);
  const k = 10 ** decimals;

  // EPSILON helps with cases like 1.005 rounding “wrong” due to floating-point. :contentReference[oaicite:2]{index=2}
  return Math.round((value + Number.EPSILON) * k) / k;
}
