export const StringShortener = (s: string, n: number) => {
  if (s.length <= n) return s;
  return s.substring(0, n) + "...";
};
