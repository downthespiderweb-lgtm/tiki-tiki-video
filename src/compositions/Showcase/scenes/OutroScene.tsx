import { Circle, Star } from "@remotion/shapes";
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedText, Background, FloatingShapes } from "../../../components";
import { COLORS, FONTS } from "../../../config/theme";
import {
  fadeUp,
  mix,
  progress,
  springIn,
  wave,
} from "../../../utils/animation";
import { useLayout } from "../../../utils/layout";

type Props = { title: string; cta: string; accent: string };

export const OutroScene: React.FC<Props> = ({ title, cta, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { u } = useLayout();
  const logo = springIn(frame, fps, { delay: 0.1, damping: 10 });
  const badge = u(220);
  const button = springIn(frame, fps, { delay: 1.2, damping: 12 });
  const pulse = 1 + Math.max(0, wave(frame, fps, 1.2)) * 0.03 * button;

  return (
    <AbsoluteFill>
      <Background from={COLORS.deepSea} to={COLORS.night} glow={accent} />
      <FloatingShapes
        colors={[accent, COLORS.mango, COLORS.palm]}
        seed="outro"
        opacity={0.3}
      />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          gap: u(44),
          textAlign: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            width: badge,
            height: badge,
            scale: String(logo),
            rotate: `${mix(logo, -180, 0)}deg`,
          }}
        >
          <div style={{ position: "absolute", inset: 0 }}>
            <Circle radius={badge / 2} fill={COLORS.cream} />
          </div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              rotate: `${(frame / fps) * 20}deg`,
            }}
          >
            <Star
              points={8}
              innerRadius={badge * 0.2}
              outerRadius={badge * 0.42}
              fill={accent}
              cornerRadius={u(6)}
            />
          </div>
        </div>
        <AnimatedText
          text={title}
          delay={0.5}
          stagger={0.12}
          distance={u(60)}
          style={{
            fontFamily: FONTS.display,
            fontWeight: 900,
            fontSize: u(120),
            color: COLORS.cream,
          }}
        />
        <div
          style={{
            fontFamily: FONTS.body,
            fontWeight: 800,
            fontSize: u(36),
            letterSpacing: u(3),
            color: COLORS.night,
            background: COLORS.mango,
            padding: `${u(26)}px ${u(64)}px`,
            borderRadius: u(999),
            opacity: Math.min(1, button * 1.5),
            scale: String(mix(button, 0.6, 1) * pulse),
          }}
        >
          {cta}
        </div>
        <div
          style={{
            fontFamily: FONTS.body,
            fontSize: u(26),
            color: COLORS.sand,
            ...fadeUp(progress(frame, fps, { delay: 1.6 }), u(16)),
          }}
        >
          Open nightly · Walk-ins welcome
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
