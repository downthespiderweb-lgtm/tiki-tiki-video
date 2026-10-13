/**
 * Remotion CLI / Studio configuration.
 *
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";

Config.setEntryPoint("src/index.ts");
Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setDefaultPremountInSeconds(2);

// MP4 defaults: H.264 with a quality-based encode (lower CRF = higher quality).
Config.setCodec("h264");
Config.setCrf(18);
Config.setPixelFormat("yuv420p");

// Remotion downloads its own Chrome Headless Shell on first render. In
// sandboxes without access to remotion.media, point it at a local Chromium:
//   REMOTION_BROWSER_EXECUTABLE=/path/to/chrome npm run render
if (process.env.REMOTION_BROWSER_EXECUTABLE) {
  Config.setBrowserExecutable(process.env.REMOTION_BROWSER_EXECUTABLE);
}
