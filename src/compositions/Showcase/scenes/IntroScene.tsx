import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import {
  AccentLine,
  AnimatedText,
  Background,
  FloatingShapes,
} from "../../../components";
import { COLORS, FONTS } from "../../../config/theme";
import { fadeUp, mix, progress } from "../../../utils/animation";
import { useLayout } from "../../../utils/layout";

type Props = { title: string; tagline: string; accent: string };

export const IntroScene: React.FC<Props> = ({ title, tagline, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { u, isPortrait } = useLayout();
  // Slow push-in on the whole scene for a cinematic feel.
  const zoom = mix(
    progress(frame, fps, { duration: 4, easing: (t) => t }),
    1.06,
    1,
  );

  return (
    <AbsoluteFill style={{ scale: String(zoom) }}>
      <Background
        from={COLORS.deepSea}
        to={COLORS.night}
        glow={COLORS.lagoon}
      />
      <FloatingShapes
        colors={[accent, COLORS.mango, COLORS.palm, COLORS.hibiscus]}
        seed="intro"
        opacity={0.35}
      />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          gap: u(36),
          padding: u(80),
        }}
      >
        <div
          style={{
            fontFamily: FONTS.body,
            fontWeight: 600,
            fontSize: u(28),
            letterSpacing: u(12),
            textTransform: "uppercase",
            color: COLORS.mango,
            ...fadeUp(
              progress(frame, fps, { delay: 0.1, duration: 0.8 }),
              u(20),
            ),
          }}
        >
          Welcome to
        </div>
        <AnimatedText
          text={title}
          by="char"
          delay={0.3}
          stagger={0.045}
          distance={u(90)}
          style={{
            fontFamily: FONTS.display,
            fontWeight: 900,
            fontSize: u(isPortrait ? 150 : 170),
            lineHeight: 1,
            color: COLORS.cream,
            textShadow: `0 ${u(10)}px ${u(40)}px rgba(0,0,0,0.35)`,
          }}
        />
        <AccentLine
          color={accent}
          width={u(260)}
          thickness={u(6)}
          delay={1.0}
        />
        <div
          style={{
            fontFamily: FONTS.display,
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: u(54),
            color: COLORS.sand,
            ...fadeUp(
              progress(frame, fps, { delay: 1.3, duration: 0.9 }),
              u(30),
            ),
          }}
        >
          {tagline}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
