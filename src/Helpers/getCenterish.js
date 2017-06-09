function helper(data, xOffset = 0, yOffset = 0, channel = 0) {
  return data.get(
    Math.round(data.shape[0] / 2) + xOffset,
    Math.round(data.shape[1] / 2) + yOffset,
    channel,
  );
}

export default function getCenterish(pix) {
  let r = helper(pix, 0, 0, 0);
  let g = helper(pix, 0, 0, 1);
  let b = helper(pix, 0, 0, 2);
  r += helper(pix, -1, 0, 0);
  g += helper(pix, -1, 0, 1);
  b += helper(pix, -1, 0, 2);
  r += helper(pix, 1, 0, 0);
  g += helper(pix, 1, 0, 1);
  b += helper(pix, 1, 0, 2);
  r += helper(pix, 0, -1, 0);
  g += helper(pix, 0, -1, 1);
  b += helper(pix, 0, -1, 2);
  r += helper(pix, 0, 1, 0);
  g += helper(pix, 0, 1, 1);
  b += helper(pix, 0, 1, 2);

  return [Math.round(r / 5), Math.round(g / 5), Math.round(b / 5)];
}
