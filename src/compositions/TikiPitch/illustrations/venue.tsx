import React, { useId } from "react";
import { random, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Original venue illustrations: the dusk exterior "hero" (opening/closing) and the
 * wide interior panorama (atmosphere scene). Subtle motion: twinkling string lights,
 * ocean shimmer and swaying palms — all driven by the current frame.
 */

const useUid = () => useId().replace(/[^a-zA-Z0-9]/g, "");

const useTime = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return frame / fps;
};

/* ---------------------------------------------------------------- shared parts */

export const PalmTree: React.FC<{ x: number; y: number; h: number; lean?: number; color?: string; sway?: number }> = ({
  x, y, h, lean = 0.15, color = "#0E1F1A", sway = 0,
}) => {
  const topX = x + h * lean;
  const topY = y - h;
  const fronds = [-170, -140, -110, -70, -40, -10, 20];
  return (
    <g>
      <path
        d={`M ${x - 14} ${y} Q ${x + h * lean * 0.3} ${y - h * 0.5} ${topX - 6} ${topY} L ${topX + 6} ${topY} Q ${x + h * lean * 0.3 + 18} ${y - h * 0.5} ${x + 14} ${y} Z`}
        fill={color}
      />
      <g transform={`rotate(${sway} ${topX} ${topY})`}>
        {fronds.map((a, i) => {
          const len = h * (0.42 + (i % 2) * 0.08);
          const rad = (a * Math.PI) / 180;
          const ex = topX + Math.cos(rad) * len;
          const ey = topY + Math.sin(rad) * len * 0.55 + len * 0.25;
          const cx = topX + Math.cos(rad) * len * 0.5;
          const cy = topY + Math.sin(rad) * len * 0.5 - len * 0.12;
          return (
            <g key={i}>
              <path d={`M ${topX} ${topY} Q ${cx} ${cy} ${ex} ${ey}`} stroke={color} strokeWidth={10} fill="none" strokeLinecap="round" />
              {Array.from({ length: 9 }).map((_, k) => {
                const t = (k + 1) / 10;
                const px = (1 - t) * (1 - t) * topX + 2 * (1 - t) * t * cx + t * t * ex;
                const py = (1 - t) * (1 - t) * topY + 2 * (1 - t) * t * cy + t * t * ey;
                const l = len * 0.22 * (1 - t * 0.6);
                return (
                  <g key={k}>
                    <line x1={px} y1={py} x2={px + l * 0.4} y2={py + l} stroke={color} strokeWidth={6} strokeLinecap="round" />
                    <line x1={px} y1={py} x2={px - l * 0.5} y2={py + l * 0.9} stroke={color} strokeWidth={6} strokeLinecap="round" />
                  </g>
                );
              })}
            </g>
          );
        })}
      </g>
    </g>
  );
};

export const Monstera: React.FC<{ x: number; y: number; s?: number; rot?: number; color?: string }> = ({
  x, y, s = 1, rot = 0, color = "#1F4A2E",
}) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M 0 0 C -90 -30 -120 -150 -40 -210 C 0 -240 60 -230 90 -190 C 140 -120 100 -20 0 0 Z" fill={color} />
    {[-160, -120, -80, -40].map((yy, i) => (
      <path key={i} d={`M ${20 - i * 4} ${yy} L ${-70 + i * 6} ${yy - 14}`} stroke="rgba(0,0,0,0.35)" strokeWidth={10} strokeLinecap="round" />
    ))}
    {[-170, -130, -90, -50].map((yy, i) => (
      <path key={`r${i}`} d={`M ${24 - i * 3} ${yy} L ${100 - i * 8} ${yy - 4}`} stroke="rgba(0,0,0,0.35)" strokeWidth={10} strokeLinecap="round" />
    ))}
    <path d="M 0 0 C 10 -80 20 -150 30 -215" stroke="rgba(255,255,255,0.18)" strokeWidth={4} fill="none" />
  </g>
);

export const StringLights: React.FC<{ x1: number; y1: number; x2: number; y2: number; sag: number; n: number; t: number; seed: string; size?: number }> = ({
  x1, y1, x2, y2, sag, n, t, seed, size = 1,
}) => {
  const id = useUid();
  const cx = (x1 + x2) / 2;
  const cy = (y1 + y2) / 2 + sag;
  return (
    <g>
      <defs>
        <radialGradient id={`${id}-bulb`}>
          <stop offset="0%" stopColor="#FFF4C8" stopOpacity={1} />
          <stop offset="30%" stopColor="#FFC870" stopOpacity={0.75} />
          <stop offset="100%" stopColor="#FFB050" stopOpacity={0} />
        </radialGradient>
      </defs>
      <path d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`} stroke="#1A1410" strokeWidth={2.5} fill="none" />
      {Array.from({ length: n }).map((_, i) => {
        const u = (i + 0.5) / n;
        const px = (1 - u) * (1 - u) * x1 + 2 * (1 - u) * u * cx + u * u * x2;
        const py = (1 - u) * (1 - u) * y1 + 2 * (1 - u) * u * cy + u * u * y2;
        const flick = 0.82 + 0.18 * Math.sin(t * (1.5 + random(`${seed}${i}`) * 2) + random(`${seed}p${i}`) * 6.28);
        return (
          <g key={i}>
            <circle cx={px} cy={py + 10 * size} r={30 * size} fill={`url(#${id}-bulb)`} opacity={flick} />
            <circle cx={px} cy={py + 10 * size} r={5 * size} fill="#FFF1C2" />
          </g>
        );
      })}
    </g>
  );
};

const Thatch: React.FC<{ x: number; y: number; w: number; h: number; t: number }> = ({ x, y, w, h, t }) => (
  <g>
    <path d={`M ${x} ${y + h} L ${x + w / 2} ${y} L ${x + w} ${y + h} Z`} fill="#8C6A36" />
    {[0, 1, 2, 3].map((row) => {
      const ry = y + h * (0.3 + row * 0.22);
      const half = (w / 2) * (0.3 + row * 0.22);
      const n = 8 + row * 5;
      return Array.from({ length: n }).map((_, i) => {
        const px = x + w / 2 - half + (i / (n - 1)) * half * 2;
        const len = 34 + (i % 3) * 10;
        const swing = Math.sin(t * 1.3 + i * 0.7 + row) * 1.5;
        return (
          <path
            key={`${row}-${i}`}
            d={`M ${px - 9} ${ry} L ${px + swing} ${ry + len} L ${px + 9} ${ry} Z`}
            fill={(i + row) % 3 === 0 ? "#B8924E" : (i + row) % 3 === 1 ? "#A47E40" : "#C9A35E"}
          />
        );
      });
    })}
  </g>
);

/* ---------------------------------------------------------------- hero (exterior at dusk) */

export const HeroScene: React.FC<{ night?: boolean }> = ({ night = false }) => {
  const id = useUid();
  const t = useTime();
  const sway = Math.sin(t * 0.6) * 1.5;
  return (
    <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={night ? "#0C1E26" : "#16404B"} />
          <stop offset="45%" stopColor={night ? "#1D4652" : "#2C6E7F"} />
          <stop offset="78%" stopColor={night ? "#B5674A" : "#E59B78"} />
          <stop offset="100%" stopColor={night ? "#D5734B" : "#F2B57A"} />
        </linearGradient>
        <linearGradient id={`${id}-sea`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C77B5E" />
          <stop offset="12%" stopColor="#2F6575" />
          <stop offset="100%" stopColor="#0F2E37" />
        </linearGradient>
        <radialGradient id={`${id}-sun`}>
          <stop offset="0%" stopColor="#FFE6B0" />
          <stop offset="40%" stopColor="#FFB774" stopOpacity={0.8} />
          <stop offset="100%" stopColor="#FF9A5A" stopOpacity={0} />
        </radialGradient>
        <linearGradient id={`${id}-deck`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6B4128" />
          <stop offset="100%" stopColor="#2E1A0E" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFC678" stopOpacity={0.55} />
          <stop offset="100%" stopColor="#FFC678" stopOpacity={0} />
        </radialGradient>
        <linearGradient id={`${id}-bar`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8A5A36" />
          <stop offset="100%" stopColor="#4A2C18" />
        </linearGradient>
      </defs>
      <rect width={1920} height={640} fill={`url(#${id}-sky)`} />
      <circle cx={760} cy={600} r={night ? 160 : 260} fill={`url(#${id}-sun)`} />
      <circle cx={760} cy={612} r={night ? 34 : 60} fill="#FFE3A8" opacity={night ? 0.6 : 0.95} />
      {/* soft clouds */}
      {[[300, 300, 1.2], [1250, 220, 1], [1650, 380, 0.8]].map(([cx, cy, s], i) => (
        <g key={i} opacity={0.35} transform={`translate(${cx + Math.sin(t * 0.05 + i) * 20} ${cy}) scale(${s})`}>
          <ellipse rx={180} ry={22} fill="#F6C9A6" />
          <ellipse cx={60} cy={-14} rx={90} ry={18} fill="#F6C9A6" />
        </g>
      ))}
      <rect y={610} width={1920} height={230} fill={`url(#${id}-sea)`} />
      {Array.from({ length: 26 }).map((_, i) => {
        const y = 625 + i * 8.5;
        const w = 60 + random(`w${i}`) * 220;
        const x = ((random(`x${i}`) * 1920 + t * (8 + i)) % 2100) - 100;
        return <rect key={i} x={x} y={y} width={w} height={2} fill="#FFD3A0" opacity={0.25 + (26 - i) / 60} />;
      })}
      <path d="M 0 610 L 1920 610" stroke="#FFD9AE" strokeWidth={2} opacity={0.6} />
      {/* distant palms */}
      <PalmTree x={1480} y={760} h={300} lean={-0.12} color="#1B3A36" sway={sway * 0.6} />
      <PalmTree x={1580} y={770} h={250} lean={0.1} color="#1B3A36" sway={-sway * 0.6} />
      {/* deck */}
      <path d="M 0 800 L 1920 800 L 1920 1080 L 0 1080 Z" fill={`url(#${id}-deck)`} />
      {Array.from({ length: 22 }).map((_, i) => {
        const x = -400 + i * 130;
        return <path key={i} d={`M ${960 + (x - 960) * 0.35} 800 L ${x} 1080`} stroke="rgba(0,0,0,0.35)" strokeWidth={3} />;
      })}
      {/* railing */}
      <rect x={0} y={770} width={1920} height={10} fill="#3A2416" />
      {Array.from({ length: 33 }).map((_, i) => (
        <rect key={i} x={i * 60} y={770} width={8} height={60} fill="#3A2416" />
      ))}
      {/* tiki bar */}
      <g>
        <ellipse cx={1180} cy={720} rx={520} ry={260} fill={`url(#${id}-glow)`} />
        <rect x={880} y={420} width={20} height={420} fill="#4A2C18" />
        <rect x={1460} y={420} width={20} height={420} fill="#4A2C18" />
        <rect x={900} y={520} width={560} height={140} fill="#2A1A10" />
        {/* back bar shelves with glowing bottles */}
        {[540, 600].map((sy) => (
          <g key={sy}>
            <rect x={920} y={sy + 34} width={520} height={6} fill="#6B4128" />
            {Array.from({ length: 18 }).map((_, i) => (
              <rect
                key={i}
                x={930 + i * 28}
                y={sy + 34 - (20 + (i % 3) * 8)}
                width={14}
                height={20 + (i % 3) * 8}
                rx={3}
                fill={["#E7A64A", "#C9563C", "#7FA65A", "#F2D27C", "#5A8FA0"][i % 5]}
                opacity={0.9}
              />
            ))}
          </g>
        ))}
        <Thatch x={820} y={300} w={720} h={240} t={t} />
        <rect x={860} y={690} width={640} height={150} fill={`url(#${id}-bar)`} />
        {Array.from({ length: 16 }).map((_, i) => (
          <rect key={i} x={866 + i * 40} y={700} width={30} height={136} rx={10} fill="#9A6A40" opacity={0.75} />
        ))}
        <rect x={840} y={672} width={680} height={24} rx={6} fill="#B07A48" />
        {[930, 1050, 1170, 1290, 1410].map((sx) => (
          <g key={sx}>
            <rect x={sx - 30} y={760} width={60} height={14} rx={7} fill="#2A1A10" />
            <rect x={sx - 4} y={774} width={8} height={70} fill="#2A1A10" />
          </g>
        ))}
      </g>
      <StringLights x1={0} y1={260} x2={900} y2={330} sag={110} n={13} t={t} seed="a" />
      <StringLights x1={900} y1={330} x2={1920} y2={220} sag={120} n={14} t={t} seed="b" />
      {/* foreground palms & plants */}
      <PalmTree x={180} y={1100} h={760} lean={0.22} color="#08130F" sway={sway} />
      <PalmTree x={1820} y={1100} h={680} lean={-0.2} color="#08130F" sway={-sway} />
      <Monstera x={90} y={1090} s={1.5} rot={-20} color="#0F2A1C" />
      <Monstera x={1840} y={1100} s={1.4} rot={25} color="#0F2A1C" />
      <Monstera x={320} y={1120} s={1.1} rot={10} color="#163A26" />
    </svg>
  );
};

/* ---------------------------------------------------------------- interior panorama (3840 wide) */

export const INTERIOR_WIDTH = 3840;
/** Horizontal centre (px) of each feature in the panorama, used for camera pans & labels. */
export const INTERIOR_SPOTS = { bar: 760, wood: 1500, booths: 2080, stage: 2700, patio: 3400 } as const;

const Pendant: React.FC<{ x: number; y: number; t: number; i: number }> = ({ x, y, t, i }) => (
  <g>
    <line x1={x} y1={0} x2={x} y2={y} stroke="#1A1410" strokeWidth={3} />
    <ellipse cx={x} cy={y + 60} rx={150} ry={110} fill="#FFC678" opacity={0.12 + 0.02 * Math.sin(t * 2 + i)} />
    <path d={`M ${x - 46} ${y + 40} Q ${x} ${y - 18} ${x + 46} ${y + 40} Z`} fill="#C9A35E" />
    <path d={`M ${x - 46} ${y + 40} Q ${x} ${y - 18} ${x + 46} ${y + 40}`} stroke="#8C6A36" strokeWidth={4} fill="none" />
    <ellipse cx={x} cy={y + 42} rx={30} ry={8} fill="#FFF0C0" />
  </g>
);

const Booth: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g>
    <path d={`M ${x - 170} ${y + 160} L ${x - 170} ${y - 40} Q ${x - 170} ${y - 90} ${x - 120} ${y - 90} L ${x + 120} ${y - 90} Q ${x + 170} ${y - 90} ${x + 170} ${y - 40} L ${x + 170} ${y + 160} Z`} fill="#1D3B30" />
    {[-120, -40, 40, 120].map((dx) => (
      <rect key={dx} x={x + dx - 34} y={y - 80} width={68} height={170} rx={30} fill="#26503F" />
    ))}
    <rect x={x - 170} y={y + 90} width={340} height={40} rx={12} fill="#2F5E4A" />
    <rect x={x - 110} y={y + 60} width={220} height={18} rx={6} fill="#B07A48" />
    <rect x={x - 10} y={y + 78} width={20} height={100} fill="#4A2C18" />
    <circle cx={x} cy={y + 50} r={10} fill="#FFE2A0" />
    <circle cx={x} cy={y + 50} r={40} fill="#FFC678" opacity={0.25} />
  </g>
);

export const InteriorPanorama: React.FC = () => {
  const id = useUid();
  const t = useTime();
  const W = INTERIOR_WIDTH;
  return (
    <svg viewBox={`0 0 ${W} 1080`} style={{ width: W, height: 1080 }}>
      <defs>
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2A1C12" />
          <stop offset="100%" stopColor="#5A3822" />
        </linearGradient>
        <linearGradient id={`${id}-floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6B4128" />
          <stop offset="100%" stopColor="#24140A" />
        </linearGradient>
        <linearGradient id={`${id}-dusk`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16404B" />
          <stop offset="60%" stopColor="#E59B78" />
          <stop offset="100%" stopColor="#2C6E7F" />
        </linearGradient>
        <radialGradient id={`${id}-spot`} cx="50%" cy="0%" r="100%">
          <stop offset="0%" stopColor="#FFE2A0" stopOpacity={0.5} />
          <stop offset="100%" stopColor="#FFE2A0" stopOpacity={0} />
        </radialGradient>
      </defs>
      <rect width={W} height={760} fill={`url(#${id}-wall)`} />
      {/* wood slat wall */}
      {Array.from({ length: 160 }).map((_, i) => (
        <rect key={i} x={i * 24} y={0} width={14} height={760} fill={i % 4 === 0 ? "#7A4E30" : "#6B4128"} opacity={0.55} />
      ))}
      <rect y={740} width={W} height={340} fill={`url(#${id}-floor)`} />
      {Array.from({ length: 30 }).map((_, i) => (
        <path key={i} d={`M ${i * 140} 760 L ${i * 140 - 200} 1080`} stroke="rgba(0,0,0,0.3)" strokeWidth={3} />
      ))}

      {/* central island bar */}
      <g>
        <ellipse cx={760} cy={600} rx={700} ry={300} fill="#FFC678" opacity={0.18} />
        <Thatch x={300} y={90} w={920} h={260} t={t} />
        {[380, 1140].map((px) => (
          <rect key={px} x={px - 14} y={330} width={28} height={500} fill="#3A2416" />
        ))}
        <rect x={420} y={420} width={680} height={180} fill="#1E140C" />
        {[440, 510].map((sy) => (
          <g key={sy}>
            <rect x={440} y={sy + 50} width={640} height={6} fill="#8A5A36" />
            {Array.from({ length: 22 }).map((_, i) => (
              <rect key={i} x={452 + i * 28} y={sy + 50 - (24 + (i % 3) * 10)} width={16} height={24 + (i % 3) * 10} rx={3} fill={["#E7A64A", "#C9563C", "#7FA65A", "#F2D27C", "#5A8FA0"][i % 5]} />
            ))}
          </g>
        ))}
        <path d="M 330 640 Q 760 600 1190 640 L 1190 820 Q 760 860 330 820 Z" fill="#7A4E30" />
        {Array.from({ length: 22 }).map((_, i) => (
          <rect key={i} x={346 + i * 38} y={656} width={26} height={160} rx={10} fill="#9A6A40" opacity={0.8} />
        ))}
        <path d="M 310 630 Q 760 586 1210 630 L 1210 652 Q 760 610 310 652 Z" fill="#C08A52" />
        {[420, 560, 700, 840, 980, 1110].map((sx) => (
          <g key={sx}>
            <ellipse cx={sx} cy={850} rx={40} ry={12} fill="#2A1A10" />
            <rect x={sx - 5} y={850} width={10} height={110} fill="#2A1A10" />
          </g>
        ))}
        {[560, 760, 960].map((x, i) => (
          <Pendant key={x} x={x} y={260 + (i % 2) * 20} t={t} i={i} />
        ))}
      </g>

      {/* greenery wall */}
      <Monstera x={1300} y={760} s={1.6} rot={-12} color="#2D5A38" />
      <Monstera x={1420} y={770} s={1.3} rot={18} color="#3E7A48" />
      <Monstera x={1600} y={760} s={1.5} rot={-5} color="#2D5A38" />
      {Array.from({ length: 10 }).map((_, i) => (
        <path key={i} d={`M ${1280 + i * 50} 0 q ${i % 2 ? 30 : -30} 160 0 ${300 + (i % 3) * 80}`} stroke="#3E7A48" strokeWidth={8} fill="none" />
      ))}

      {/* booths */}
      <Booth x={1900} y={600} />
      <Booth x={2260} y={600} />
      {[1900, 2260].map((x, i) => (
        <Pendant key={x} x={x} y={300} t={t} i={i + 4} />
      ))}

      {/* stage */}
      <g>
        <ellipse cx={2700} cy={420} rx={260} ry={420} fill={`url(#${id}-spot)`} />
        <rect x={2460} y={760} width={480} height={60} fill="#3A2416" />
        <rect x={2460} y={752} width={480} height={12} fill="#C4A060" />
        <rect x={2500} y={600} width={70} height={160} rx={8} fill="#141414" />
        <circle cx={2535} cy={650} r={22} fill="#2A2A2A" />
        <circle cx={2535} cy={715} r={14} fill="#2A2A2A" />
        <rect x={2830} y={600} width={70} height={160} rx={8} fill="#141414" />
        <circle cx={2865} cy={650} r={22} fill="#2A2A2A" />
        <circle cx={2865} cy={715} r={14} fill="#2A2A2A" />
        <line x1={2700} y1={760} x2={2700} y2={560} stroke="#AFA59A" strokeWidth={5} />
        <rect x={2690} y={540} width={20} height={30} rx={8} fill="#2A2A2A" />
        {/* ukulele / guitar on stand */}
        <g transform="translate(2780 690) rotate(-14)">
          <rect x={-6} y={-150} width={12} height={110} fill="#5A3822" />
          <ellipse cx={0} cy={0} rx={44} ry={56} fill="#C08A52" />
          <ellipse cx={0} cy={-40} rx={32} ry={34} fill="#C08A52" />
          <circle cx={0} cy={-10} r={12} fill="#2A1A10" />
        </g>
      </g>

      {/* patio doors & view */}
      <g>
        <rect x={3060} y={120} width={720} height={640} fill={`url(#${id}-dusk)`} />
        <rect x={3060} y={520} width={720} height={240} fill="#2C6E7F" />
        <rect x={3060} y={520} width={720} height={3} fill="#FFD9AE" opacity={0.7} />
        <PalmTree x={3300} y={760} h={420} lean={0.1} color="#0E1F1A" sway={Math.sin(t * 0.6) * 1.5} />
        <PalmTree x={3640} y={760} h={360} lean={-0.15} color="#0E1F1A" sway={-Math.sin(t * 0.6) * 1.5} />
        <StringLights x1={3060} y1={170} x2={3780} y2={200} sag={90} n={10} t={t} seed="p" size={0.8} />
        {[3060, 3240, 3420, 3600, 3780].map((x) => (
          <rect key={x} x={x - 8} y={110} width={16} height={660} fill="#2A1A10" />
        ))}
        <rect x={3050} y={100} width={740} height={22} fill="#2A1A10" />
        {[3200, 3560].map((x) => (
          <g key={x}>
            <rect x={x - 70} y={680} width={140} height={14} rx={6} fill="#B07A48" />
            <rect x={x - 6} y={694} width={12} height={80} fill="#3A2416" />
            <rect x={x - 4} y={470} width={8} height={210} fill="#E7D3A8" />
            <path d={`M ${x - 120} 490 Q ${x} 420 ${x + 120} 490 Z`} fill="#D5734B" />
          </g>
        ))}
      </g>
      <Monstera x={2990} y={1080} s={1.3} rot={-15} color="#1F4A2E" />
      <Monstera x={120} y={1080} s={1.4} rot={20} color="#1F4A2E" />
    </svg>
  );
};
