
export function chopArray<I>(arr: I[], shape: number[]) {
  const clone = arr.slice(0);
  return shape.map(num => clone.splice(0, num));
}