#!/usr/bin/env node
/**
 * Scaffold a new composition and register it in src/Root.tsx.
 *
 *   npm run new -- PromoTeaser
 *   npm run new -- PromoTeaser --seconds 8 --width 1080 --height 1920 --fps 60
 */
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const name = args.find((a) => !a.startsWith("--"));
const opt = (key, fallback) => {
  const i = args.indexOf(`--${key}`);
  return i === -1 ? fallback : args[i + 1];
};

if (!name || !/^[A-Z][A-Za-z0-9]*$/.test(name)) {
  console.error(
    "Usage: npm run new -- <PascalCaseName> [--seconds 6] [--width 1920] [--height 1080] [--fps 30]",
  );
  process.exit(1);
}

const root = path.resolve(import.meta.dirname, "..");
const dir = path.join(root, "src", "compositions", name);
if (fs.existsSync(dir)) {
  console.error(`src/compositions/${name} already exists.`);
  process.exit(1);
}

const seconds = Number(opt("seconds", "6"));
const width = opt("width", null);
const height = opt("height", null);
const fps = opt("fps", null);

fs.mkdirSync(dir, { recursive: true });

fs.writeFileSync(
  path.join(dir, `${name}.tsx`),
  `import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedText, Background, FloatingShapes } from "../../components";
import { COLORS, FONTS } from "../../config/theme";
import { fadeUp, progress } from "../../utils/animation";
import { useLayout } from "../../utils/layout";

export type ${name}Props = {
  title: string;
  subtitle: string;
};

export const ${name}: React.FC<${name}Props> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { u } = useLayout();

  return (
    <AbsoluteFill>
      <Background from={COLORS.deepSea} to={COLORS.night} glow={COLORS.lagoon} />
      <FloatingShapes colors={[COLORS.sunset, COLORS.mango, COLORS.palm]} seed="${name}" opacity={0.3} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: u(30), textAlign: "center" }}>
        <AnimatedText
          text={title}
          by="char"
          delay={0.2}
          distance={u(80)}
          style={{ fontFamily: FONTS.display, fontWeight: 900, fontSize: u(140), color: COLORS.cream }}
        />
        <div
          style={{
            fontFamily: FONTS.body,
            fontSize: u(44),
            color: COLORS.sand,
            ...fadeUp(progress(frame, fps, { delay: 1 }), u(30)),
          }}
        >
          {subtitle}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
`,
);

fs.writeFileSync(
  path.join(dir, "index.ts"),
  `export { ${name}, type ${name}Props } from "./${name}";\n`,
);

const fpsExpr = fps ?? "VIDEO.fps";
const compositionLines = [
  `<Composition`,
  `  id="${name}"`,
  `  component={${name}}`,
  `  width={${width ?? "VIDEO.width"}}`,
  `  height={${height ?? "VIDEO.height"}}`,
  `  fps={${fpsExpr}}`,
  `  durationInFrames={Math.round(${seconds} * ${fpsExpr})}`,
  `  defaultProps={{`,
  `    title: "${name}",`,
  `    subtitle: "Edit src/compositions/${name}/${name}.tsx",`,
  `  }}`,
  `/>`,
];
const compositionJsx = (indent) =>
  compositionLines.map((line) => indent + line).join("\n");

const rootFile = path.join(root, "src", "Root.tsx");
let rootSrc = fs.readFileSync(rootFile, "utf8");
const importMarker = "// new-composition:imports";
const registerMarker = "{/* new-composition:register";
if (!rootSrc.includes(importMarker) || !rootSrc.includes(registerMarker)) {
  console.warn(
    "Markers not found in src/Root.tsx — register the composition manually:",
  );
  console.warn(`import { ${name} } from "./compositions/${name}";`);
  console.warn(compositionJsx(""));
} else {
  rootSrc = rootSrc.replace(
    importMarker,
    `import { ${name} } from "./compositions/${name}";\n${importMarker}`,
  );
  rootSrc = rootSrc.replace(
    /( *)\{\/\* new-composition:register/,
    (_, indent) =>
      `${compositionJsx(indent)}\n${indent}{/* new-composition:register`,
  );
  fs.writeFileSync(rootFile, rootSrc);
}

console.log(
  `Created src/compositions/${name}/ and registered composition "${name}" in src/Root.tsx`,
);
console.log(`Preview:  npm run dev   →  select "${name}"`);
console.log(`Render:   npx remotion render ${name} out/${name}.mp4`);
