import { Circle, Star, Triangle } from "@remotion/shapes";
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedText, Background } from "../../../components";
import { COLORS, FONTS } from "../../../config/theme";
import {
  fadeUp,
  mix,
  progress,
  springIn,
  wave,
} from "../../../utils/animation";
import { useLayout } from "../../../utils/layout";
import { ShowcaseProps } from "../schema";

type Props = { pillars: ShowcaseProps["pillars"]; accent: string };

const ICON_COLORS = [COLORS.sunset, COLORS.palm, COLORS.mango];

export const PillarsScene: React.FC<Props> = ({ pillars, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { u, isPortrait } = useLayout();
  const iconSize = u(84);

  const icons = [
    <Circle key="c" radius={iconSize / 2} fill={ICON_COLORS[0]} />,
    <Star
      key="s"
      points={5}
      innerRadius={iconSize / 4}
      outerRadius={iconSize / 2}
      fill={ICON_COLORS[1]}
    />,
    <Triangle
      key="t"
      length={iconSize}
      direction="up"
      fill={ICON_COLORS[2]}
      cornerRadius={u(8)}
    />,
  ];

  return (
    <AbsoluteFill>
      <Background from={COLORS.sand} to={COLORS.cream} glow="#ffffff" />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          gap: u(70),
          padding: u(90),
        }}
      >
        <AnimatedText
          text="An evening, three ways"
          delay={0.15}
          stagger={0.08}
          distance={u(50)}
          style={{
            fontFamily: FONTS.display,
            fontWeight: 900,
            fontSize: u(isPortrait ? 84 : 92),
            color: COLORS.night,
            textAlign: "center",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: isPortrait ? "column" : "row",
            gap: u(44),
          }}
        >
          {pillars.map((pillar, i) => {
            const p = springIn(frame, fps, {
              delay: 0.6 + i * 0.18,
              damping: 13,
            });
            const float = wave(frame, fps, 3.5, i * 0.8) * u(8);
            return (
              <div
                key={pillar.label}
                style={{
                  width: u(isPortrait ? 760 : 500),
                  padding: u(52),
                  borderRadius: u(36),
                  background: "#ffffff",
                  boxShadow: `0 ${u(24)}px ${u(60)}px rgba(6,35,43,0.14)`,
                  borderTop: `${u(8)}px solid ${i === 0 ? accent : ICON_COLORS[i]}`,
                  display: "flex",
                  flexDirection: "column",
                  gap: u(22),
                  opacity: Math.min(1, p * 1.5),
                  scale: String(mix(p, 0.7, 1)),
                  translate: `0px ${mix(p, u(120), 0) + float}px`,
                }}
              >
                <div
                  style={{
                    height: iconSize,
                    rotate: `${mix(p, -90, 0)}deg`,
                    transformOrigin: `${iconSize / 2}px ${iconSize / 2}px`,
                  }}
                >
                  {icons[i]}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.display,
                    fontWeight: 700,
                    fontSize: u(50),
                    color: COLORS.night,
                  }}
                >
                  {pillar.label}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.body,
                    fontWeight: 400,
                    fontSize: u(28),
                    lineHeight: 1.4,
                    color: COLORS.deepSea,
                    ...fadeUp(
                      progress(frame, fps, { delay: 1.0 + i * 0.18 }),
                      u(16),
                    ),
                  }}
                >
                  {pillar.caption}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
