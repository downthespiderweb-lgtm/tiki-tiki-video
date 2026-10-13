import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedText, Background, FloatingShapes } from "../../../components";
import { COLORS, FONTS } from "../../../config/theme";
import {
  countUp,
  EASE_IN_OUT,
  fadeUp,
  progress,
} from "../../../utils/animation";
import { useLayout } from "../../../utils/layout";
import { ShowcaseProps } from "../schema";

type Props = { stats: ShowcaseProps["stats"]; accent: string };

const RING_COLORS = [COLORS.mango, COLORS.palm, COLORS.hibiscus];

export const StatsScene: React.FC<Props> = ({ stats, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { u, isPortrait } = useLayout();
  const size = u(300);
  const stroke = u(16);
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <AbsoluteFill>
      <Background from={COLORS.lagoon} to={COLORS.night} glow={COLORS.palm} />
      <FloatingShapes
        colors={[COLORS.cream]}
        count={18}
        seed="stats"
        opacity={0.12}
      />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          gap: u(80),
          padding: u(80),
        }}
      >
        <AnimatedText
          text="By the numbers"
          delay={0.1}
          stagger={0.1}
          distance={u(50)}
          style={{
            fontFamily: FONTS.display,
            fontWeight: 900,
            fontSize: u(96),
            color: COLORS.cream,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: isPortrait ? "column" : "row",
            gap: u(isPortrait ? 60 : 110),
          }}
        >
          {stats.map((stat, i) => {
            const delay = 0.5 + i * 0.22;
            const p = progress(frame, fps, {
              delay,
              duration: 1.6,
              easing: EASE_IN_OUT,
            });
            const enter = progress(frame, fps, { delay, duration: 0.7 });
            const color = i === 0 ? accent : RING_COLORS[i];
            return (
              <div
                key={stat.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: u(26),
                  ...fadeUp(enter, u(60)),
                }}
              >
                <div
                  style={{ position: "relative", width: size, height: size }}
                >
                  <svg width={size} height={size} style={{ rotate: "-90deg" }}>
                    <circle
                      cx={size / 2}
                      cy={size / 2}
                      r={radius}
                      fill="none"
                      stroke="rgba(255,255,255,0.12)"
                      strokeWidth={stroke}
                    />
                    <circle
                      cx={size / 2}
                      cy={size / 2}
                      r={radius}
                      fill="none"
                      stroke={color}
                      strokeWidth={stroke}
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={circumference * (1 - p)}
                    />
                  </svg>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontFamily: FONTS.body,
                      fontWeight: 800,
                      fontSize: u(96),
                      color: COLORS.cream,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {countUp(p, stat.value)}
                    {stat.suffix}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: FONTS.body,
                    fontWeight: 600,
                    fontSize: u(30),
                    letterSpacing: u(4),
                    textTransform: "uppercase",
                    color: COLORS.sand,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
