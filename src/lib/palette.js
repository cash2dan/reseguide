export const BRAND = "#2E5339";
export const GOLD = "#B08D57";
export const INK = "#1C2B24";
export const PAPER = "#FBF9F5";
export const MIST = "#EAF1EC";
export const MUTE = "#6B7A70";

export function rgba(hex, a) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}
