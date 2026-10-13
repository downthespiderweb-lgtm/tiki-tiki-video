import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { mix, springIn } from "../utils/animation";

type Props = {
  text: string;
  /** Animate each "word" or each "char". */
  by?: "word" | "char";
  /** Seconds before the first unit starts. */
  delay?: number;
  /** Seconds between consecutive units. */
  stagger?: number;
  /** Rise distance in px. */
  distance?: number;
  style?: React.CSSProperties;
};

/**
 * Staggered spring reveal for typography: each word/char rises, unblurs
 * and fades in. Whitespace is preserved so text wraps naturally.
 */
export const AnimatedText: React.FC<Props> = ({
  text,
  by = "word",
  delay = 0,
  stagger = 0.06,
  distance = 60,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const units = by === "word" ? text.split(/(\s+)/) : Array.from(text);
  let index = 0;

  return (
    <div style={style}>
      {units.map((unit, i) => {
        if (/^\s+$/.test(unit)) {
          return <span key={i}>{unit}</span>;
        }
        const p = springIn(frame, fps, {
          delay: delay + index++ * stagger,
          damping: 16,
        });
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              whiteSpace: "pre",
              opacity: Math.min(1, p * 1.4),
              translate: `0px ${mix(p, distance, 0)}px`,
              filter: `blur(${mix(Math.min(p, 1), 8, 0)}px)`,
            }}
          >
            {unit}
          </span>
        );
      })}
    </div>
  );
};
