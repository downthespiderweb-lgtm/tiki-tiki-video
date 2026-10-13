import React, { useId } from "react";
import type { Cocktail, GlassKind } from "../data/beverages";

/**
 * Original side-view beverage illustrations (viewBox 300×440, glass base ≈ y 405).
 * Transparent background — place on slate or cream panels.
 */

const useUid = () => useId().replace(/[^a-zA-Z0-9]/g, "");

type GlassSpec = {
  outline: string;
  liquid: string;
  /** y of the liquid surface (for ice/garnish placement) */
  surface: number;
  rimY: number;
  rimX: [number, number];
  stem?: React.ReactNode;
};

const GLASSES: Record<GlassKind, GlassSpec> = {
  rocks: {
    outline: "M 72 222 L 228 222 L 219 398 Q 150 410 81 398 Z",
    liquid: "M 79 250 L 221 250 L 214 392 Q 150 402 86 392 Z",
    surface: 250, rimY: 222, rimX: [72, 228],
  },
  oldFashioned: {
    outline: "M 76 232 L 224 232 L 220 400 Q 150 410 80 400 Z",
    liquid: "M 82 268 L 218 268 L 215 384 Q 150 392 85 384 Z",
    surface: 268, rimY: 232, rimX: [76, 224],
  },
  highball: {
    outline: "M 98 112 L 202 112 L 197 400 Q 150 410 103 400 Z",
    liquid: "M 103 150 L 197 150 L 193 392 Q 150 400 107 392 Z",
    surface: 150, rimY: 112, rimX: [98, 202],
  },
  collins: {
    outline: "M 102 104 L 198 104 L 196 400 Q 150 410 104 400 Z",
    liquid: "M 107 140 L 193 140 L 191 392 Q 150 400 109 392 Z",
    surface: 140, rimY: 104, rimX: [102, 198],
  },
  coupe: {
    outline: "M 54 186 L 246 186 Q 236 286 150 290 Q 64 286 54 186 Z",
    liquid: "M 62 200 L 238 200 Q 228 280 150 283 Q 72 280 62 200 Z",
    surface: 200, rimY: 186, rimX: [54, 246],
    stem: (
      <>
        <path d="M 144 288 L 156 288 L 154 392 L 146 392 Z" fill="rgba(255,255,255,0.35)" />
        <ellipse cx={150} cy={398} rx={62} ry={10} fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.7)" strokeWidth={2} />
      </>
    ),
  },
  margarita: {
    outline: "M 40 168 L 260 168 Q 250 222 190 232 Q 172 236 170 262 Q 168 292 150 296 Q 132 292 130 262 Q 128 236 110 232 Q 50 222 40 168 Z",
    liquid: "M 50 180 L 250 180 Q 240 216 188 224 Q 166 228 164 258 Q 162 284 150 287 Q 138 284 136 258 Q 134 228 112 224 Q 60 216 50 180 Z",
    surface: 180, rimY: 168, rimX: [40, 260],
    stem: (
      <>
        <path d="M 146 294 L 154 294 L 153 392 L 147 392 Z" fill="rgba(255,255,255,0.35)" />
        <ellipse cx={150} cy={398} rx={64} ry={10} fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.7)" strokeWidth={2} />
      </>
    ),
  },
  tiki: {
    outline: "M 86 140 L 214 140 L 222 400 Q 150 412 78 400 Z",
    liquid: "M 92 160 L 208 160 L 214 392 Q 150 402 86 392 Z",
    surface: 160, rimY: 140, rimX: [86, 214],
  },
};

const Ice: React.FC<{ x: number; y: number; s?: number; rot?: number }> = ({ x, y, s = 1, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-22} y={-22} width={44} height={44} rx={9} fill="rgba(255,255,255,0.28)" stroke="rgba(255,255,255,0.65)" strokeWidth={2} />
    <path d="M -14 -12 L 4 -14" stroke="rgba(255,255,255,0.8)" strokeWidth={3} strokeLinecap="round" />
  </g>
);

const MintSprig: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 30 L 0 -10" stroke="#3E6B2E" strokeWidth={3} />
    {[
      [-16, -6, -40], [16, -8, 40], [-12, -26, -20], [12, -28, 20], [0, -40, 0], [-20, 10, -60], [20, 8, 60],
    ].map(([dx, dy, r], i) => (
      <g key={i} transform={`translate(${dx} ${dy}) rotate(${r})`}>
        <ellipse rx={11} ry={16} fill={i % 2 ? "#4F9A3E" : "#62AE4A"} />
        <path d="M 0 -12 L 0 12" stroke="rgba(255,255,255,0.35)" strokeWidth={1.5} />
      </g>
    ))}
  </g>
);

const PineappleWedge: React.FC<{ x: number; y: number; rot?: number; s?: number }> = ({ x, y, rot = 0, s = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -10 -70 L 6 -30 L -6 -28 Z" fill="#3E7A3A" />
    <path d="M 4 -72 L 12 -30 L 0 -30 Z" fill="#4F9A3E" />
    <path d="M -40 0 L 40 0 L 6 -32 L -6 -32 Z" fill="#F6CE48" />
    <path d="M -46 0 L 46 0 L 42 10 L -42 10 Z" fill="#A86A2A" />
    <path d="M -24 -8 L -8 -22 M 24 -8 L 8 -22" stroke="#E8B12C" strokeWidth={3} />
  </g>
);

const Wheel: React.FC<{ x: number; y: number; r?: number; rind: string; flesh: string; notch?: boolean }> = ({ x, y, r = 34, rind, flesh }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill={rind} />
    <circle r={r * 0.88} fill="#FFF6E0" />
    <circle r={r * 0.76} fill={flesh} />
    {Array.from({ length: 8 }).map((_, i) => (
      <line key={i} x1={0} y1={0} x2={r * 0.76 * Math.cos((i * Math.PI) / 4)} y2={r * 0.76 * Math.sin((i * Math.PI) / 4)} stroke="#FFF6E0" strokeWidth={2.5} />
    ))}
  </g>
);

const Straw: React.FC<{ x: number; top: number; color?: string; tilt?: number }> = ({ x, top, color = "#1F3B30", tilt = 10 }) => (
  <g transform={`rotate(${tilt} ${x} ${top + 80})`}>
    <rect x={x - 5} y={top} width={10} height={220} rx={5} fill={color} />
    <rect x={x - 5} y={top} width={4} height={220} rx={2} fill="rgba(255,255,255,0.25)" />
  </g>
);

const Umbrella: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y}) rotate(-24)`}>
    <line x1={0} y1={0} x2={0} y2={90} stroke="#E7D3A8" strokeWidth={3} />
    <path d="M -46 0 Q 0 -40 46 0 Z" fill="#D5734B" />
    <path d="M -46 0 Q -15 -30 0 -20 L 0 0 Z" fill="#E59B78" />
    <path d="M 46 0 Q 15 -30 0 -20 L 0 0 Z" fill="#C4A060" />
  </g>
);

const Garnish: React.FC<{ kind: Cocktail["garnish"]; spec: GlassSpec }> = ({ kind, spec }) => {
  const [l, r] = spec.rimX;
  const y = spec.rimY;
  switch (kind) {
    case "mint-pineapple":
      return (
        <>
          <MintSprig x={(l + r) / 2 - 20} y={y - 14} s={1.2} />
          <PineappleWedge x={r - 8} y={y + 4} rot={18} s={0.85} />
        </>
      );
    case "tajin-lime":
      return (
        <>
          <Wheel x={r - 30} y={y - 10} r={36} rind="#6E9F3A" flesh="#B9D86A" />
        </>
      );
    case "passion":
      return (
        <g transform={`translate(${(l + r) / 2 + 40} ${spec.surface - 6})`}>
          <ellipse rx={38} ry={14} fill="#5A2A4A" />
          <ellipse rx={32} ry={10} fill="#F2B21E" />
          {Array.from({ length: 9 }).map((_, i) => (
            <circle key={i} cx={-22 + i * 5.5} cy={(i % 3) * 3 - 3} r={2.4} fill="#2A1A10" />
          ))}
        </g>
      );
    case "pineapple-mint":
      return (
        <>
          <Straw x={176} top={40} tilt={8} />
          <MintSprig x={128} y={y - 10} s={1.15} />
          <PineappleWedge x={r - 2} y={y + 4} rot={24} s={0.8} />
        </>
      );
    case "lime-mint":
      return (
        <>
          <Straw x={180} top={50} tilt={10} color="#C4A060" />
          <Umbrella x={110} y={y - 50} />
          <MintSprig x={140} y={y - 6} s={1.0} />
          <Wheel x={r - 18} y={y - 2} r={30} rind="#6E9F3A" flesh="#B9D86A" />
        </>
      );
    case "grapefruit":
      return (
        <>
          <Straw x={170} top={36} tilt={8} color="#1F3B30" />
          <Wheel x={r - 14} y={y - 4} r={38} rind="#E07A5F" flesh="#F29B93" />
        </>
      );
    case "orange-peel":
      return (
        <path
          d={`M ${r - 30} ${y - 6} q 30 -10 34 18 q 4 26 -18 38`}
          stroke="#EE8A2A"
          strokeWidth={12}
          fill="none"
          strokeLinecap="round"
        />
      );
    default:
      return null;
  }
};

const TikiFace: React.FC = () => (
  <g opacity={0.9}>
    <rect x={104} y={196} width={92} height={16} rx={6} fill="rgba(0,0,0,0.25)" />
    <ellipse cx={126} cy={240} rx={16} ry={12} fill="rgba(0,0,0,0.35)" />
    <ellipse cx={174} cy={240} rx={16} ry={12} fill="rgba(0,0,0,0.35)" />
    <path d="M 150 250 L 140 300 L 160 300 Z" fill="rgba(0,0,0,0.25)" />
    <rect x={112} y={318} width={76} height={26} rx={10} fill="rgba(0,0,0,0.35)" />
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={118 + i * 18} y={322} width={12} height={18} rx={3} fill="rgba(255,240,220,0.5)" />
    ))}
  </g>
);

/** A signature cocktail. */
export const CocktailArt: React.FC<{ drink: Cocktail; style?: React.CSSProperties }> = ({ drink, style }) => {
  const id = useUid();
  const spec = GLASSES[drink.glass];
  const isTiki = drink.glass === "tiki";
  return (
    <svg viewBox="0 0 300 440" style={{ width: "100%", height: "100%", overflow: "visible", ...style }}>
      <defs>
        <linearGradient id={`${id}-liq`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={drink.liquid[0]} />
          <stop offset="100%" stopColor={drink.liquid[1]} />
        </linearGradient>
        <linearGradient id={`${id}-mug`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1E5E66" />
          <stop offset="45%" stopColor="#3E8A8E" />
          <stop offset="100%" stopColor="#174A52" />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <path d={spec.liquid} />
        </clipPath>
      </defs>
      <ellipse cx={150} cy={410} rx={110} ry={14} fill="rgba(0,0,0,0.35)" />
      {spec.stem}
      {isTiki ? (
        <>
          <path d={spec.outline} fill={`url(#${id}-mug)`} />
          <TikiFace />
          <ellipse cx={150} cy={spec.rimY} rx={64} ry={10} fill="#123A40" />
          <ellipse cx={150} cy={spec.rimY + 2} rx={58} ry={7} fill={drink.liquid[0]} />
          <path d="M 98 160 L 102 380" stroke="rgba(255,255,255,0.25)" strokeWidth={8} strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d={spec.liquid} fill={`url(#${id}-liq)`} />
          <g clipPath={`url(#${id}-clip)`}>
            {drink.glass === "oldFashioned" ? (
              <Ice x={150} y={spec.surface + 30} s={1.9} rot={8} />
            ) : drink.glass === "rocks" ? (
              <>
                {Array.from({ length: 10 }).map((_, i) => (
                  <Ice key={i} x={95 + (i % 4) * 38} y={spec.surface + 10 + Math.floor(i / 4) * 34} s={0.7} rot={i * 23} />
                ))}
              </>
            ) : drink.glass === "highball" || drink.glass === "collins" ? (
              <>
                {[0, 1, 2, 3, 4].map((i) => (
                  <Ice key={i} x={128 + (i % 2) * 44} y={spec.surface + 30 + i * 48} rot={i * 17} />
                ))}
                {Array.from({ length: 12 }).map((_, i) => (
                  <circle key={`b${i}`} cx={115 + ((i * 37) % 70)} cy={spec.surface + 40 + ((i * 53) % 200)} r={3} fill="rgba(255,255,255,0.55)" />
                ))}
              </>
            ) : null}
            {drink.glass === "coupe" ? <rect x={50} y={spec.surface - 2} width={200} height={16} fill="#FFF6DC" opacity={0.9} /> : null}
            <rect x={40} y={spec.surface} width={220} height={6} fill="rgba(255,255,255,0.35)" />
          </g>
          <path d={spec.outline} fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.75)" strokeWidth={3} />
          <path d={`M ${spec.rimX[0] + 14} ${spec.rimY + 18} L ${spec.rimX[0] + 20} ${spec.rimY + 120}`} stroke="rgba(255,255,255,0.55)" strokeWidth={7} strokeLinecap="round" />
          {drink.garnish === "tajin-lime" ? (
            <path d={`M ${spec.rimX[0]} ${spec.rimY} L ${spec.rimX[1]} ${spec.rimY}`} stroke="#C8502E" strokeWidth={9} strokeDasharray="4 3" strokeLinecap="round" />
          ) : null}
        </>
      )}
      <Garnish kind={drink.garnish} spec={spec} />
    </svg>
  );
};

/** Wine (glass + bottle), beer bottle and zero-proof spritz. */
export const BottleArt: React.FC<{ kind: "white" | "red" | "beer" | "spritz"; style?: React.CSSProperties }> = ({ kind, style }) => {
  const id = useUid();
  const wineColor = kind === "white" ? ["#F4E39A", "#E2C964"] : ["#8E2338", "#5A1022"];
  if (kind === "beer") {
    return (
      <svg viewBox="0 0 300 440" style={{ width: "100%", height: "100%", overflow: "visible", ...style }}>
        <defs>
          <linearGradient id={`${id}-amber`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6E3A0E" />
            <stop offset="45%" stopColor="#C77B22" />
            <stop offset="100%" stopColor="#5A2E0A" />
          </linearGradient>
        </defs>
        <ellipse cx={150} cy={410} rx={80} ry={12} fill="rgba(0,0,0,0.35)" />
        <path d="M 134 40 L 166 40 L 168 120 Q 206 150 206 200 L 206 396 Q 150 408 94 396 L 94 200 Q 94 150 132 120 Z" fill={`url(#${id}-amber)`} />
        <rect x={130} y={30} width={40} height={16} rx={4} fill="#C4A060" />
        <rect x={94} y={232} width={112} height={110} fill="#F3EADA" />
        <rect x={94} y={244} width={112} height={3} fill="#C4A060" />
        <rect x={94} y={328} width={112} height={3} fill="#C4A060" />
        <path d="M 110 160 L 112 380" stroke="rgba(255,255,255,0.35)" strokeWidth={8} strokeLinecap="round" />
        <g transform="translate(150 34) rotate(-14)">
          <path d="M -24 0 A 24 24 0 0 1 24 0 Z" fill="#6E9F3A" />
          <path d="M -19 0 A 19 19 0 0 1 19 0 Z" fill="#B9D86A" />
        </g>
      </svg>
    );
  }
  if (kind === "spritz") {
    return (
      <svg viewBox="0 0 300 440" style={{ width: "100%", height: "100%", overflow: "visible", ...style }}>
        <ellipse cx={150} cy={410} rx={80} ry={12} fill="rgba(0,0,0,0.35)" />
        <path d="M 86 120 Q 80 270 150 282 Q 220 270 214 120 Z" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.75)" strokeWidth={3} />
        <path d="M 90 168 Q 88 266 150 276 Q 212 266 210 168 Z" fill="#EF7B3A" />
        <rect x={110} y={180} width={40} height={40} rx={8} fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.6)" strokeWidth={2} />
        <rect x={152} y={200} width={40} height={40} rx={8} fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.6)" strokeWidth={2} />
        <path d="M 146 282 L 154 282 L 153 392 L 147 392 Z" fill="rgba(255,255,255,0.35)" />
        <ellipse cx={150} cy={398} rx={60} ry={10} fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.7)" strokeWidth={2} />
        <Wheel x={196} y={150} r={34} rind="#EE8A2A" flesh="#F8B24E" />
        <path d="M 100 140 L 104 240" stroke="rgba(255,255,255,0.55)" strokeWidth={7} strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 300 440" style={{ width: "100%", height: "100%", overflow: "visible", ...style }}>
      <defs>
        <linearGradient id={`${id}-glassbot`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={kind === "white" ? "#3E5A3A" : "#1E1A16"} />
          <stop offset="50%" stopColor={kind === "white" ? "#6E8A5A" : "#3A2A24"} />
          <stop offset="100%" stopColor={kind === "white" ? "#2E4A2A" : "#120E0A"} />
        </linearGradient>
        <linearGradient id={`${id}-wine`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={wineColor[0]} />
          <stop offset="100%" stopColor={wineColor[1]} />
        </linearGradient>
      </defs>
      <ellipse cx={150} cy={410} rx={120} ry={14} fill="rgba(0,0,0,0.35)" />
      {/* bottle */}
      <path d="M 70 30 L 96 30 L 98 120 Q 128 150 128 196 L 128 398 Q 83 406 38 398 L 38 196 Q 38 150 68 120 Z" fill={`url(#${id}-glassbot)`} />
      <rect x={66} y={22} width={34} height={30} rx={4} fill={kind === "white" ? "#C4A060" : "#7A1A2A"} />
      <rect x={38} y={240} width={90} height={96} fill="#F3EADA" />
      <rect x={38} y={252} width={90} height={2} fill="#C4A060" />
      <rect x={38} y={322} width={90} height={2} fill="#C4A060" />
      <path d="M 52 150 L 54 380" stroke="rgba(255,255,255,0.3)" strokeWidth={7} strokeLinecap="round" />
      {/* glass */}
      <path d="M 160 150 Q 154 290 214 300 Q 274 290 268 150 Z" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.75)" strokeWidth={3} />
      <path d="M 162 222 Q 162 292 214 296 Q 266 292 266 222 Z" fill={`url(#${id}-wine)`} />
      <path d="M 210 300 L 218 300 L 217 396 L 211 396 Z" fill="rgba(255,255,255,0.35)" />
      <ellipse cx={214} cy={400} rx={50} ry={8} fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.7)" strokeWidth={2} />
      <path d="M 172 168 L 174 250" stroke="rgba(255,255,255,0.55)" strokeWidth={6} strokeLinecap="round" />
    </svg>
  );
};
