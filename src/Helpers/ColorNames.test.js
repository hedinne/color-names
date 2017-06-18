import { rgbToHex } from "./ColorNames";

it("returns a hex value", () => {
  expect(rgbToHex(255, 255, 255)).toEqual("#ffffff");
  expect(rgbToHex(0, 0, 0)).toEqual("#000000");
});

it("return a error if rgb values are out of range", () => {
  expect(rgbToHex(256, 255, 255)).toEqual("Invalid RGB values");
  expect(rgbToHex(0, -1, 0)).toEqual("Invalid RGB values");
});
