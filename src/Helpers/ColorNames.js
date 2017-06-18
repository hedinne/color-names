function toHex(c) {
  const hex = c.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

export function rgbToHex(r, g, b) {
  if (r > 255 || r < 0 || g > 255 || g < 0 || b > 255 || b < 0) {
    return "Invalid RGB values";
  }
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
