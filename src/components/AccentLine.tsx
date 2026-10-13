import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { progress } from "../utils/animation";

type Props = {
  color: string;
  width: number;
  thickness?: number;
  delay?: number;
  duration?: number;
};

/** A line that draws itself from the center outwards. */
export const AccentLine: React.FC<Props> = ({
  color,
  width,
  thickness = 4,
  delay = 0,
  duration = 0.8,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = progress(frame, fps, { delay, duration });

  return (
    <div
      style={{
        width,
        height: thickness,
        borderRadius: thickness,
        background: color,
        scale: `${p} 1`,
      }}
    />
  );
};
