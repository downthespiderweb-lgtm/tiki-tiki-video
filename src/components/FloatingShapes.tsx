import { Circle, Star, Triangle } from "@remotion/shapes";
import React from "react";
import {
  AbsoluteFill,
  random,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { progress, wave } from "../utils/animation";
import { useLayout } from "../utils/layout";

type Props = {
  colors: readonly string[];
  count?: number;
  /** Seed keeps the arrangement deterministic across renders. */
  seed?: string;
  opacity?: number;
};

/**
 * Ambient decorative shapes that pop in and drift. Uses `random(seed)`
 * (never Math.random) so every render frame is deterministic.
 */
export const FloatingShapes: React.FC<Props> = ({
  colors,
  count = 14,
  seed = "shapes",
  opacity = 0.5,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { width, height, u } = useLayout();

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {Array.from({ length: count }).map((_, i) => {
        const r = (k: string) => random(`${seed}-${i}-${k}`);
        const size = u(18 + r("size") * 70);
        const x = r("x") * width;
        const y = r("y") * height;
        const kind = Math.floor(r("kind") * 3);
        const color = colors[i % colors.length];
        const appear = progress(frame, fps, {
          delay: r("delay") * 0.8,
          duration: 0.8,
        });
        const driftX = wave(frame, fps, 5 + r("px") * 5, r("ox") * 10) * u(24);
        const driftY = wave(frame, fps, 6 + r("py") * 5, r("oy") * 10) * u(30);
        const rotate = (frame / fps) * (r("rot") - 0.5) * 60;

        const shape =
          kind === 0 ? (
            <Circle radius={size / 2} fill={color} />
          ) : kind === 1 ? (
            <Star
              points={5}
              innerRadius={size / 4}
              outerRadius={size / 2}
              fill={color}
            />
          ) : (
            <Triangle length={size} direction="up" fill={color} />
          );

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              opacity: appear * opacity,
              scale: String(appear),
              translate: `${driftX}px ${driftY}px`,
              rotate: `${rotate}deg`,
            }}
          >
            {shape}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
