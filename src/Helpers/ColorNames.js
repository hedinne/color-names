export default function ColorNames(color) {
  color = color.toUpperCase();

  if (color.length < 3 || color.length > 7) {
    return ["#000000", "Invalid Color: " + color, false];
  }
  if (color.length % 3 === 0) {
    color = "#" + color;
  }
  if (color.length === 4) {
    color =
      "#" +
      color.substr(1, 1) +
      color.substr(1, 1) +
      color.substr(2, 1) +
      color.substr(2, 1) +
      color.substr(3, 1) +
      color.substr(3, 1);
  }
}

function toHex(c) {
  const hex = c.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

export function rgbToHex(r, g, b) {
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
