export function getEnumKey<T extends Record<string, string>>(
  enumObj: T,
  value: string
): keyof T | undefined {
  return Object.keys(enumObj).find((key) => enumObj[key] === value) as keyof T | undefined;
}

export function cycleEnum<T extends Record<string, string | number>>(
  enumObj: T,
  current: T[keyof T],
  step: number
): T[keyof T] {
  const values = Object.values(enumObj).filter(
    (v) => typeof v === typeof current
  ) as T[keyof T][];
  const currentIndex = values.indexOf(current);
  let targetIndex = (currentIndex + step);
  while (targetIndex < 0) {
    targetIndex += values.length;
  }
  const nextIndex = targetIndex % values.length;
  return values[nextIndex]!;
}
