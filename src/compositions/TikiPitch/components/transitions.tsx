import type { TransitionPresentation, TransitionPresentationComponentProps } from "@remotion/transitions";
import React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { C } from "../brand";

/**
 * Custom scene transitions adapted from the reference's editorial language:
 * sweeping curved reveals, large circular masks and diagonal divisions, each
 * edged with a thin gold line. The incoming scene is revealed by the mask while
 * the outgoing scene eases back slightly.
 */

type MaskKind = "curve" | "circle" | "diagonal";
type MaskProps = { kind: MaskKind; from: "left" | "right" | "center" | "bottom" };

const Exiting: React.FC<{ p: number; children: React.ReactNode }> = ({ p, children }) => (
  <AbsoluteFill style={{ scale: String(1 + p * 0.04), filter: `brightness(${1 - p * 0.25})` }}>{children}</AbsoluteFill>
);

const MaskPresentation: React.FC<TransitionPresentationComponentProps<MaskProps>> = ({
  children,
  presentationDirection,
  presentationProgress: p,
  passedProps,
}) => {
  const { width, height } = useVideoConfig();
  if (presentationDirection === "exiting") {
    return <Exiting p={p}>{children}</Exiting>;
  }

  const diag = Math.hypot(width, height);
  let clip = "";
  let edge: React.ReactNode = null;

  if (passedProps.kind === "circle") {
    const cx = passedProps.from === "center" ? width / 2 : passedProps.from === "left" ? width * 0.25 : width * 0.75;
    const cy = height / 2;
    const r = p * diag * 0.8;
    clip = `circle(${r}px at ${cx}px ${cy}px)`;
    edge = (
      <div
        style={{
          position: "absolute",
          left: cx - r,
          top: cy - r,
          width: r * 2,
          height: r * 2,
          borderRadius: "50%",
          border: `3px solid ${C.gold}`,
          opacity: 1 - p,
        }}
      />
    );
  } else if (passedProps.kind === "curve") {
    // A huge circle whose edge sweeps across the frame as a gentle curve.
    const R = diag * 1.6;
    // Start fully outside the frame, end with the circle covering every corner.
    const fromLeft = passedProps.from === "left";
    const startX = fromLeft ? -R - 20 : width + R + 20;
    const endX = fromLeft ? width - R + 200 : R - 200;
    const cx = startX + (endX - startX) * p;
    const cy = height / 2;
    clip = `circle(${R}px at ${cx}px ${cy}px)`;
    edge = (
      <div
        style={{
          position: "absolute",
          left: cx - R,
          top: cy - R,
          width: R * 2,
          height: R * 2,
          borderRadius: "50%",
          border: `4px solid ${C.gold}`,
          opacity: Math.sin(p * Math.PI),
        }}
      />
    );
  } else {
    // diagonal wipe from bottom-left
    const s = p * 2.2;
    const a = { x: -0.2 * width + s * width, y: height * 1.2 };
    clip = `polygon(-10% 120%, ${a.x}px ${a.y}px, ${a.x + width * 0.5}px -20%, -10% -20%)`;
    const ex = a.x;
    edge = (
      <svg width={width} height={height} style={{ position: "absolute", inset: 0, opacity: Math.sin(p * Math.PI) }}>
        <line x1={ex} y1={height * 1.2} x2={ex + width * 0.5} y2={-height * 0.2} stroke={C.gold} strokeWidth={4} />
      </svg>
    );
  }

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ clipPath: clip }}>{children}</AbsoluteFill>
      {edge}
    </AbsoluteFill>
  );
};

export const mask = (kind: MaskKind, from: MaskProps["from"] = "right"): TransitionPresentation<MaskProps> => ({
  component: MaskPresentation,
  props: { kind, from },
});
