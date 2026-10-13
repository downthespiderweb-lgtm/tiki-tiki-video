import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { wave } from "../utils/animation";

type Props = {
  from: string;
  to: string;
  /** Optional glow color drifting behind the content. */
  glow?: string;
};

/** Slowly drifting radial gradient. Cheap to render, never static. */
export const Background: React.FC<Props> = ({ from, to, glow }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const x = 50 + wave(frame, fps, 9) * 18;
  const y = 40 + wave(frame, fps, 11, 2) * 14;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at ${x}% ${y}%, ${glow ?? from} 0%, ${from} 35%, ${to} 100%)`,
      }}
    />
  );
};
