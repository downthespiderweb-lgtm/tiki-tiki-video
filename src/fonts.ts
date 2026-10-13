import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";
import { FONTS } from "./config/theme";

/**
 * Fonts are bundled in public/fonts so renders never depend on the network.
 * loadFont() delays rendering until each font is ready.
 * To add a font: drop the .woff2 into public/fonts and add an entry below.
 */
const fontFiles = [
  { family: FONTS.body, file: "fonts/Inter-400.woff2", weight: "400" },
  { family: FONTS.body, file: "fonts/Inter-500.woff2", weight: "500" },
  { family: FONTS.body, file: "fonts/Inter-700.woff2", weight: "700" },
  { family: FONTS.display, file: "fonts/PlayfairDisplay-400.woff2", weight: "400" },
  {
    family: FONTS.display,
    file: "fonts/PlayfairDisplay-400-italic.woff2",
    weight: "400",
    style: "italic",
  },
  { family: FONTS.script, file: "fonts/GreatVibes-400.woff2", weight: "400" },
  { family: FONTS.body, file: "fonts/Inter-600.woff2", weight: "600" },
  { family: FONTS.body, file: "fonts/Inter-800.woff2", weight: "800" },
  {
    family: FONTS.display,
    file: "fonts/PlayfairDisplay-700.woff2",
    weight: "700",
  },
  {
    family: FONTS.display,
    file: "fonts/PlayfairDisplay-900.woff2",
    weight: "900",
  },
  {
    family: FONTS.display,
    file: "fonts/PlayfairDisplay-700-italic.woff2",
    weight: "700",
    style: "italic",
  },
];

export const fontsLoaded = Promise.all(
  fontFiles.map(({ family, file, weight, style }) =>
    loadFont({ family, url: staticFile(file), weight, style }),
  ),
);
