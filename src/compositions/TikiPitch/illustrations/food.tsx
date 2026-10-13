import React, { useId } from "react";
import { random } from "remotion";
import type { DishKind } from "../data/menu";

/**
 * Original top-down "flat-lay" dish illustrations (viewBox 400×400).
 * Built from simple shared primitives so every dish shares one visual language.
 */

const useUid = () => useId().replace(/[^a-zA-Z0-9]/g, "");

type P = { x?: number; y?: number; r?: number; s?: number; rot?: number };
const tf = ({ x = 0, y = 0, s = 1, rot = 0 }: P) => `translate(${x} ${y}) rotate(${rot}) scale(${s})`;

/* ---------------------------------------------------------------- primitives */

const Defs: React.FC<{ id: string }> = ({ id }) => (
  <defs>
    <radialGradient id={`${id}-plate`} cx="45%" cy="40%" r="65%">
      <stop offset="0%" stopColor="#FFFDF8" />
      <stop offset="70%" stopColor="#F3ECDF" />
      <stop offset="100%" stopColor="#DCD1BE" />
    </radialGradient>
    <radialGradient id={`${id}-well`} cx="45%" cy="40%" r="70%">
      <stop offset="0%" stopColor="#FFFFFF" />
      <stop offset="100%" stopColor="#EFE7D8" />
    </radialGradient>
    <radialGradient id={`${id}-shadow`} cx="50%" cy="50%" r="50%">
      <stop offset="60%" stopColor="rgba(20,12,6,0.45)" />
      <stop offset="100%" stopColor="rgba(20,12,6,0)" />
    </radialGradient>
    <radialGradient id={`${id}-fried`} cx="40%" cy="35%" r="70%">
      <stop offset="0%" stopColor="#F7D27E" />
      <stop offset="60%" stopColor="#DFA046" />
      <stop offset="100%" stopColor="#B4702A" />
    </radialGradient>
    <radialGradient id={`${id}-glaze`} cx="40%" cy="35%" r="70%">
      <stop offset="0%" stopColor="#F6B04E" />
      <stop offset="70%" stopColor="#D2702A" />
      <stop offset="100%" stopColor="#9A4A1C" />
    </radialGradient>
    <radialGradient id={`${id}-char`} cx="40%" cy="35%" r="70%">
      <stop offset="0%" stopColor="#B8642E" />
      <stop offset="70%" stopColor="#7A3A1A" />
      <stop offset="100%" stopColor="#4A2210" />
    </radialGradient>
    <linearGradient id={`${id}-steak`} x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="#5A321D" />
      <stop offset="12%" stopColor="#A9483F" />
      <stop offset="50%" stopColor="#D9767A" />
      <stop offset="88%" stopColor="#A9483F" />
      <stop offset="100%" stopColor="#5A321D" />
    </linearGradient>
    <linearGradient id={`${id}-salmon`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#F7A578" />
      <stop offset="100%" stopColor="#E0683F" />
    </linearGradient>
    <radialGradient id={`${id}-curry`} cx="45%" cy="40%" r="65%">
      <stop offset="0%" stopColor="#F4CB62" />
      <stop offset="100%" stopColor="#D99A2A" />
    </radialGradient>
    <radialGradient id={`${id}-iron`} cx="45%" cy="40%" r="60%">
      <stop offset="0%" stopColor="#3A3A38" />
      <stop offset="100%" stopColor="#141414" />
    </radialGradient>
    <radialGradient id={`${id}-caramel`} cx="40%" cy="35%" r="70%">
      <stop offset="0%" stopColor="#F0B45A" />
      <stop offset="70%" stopColor="#C8782A" />
      <stop offset="100%" stopColor="#8C4A16" />
    </radialGradient>
    <radialGradient id={`${id}-bun`} cx="40%" cy="35%" r="70%">
      <stop offset="0%" stopColor="#F1BE6E" />
      <stop offset="65%" stopColor="#CF8634" />
      <stop offset="100%" stopColor="#9C5A1E" />
    </radialGradient>
    <radialGradient id={`${id}-halibut`} cx="40%" cy="35%" r="75%">
      <stop offset="0%" stopColor="#E9B76A" />
      <stop offset="45%" stopColor="#F8EEDC" />
      <stop offset="100%" stopColor="#EDE2CC" />
    </radialGradient>
  </defs>
);

const Shadow: React.FC<{ id: string; r: number; dx?: number; dy?: number }> = ({ id, r, dx = 10, dy = 14 }) => (
  <circle cx={200 + dx} cy={200 + dy} r={r * 1.08} fill={`url(#${id}-shadow)`} />
);

const Plate: React.FC<{ id: string; r?: number }> = ({ id, r = 168 }) => (
  <g>
    <Shadow id={id} r={r} />
    <circle cx={200} cy={200} r={r} fill={`url(#${id}-plate)`} />
    <circle cx={200} cy={200} r={r * 0.72} fill={`url(#${id}-well)`} stroke="#E4DACA" strokeWidth={2} />
    <path d={`M ${200 - r * 0.86} 170 A ${r * 0.9} ${r * 0.9} 0 0 1 150 ${200 - r * 0.86}`} stroke="#FFFFFF" strokeWidth={5} fill="none" opacity={0.8} strokeLinecap="round" />
  </g>
);

const Bowl: React.FC<{ id: string; r?: number; color?: string }> = ({ id, r = 150, color = "#2C4A5A" }) => (
  <g>
    <Shadow id={id} r={r} />
    <circle cx={200} cy={200} r={r} fill={color} />
    <circle cx={200} cy={200} r={r * 0.9} fill="#F6F0E4" />
    <circle cx={200} cy={200} r={r * 0.86} fill="#EFE6D6" />
  </g>
);

const Board: React.FC<{ id: string }> = ({ id }) => (
  <g>
    <rect x={44} y={58} width={320} height={300} rx={36} fill="rgba(20,12,6,0.35)" />
    <rect x={34} y={44} width={320} height={300} rx={36} fill="#C79058" />
    <rect x={34} y={44} width={320} height={300} rx={36} fill={`url(#${id}-plate)`} opacity={0.12} />
    {[0, 1, 2, 3, 4].map((i) => (
      <path key={i} d={`M 50 ${80 + i * 58} Q 190 ${70 + i * 58} 340 ${86 + i * 58}`} stroke="#A9733F" strokeWidth={2} fill="none" opacity={0.5} />
    ))}
  </g>
);

const Leaf: React.FC<P & { color?: string }> = ({ color = "#4F8E3B", ...p }) => (
  <g transform={tf(p)}>
    <path d="M 0 0 C 6 -10 18 -12 26 -4 C 18 4 6 6 0 0 Z" fill={color} />
    <path d="M 0 0 L 22 -4" stroke="rgba(255,255,255,0.35)" strokeWidth={1} />
  </g>
);

const Herbs: React.FC<{ seed: string; cx: number; cy: number; spread: number; n?: number; color?: string; size?: number }> = ({
  seed, cx, cy, spread, n = 7, color, size = 1,
}) => (
  <g>
    {Array.from({ length: n }).map((_, i) => (
      <Leaf
        key={i}
        x={cx + (random(`${seed}x${i}`) - 0.5) * spread}
        y={cy + (random(`${seed}y${i}`) - 0.5) * spread}
        rot={random(`${seed}r${i}`) * 360}
        s={size * (0.7 + random(`${seed}s${i}`) * 0.5)}
        color={color}
      />
    ))}
  </g>
);

const Dots: React.FC<{ seed: string; cx: number; cy: number; spread: number; n: number; r: number; color: string; round?: boolean }> = ({
  seed, cx, cy, spread, n, r, color, round = true,
}) => (
  <g>
    {Array.from({ length: n }).map((_, i) => {
      const a = random(`${seed}a${i}`) * Math.PI * 2;
      const d = Math.sqrt(random(`${seed}d${i}`)) * spread;
      const x = cx + Math.cos(a) * d;
      const y = cy + Math.sin(a) * d;
      return round ? (
        <circle key={i} cx={x} cy={y} r={r * (0.7 + random(`${seed}r${i}`) * 0.6)} fill={color} />
      ) : (
        <rect key={i} x={x} y={y} width={r * 2.4} height={r} rx={r / 2} fill={color} transform={`rotate(${random(`${seed}t${i}`) * 180} ${x} ${y})`} />
      );
    })}
  </g>
);

const LimeWedge: React.FC<P> = (p) => (
  <g transform={tf(p)}>
    <path d="M -30 0 A 30 30 0 0 1 30 0 Z" fill="#6E9F3A" />
    <path d="M -26 0 A 26 26 0 0 1 26 0 Z" fill="#EEF4CD" />
    <path d="M -22 0 A 22 22 0 0 1 22 0 Z" fill="#B9D86A" />
    {[-60, -20, 20, 60].map((a) => (
      <line key={a} x1={0} y1={0} x2={22 * Math.sin((a * Math.PI) / 180)} y2={-22 * Math.cos((a * Math.PI) / 180)} stroke="#EEF4CD" strokeWidth={2} />
    ))}
  </g>
);

const LimeWheel: React.FC<P & { color?: string; pith?: string; flesh?: string }> = ({
  color = "#6E9F3A", pith = "#EEF4CD", flesh = "#B9D86A", ...p
}) => (
  <g transform={tf(p)}>
    <circle r={28} fill={color} />
    <circle r={25} fill={pith} />
    <circle r={21} fill={flesh} />
    {Array.from({ length: 8 }).map((_, i) => (
      <line key={i} x1={0} y1={0} x2={21 * Math.cos((i * Math.PI) / 4)} y2={21 * Math.sin((i * Math.PI) / 4)} stroke={pith} strokeWidth={2} />
    ))}
    <circle r={3} fill={pith} />
  </g>
);

const SauceCup: React.FC<P & { color: string; cup?: string }> = ({ color, cup = "#F4EEE2", ...p }) => (
  <g transform={tf(p)}>
    <circle r={38} fill="rgba(20,12,6,0.25)" cx={5} cy={7} />
    <circle r={38} fill={cup} stroke="#DCD2C0" strokeWidth={2} />
    <circle r={30} fill={color} />
    <path d="M -16 -14 Q -6 -22 6 -20" stroke="rgba(255,255,255,0.55)" strokeWidth={4} fill="none" strokeLinecap="round" />
  </g>
);

const Drizzle: React.FC<{ d: string; color?: string; w?: number }> = ({ d, color = "#FFF6E3", w = 4 }) => (
  <path d={d} stroke={color} strokeWidth={w} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={0.95} />
);

const Shrimp: React.FC<P & { id: string; color?: string }> = ({ id, color, ...p }) => (
  <g transform={tf(p)}>
    <path
      d="M -22 -26 C 12 -44 46 -16 36 16 C 28 40 -2 44 -18 32 L -9 16 C 2 24 18 20 21 6 C 24 -8 8 -18 -14 -10 Z"
      fill={color ?? `url(#${id}-fried)`}
      stroke="#A9632A"
      strokeWidth={1.5}
    />
    {[0, 1, 2, 3].map((i) => (
      <path key={i} d={`M ${-6 + i * 12} ${-30 + i * 9} q 8 8 4 18`} stroke="rgba(120,60,20,0.4)" strokeWidth={2.5} fill="none" />
    ))}
    <path d="M -18 32 l -14 4 l 8 -14 Z" fill="#E86A3E" />
    <path d="M -12 -20 C 6 -30 26 -20 28 -4" stroke="rgba(255,240,200,0.55)" strokeWidth={4} fill="none" strokeLinecap="round" />
  </g>
);

const ChickenCube: React.FC<P & { id: string; glaze?: boolean }> = ({ id, glaze, ...p }) => (
  <g transform={tf(p)}>
    <rect x={-17} y={-15} width={34} height={30} rx={9} fill={`url(#${id}-${glaze ? "glaze" : "fried"})`} />
    <path d="M -12 -6 L 10 -10 M -10 6 L 12 2" stroke="rgba(70,30,10,0.55)" strokeWidth={3} strokeLinecap="round" />
  </g>
);

const PineChunk: React.FC<P> = (p) => (
  <g transform={tf(p)}>
    <path d="M -15 -14 L 16 -12 L 13 15 L -14 13 Z" fill="#F6CE48" stroke="#E0A92C" strokeWidth={2} />
    <path d="M -9 -6 L 9 -4 M -8 4 L 8 6" stroke="#FBE48A" strokeWidth={2} />
  </g>
);

const Rice: React.FC<{ cx: number; cy: number; r: number; seed: string; beans?: boolean }> = ({ cx, cy, r, seed, beans }) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill="#FBF7EE" />
    <Dots seed={`${seed}g`} cx={cx} cy={cy} spread={r * 0.92} n={Math.round(r * 1.2)} r={2.6} color="#E7DEC9" round={false} />
    {beans ? <Dots seed={`${seed}b`} cx={cx} cy={cy} spread={r * 0.85} n={Math.round(r * 0.5)} r={4.2} color="#4A2A24" /> : null}
  </g>
);

const SteakSlices: React.FC<{ id: string; x: number; y: number; n?: number; rot?: number }> = ({ x, y, n = 5, rot = -20 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    {Array.from({ length: n }).map((_, i) => (
      <g key={i} transform={`translate(${(i - (n - 1) / 2) * 30} ${Math.abs(i - (n - 1) / 2) * 3}) rotate(${(i - (n - 1) / 2) * 4})`}>
        <rect x={-21} y={-58} width={44} height={116} rx={8} fill="rgba(30,15,5,0.35)" transform="translate(4 5)" />
        <rect x={-21} y={-58} width={44} height={116} rx={8} fill="#4E2A16" />
        <rect x={-15} y={-50} width={32} height={100} rx={6} fill="#B9524C" />
        <rect x={-10} y={-42} width={22} height={84} rx={6} fill="#DE7F80" />
        <path d="M -6 -30 L 8 -34 M -6 0 L 8 -4 M -6 28 L 8 24" stroke="rgba(255,225,225,0.35)" strokeWidth={2} />
      </g>
    ))}
  </g>
);

/* ---------------------------------------------------------------- dishes */

const dishes: Record<DishKind, (id: string) => React.ReactNode> = {
  shrimp: (id) => (
    <>
      <Plate id={id} />
      {[[150, 150, 20], [215, 135, 70], [260, 190, 130], [160, 225, -40], [230, 245, 170], [195, 190, 230]].map(([x, y, r], i) => (
        <Shrimp key={i} id={id} x={x} y={y} rot={r} s={1.25} />
      ))}
      <SauceCup x={285} y={275} color="#F1B07A" s={0.8} />
      <LimeWedge x={118} y={268} rot={-30} s={0.9} />
      <Herbs seed="sh" cx={200} cy={200} spread={180} n={8} size={0.7} />
    </>
  ),
  poke: (id) => (
    <>
      <Bowl id={id} color="#1F3B4A" />
      {Array.from({ length: 11 }).map((_, i) => {
        const a = (i / 11) * Math.PI * 2;
        const d = i % 2 ? 62 : 28;
        return (
          <g key={i} transform={`translate(${200 + Math.cos(a) * d} ${200 + Math.sin(a) * d}) rotate(${i * 33})`}>
            <rect x={-17} y={-15} width={34} height={30} rx={6} fill="#C9394B" />
            <rect x={-12} y={-11} width={14} height={8} rx={3} fill="#E9707C" opacity={0.7} />
          </g>
        );
      })}
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M ${250 + i * 9} ${110 + i * 4} q 30 30 0 70`} stroke="#3E5A2A" strokeWidth={14} fill="none" transform={`rotate(${i * 6} 270 140)`} opacity={0} />
      ))}
      <g transform="translate(270 150) rotate(30)">
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M ${i * 16} 0 C ${i * 16 + 18} 20 ${i * 16 + 18} 50 ${i * 16} 70`} stroke="#9CC45A" strokeWidth={13} fill="none" strokeLinecap="round" />
        ))}
      </g>
      <Dots seed="sesame" cx={200} cy={200} spread={110} n={40} r={2.2} color="#FFF7E0" round={false} />
      <Dots seed="scal" cx={200} cy={200} spread={100} n={14} r={4} color="#5C9B42" />
    </>
  ),
  skewers: (id) => (
    <>
      <Board id={id} />
      {[-50, 10, 70].map((dy, k) => (
        <g key={k} transform={`translate(200 ${200 + dy}) rotate(-12)`}>
          <line x1={-150} y1={0} x2={150} y2={0} stroke="#D9B98A" strokeWidth={6} strokeLinecap="round" />
          {[-105, -70, -35, 0, 35, 70, 105].map((x, i) =>
            i % 2 === 0 ? <ChickenCube key={i} id={id} x={x} y={0} rot={(i * 13) % 20} glaze /> : <PineChunk key={i} x={x} y={0} rot={i * 9} />,
          )}
        </g>
      ))}
      <Herbs seed="sk" cx={200} cy={205} spread={260} n={10} size={0.8} />
    </>
  ),
  crabcakes: (id) => (
    <>
      <Plate id={id} />
      {[[150, 170], [250, 165], [200, 250]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x + 4} cy={y + 6} r={50} fill="rgba(60,30,10,0.25)" />
          <circle cx={x} cy={y} r={50} fill={`url(#${id}-fried)`} />
          <Dots seed={`cc${i}`} cx={x} cy={y} spread={40} n={22} r={2.4} color="#FFF8EA" round={false} />
          <circle cx={x - 6} cy={y - 8} r={9} fill="#FFF2DC" />
        </g>
      ))}
      <Herbs seed="ccm" cx={200} cy={205} spread={80} n={9} size={0.8} color="#6BA548" />
      <LimeWedge x={290} y={255} rot={40} s={0.9} />
    </>
  ),
  cornDip: (id) => (
    <>
      {Array.from({ length: 9 }).map((_, i) => {
        const a = (i / 9) * Math.PI * 2;
        return (
          <path
            key={i}
            d="M -34 22 L 0 -36 L 34 22 Z"
            fill="#E8C276"
            stroke="#C99A48"
            strokeWidth={2}
            transform={`translate(${200 + Math.cos(a) * 160} ${200 + Math.sin(a) * 160}) rotate(${(a * 180) / Math.PI + 90})`}
          />
        );
      })}
      <circle cx={210} cy={214} r={130} fill="rgba(0,0,0,0.35)" />
      <circle cx={200} cy={200} r={128} fill={`url(#${id}-iron)`} />
      <circle cx={200} cy={200} r={108} fill="#F2D27C" />
      <circle cx={200} cy={200} r={108} fill={`url(#${id}-fried)`} opacity={0.35} />
      <Dots seed="corn" cx={200} cy={200} spread={95} n={60} r={5.2} color="#F9C531" />
      <Dots seed="chili" cx={200} cy={200} spread={80} n={70} r={1.8} color="#B83A24" />
      <Herbs seed="cil" cx={200} cy={195} spread={110} n={10} size={0.8} />
      <Drizzle d="M 130 170 q 30 -20 60 0 t 60 0 t 30 10" color="#FFF8EA" />
    </>
  ),
  calamari: (id) => (
    <>
      <Plate id={id} />
      {Array.from({ length: 14 }).map((_, i) => {
        const a = random(`cala${i}`) * Math.PI * 2;
        const d = Math.sqrt(random(`cald${i}`)) * 92;
        return (
          <ellipse key={i} cx={190 + Math.cos(a) * d} cy={195 + Math.sin(a) * d} rx={26} ry={22} fill="none" stroke={`url(#${id}-fried)`} strokeWidth={13} />
        );
      })}
      <SauceCup x={288} y={282} color="#C9473A" s={0.75} />
      <LimeWedge x={112} y={280} rot={-35} s={0.85} />
      <Herbs seed="calh" cx={200} cy={200} spread={160} n={8} size={0.7} />
    </>
  ),
  fishTacos: (id) => (
    <>
      <Board id={id} />
      {[95, 200, 305].map((x, i) => (
        <g key={i} transform={`translate(${x} 205) rotate(${-8 + i * 8})`}>
          <ellipse cx={4} cy={8} rx={56} ry={120} fill="rgba(40,20,8,0.3)" />
          <ellipse cx={0} cy={0} rx={56} ry={120} fill="#EAC88A" />
          <Dots seed={`tor${i}`} cx={0} cy={0} spread={70} n={14} r={4} color="#C2955A" />
          <ellipse cx={0} cy={0} rx={30} ry={100} fill="#F7F3EA" />
          {[-70, -35, 0, 35, 70].map((y, k) => (
            <rect key={k} x={-22} y={y - 14} width={44} height={28} rx={12} fill={`url(#${id}-fried)`} transform={`rotate(${k * 17} 0 ${y})`} />
          ))}
          <Dots seed={`slaw${i}`} cx={0} cy={0} spread={60} n={30} r={3} color="#8B4C8C" round={false} />
          <Dots seed={`slawg${i}`} cx={0} cy={0} spread={60} n={22} r={3} color="#A9C66B" round={false} />
          <Drizzle d="M -14 -90 l 22 20 l -22 20 l 22 20 l -22 20 l 22 20 l -22 20 l 22 20 l -18 18" color="#FFF8EA" w={4} />
          <Herbs seed={`tacoh${i}`} cx={0} cy={0} spread={70} n={5} size={0.6} />
        </g>
      ))}
      <LimeWedge x={330} y={70} rot={200} s={0.9} />
    </>
  ),
  burger: (id) => (
    <>
      <Board id={id} />
      {Array.from({ length: 16 }).map((_, i) => (
        <rect
          key={i}
          x={-6}
          y={-46}
          width={13}
          height={92}
          rx={4}
          fill={i % 3 ? "#E9B65A" : "#D9973C"}
          transform={`translate(${300 + (random(`fx${i}`) - 0.5) * 70} ${270 + (random(`fy${i}`) - 0.5) * 80}) rotate(${random(`fr${i}`) * 180})`}
        />
      ))}
      <circle cx={178} cy={188} r={112} fill="rgba(30,15,5,0.4)" />
      {Array.from({ length: 9 }).map((_, i) => (
        <circle key={i} cx={168 + Math.cos(i * 0.7 + 2.2) * 100} cy={176 + Math.sin(i * 0.7 + 2.2) * 100} r={26} fill="#5E9B3E" />
      ))}
      <path d="M 250 230 L 300 262 L 262 292 Z" fill="#F2C14E" />
      <circle cx={92} cy={250} r={30} fill="none" stroke="#F6CE48" strokeWidth={14} />
      <circle cx={168} cy={176} r={108} fill={`url(#${id}-bun)`} />
      <Dots seed="sesame2" cx={168} cy={170} spread={80} n={40} r={3} color="#FFF4D8" round={false} />
      <path d="M 92 132 Q 150 90 220 112" stroke="rgba(255,240,210,0.45)" strokeWidth={10} fill="none" strokeLinecap="round" />
      <SauceCup x={300} y={110} color="#C9473A" s={0.7} />
    </>
  ),
  currySalmon: (id) => (
    <>
      <Bowl id={id} r={168} color="#E9E1D2" />
      <circle cx={200} cy={200} r={140} fill={`url(#${id}-curry)`} />
      <Rice cx={140} cy={225} r={58} seed="rcs" />
      <g transform="translate(232 175) rotate(-18)">
        <rect x={-70} y={-42} width={140} height={84} rx={28} fill={`url(#${id}-salmon)`} stroke="#B8532F" strokeWidth={2} />
        {[-45, -20, 5, 30, 55].map((x) => (
          <path key={x} d={`M ${x} -38 q 10 38 0 76`} stroke="#FBD9C2" strokeWidth={4} fill="none" opacity={0.85} />
        ))}
        <rect x={-70} y={-42} width={140} height={20} rx={10} fill="rgba(120,50,20,0.25)" />
      </g>
      <Herbs seed="csh" cx={230} cy={180} spread={60} n={6} size={0.8} />
      <Dots seed="cschili" cx={200} cy={200} spread={130} n={18} r={2.5} color="#C1442E" />
      <Drizzle d="M 110 140 q 20 -14 40 0" color="#FFF8EA" />
    </>
  ),
  mangoChicken: (id) => (
    <>
      <Plate id={id} />
      <Rice cx={150} cy={210} r={68} seed="rmc" />
      {[[235, 160, 10], [265, 215, -20], [220, 255, 40]].map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <ellipse rx={50} ry={36} fill={`url(#${id}-glaze)`} />
          <path d="M -30 -8 L 30 -16 M -26 10 L 32 2" stroke="rgba(80,30,10,0.5)" strokeWidth={4} strokeLinecap="round" />
          <ellipse rx={18} ry={8} cx={-12} cy={-16} fill="rgba(255,230,180,0.45)" />
        </g>
      ))}
      {[[150, 120], [118, 150], [175, 112]].map(([x, y], i) => (
        <rect key={i} x={x - 12} y={y - 12} width={24} height={24} rx={5} fill="#F8B12E" transform={`rotate(${i * 25} ${x} ${y})`} />
      ))}
      <Herbs seed="mch" cx={230} cy={210} spread={110} n={8} size={0.8} />
    </>
  ),
  steak: (id) => (
    <>
      <Board id={id} />
      <SteakSlices id={id} x={185} y={195} n={6} rot={-20} />
      <Herbs seed="stg" cx={290} cy={110} spread={70} n={10} size={1} color="#5E9B44" />
      <Drizzle d="M 90 300 q 40 -20 80 0 t 80 0" color="#3F6E35" w={6} />
      <SauceCup x={300} y={290} color="#4F7A35" s={0.7} />
    </>
  ),
  pokeBowl: (id) => (
    <>
      <Bowl id={id} r={168} color="#1F3B4A" />
      <Rice cx={200} cy={200} r={140} seed="rpb" />
      {Array.from({ length: 8 }).map((_, i) => (
        <rect key={i} x={140 + (i % 3) * 28} y={110 + Math.floor(i / 3) * 28} width={26} height={24} rx={5} fill="#C9394B" transform={`rotate(${i * 19} 170 140)`} />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <rect key={i} x={232 + (i % 2) * 30} y={180 + Math.floor(i / 2) * 28} width={28} height={24} rx={5} fill="#F8B12E" />
      ))}
      <g transform="translate(130 240) rotate(-20)">
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M ${i * 14} 0 C ${i * 14 + 16} 18 ${i * 14 + 16} 46 ${i * 14} 62`} stroke="#9CC45A" strokeWidth={12} fill="none" strokeLinecap="round" />
        ))}
      </g>
      <Dots seed="edam" cx={215} cy={285} spread={34} n={12} r={7} color="#78B04A" />
      <Dots seed="ses3" cx={200} cy={200} spread={130} n={36} r={2} color="#3A2A20" round={false} />
      <Drizzle d="M 120 150 q 30 -30 70 -10 t 80 20" color="#F29E6B" />
    </>
  ),
  shrimpPasta: (id) => (
    <>
      <Plate id={id} />
      {Array.from({ length: 26 }).map((_, i) => {
        const r = 30 + (i % 9) * 10;
        const a0 = random(`pa${i}`) * 360;
        return (
          <path
            key={i}
            d={`M ${200 + r} 200 A ${r} ${r * 0.9} 0 1 1 ${200 + r * Math.cos(5)} ${200 + r * Math.sin(5)}`}
            stroke={i % 2 ? "#F1D98F" : "#E8C66E"}
            strokeWidth={6}
            fill="none"
            transform={`rotate(${a0} 200 200)`}
          />
        );
      })}
      {[[150, 150, 40], [250, 160, 120], [265, 240, 200], [150, 250, -60], [205, 205, 10]].map(([x, y, r], i) => (
        <Shrimp key={i} id={id} x={x} y={y} rot={r} s={1.1} color="#F08A5D" />
      ))}
      <Herbs seed="pah" cx={200} cy={200} spread={150} n={14} size={0.7} color="#4F8E3B" />
      <Dots seed="pachili" cx={200} cy={200} spread={110} n={20} r={2} color="#C1442E" />
    </>
  ),
  jerkChicken: (id) => (
    <>
      <Plate id={id} />
      <Rice cx={145} cy={160} r={64} seed="rjc" beans />
      {[[240, 175, 20], [215, 255, -30]].map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <ellipse rx={66} ry={44} fill={`url(#${id}-char)`} />
          {[-34, -12, 10, 32].map((gx) => (
            <path key={gx} d={`M ${gx} -36 L ${gx + 14} 36`} stroke="rgba(20,8,2,0.65)" strokeWidth={6} strokeLinecap="round" />
          ))}
          <Dots seed={`jerk${i}`} cx={0} cy={0} spread={40} n={14} r={2} color="#C1442E" />
        </g>
      ))}
      {[[120, 255, 30], [150, 285, 10], [100, 222, 50]].map(([x, y, r], i) => (
        <ellipse key={i} cx={x} cy={y} rx={30} ry={15} fill="#E2A43C" stroke="#9A5A1E" strokeWidth={4} transform={`rotate(${r} ${x} ${y})`} />
      ))}
      <LimeWedge x={300} y={290} rot={40} s={0.8} />
    </>
  ),
  halibut: (id) => (
    <>
      <Plate id={id} />
      <ellipse cx={200} cy={205} rx={128} ry={110} fill="#F5E6A8" opacity={0.8} />
      <g transform="translate(200 195) rotate(-8)">
        <ellipse cx={6} cy={8} rx={98} ry={62} fill="rgba(90,60,20,0.25)" />
        <path d="M -100 -10 C -90 -60 70 -70 100 -20 C 110 20 80 60 -10 62 C -80 60 -106 30 -100 -10 Z" fill={`url(#${id}-halibut)`} stroke="#D2B98C" strokeWidth={2} />
        {[-60, -30, 0, 30, 60].map((x) => (
          <path key={x} d={`M ${x} -50 q 14 50 0 104`} stroke="rgba(200,170,120,0.35)" strokeWidth={3} fill="none" />
        ))}
      </g>
      <Herbs seed="hal" cx={200} cy={190} spread={60} n={6} size={0.9} color="#5E9B44" />
      <Dots seed="halcap" cx={200} cy={210} spread={120} n={14} r={5} color="#6B8E3A" />
      <LimeWheel x={300} y={100} s={0.7} color="#E2C24A" pith="#FFF6C8" flesh="#F6DE72" />
    </>
  ),
  surfTurf: (id) => (
    <>
      <Board id={id} />
      <SteakSlices id={id} x={140} y={190} n={5} rot={-14} />
      {[[270, 140, 40], [290, 210, 90], [262, 280, 140]].map(([x, y, r], i) => (
        <Shrimp key={i} id={id} x={x} y={y} rot={r} s={1.5} color="#F08A5D" />
      ))}
      <Herbs seed="sth" cx={200} cy={200} spread={220} n={12} size={0.8} />
      <LimeWedge x={330} y={320} rot={-150} s={0.8} />
    </>
  ),
  cremeBrulee: (id) => (
    <>
      <Plate id={id} r={160} />
      <circle cx={208} cy={210} r={112} fill="rgba(60,30,10,0.22)" />
      <circle cx={200} cy={200} r={110} fill="#FBF8F2" stroke="#E5DCCB" strokeWidth={3} />
      {Array.from({ length: 36 }).map((_, i) => (
        <line key={i} x1={200 + 104 * Math.cos((i / 36) * Math.PI * 2)} y1={200 + 104 * Math.sin((i / 36) * Math.PI * 2)} x2={200 + 110 * Math.cos((i / 36) * Math.PI * 2)} y2={200 + 110 * Math.sin((i / 36) * Math.PI * 2)} stroke="#E5DCCB" strokeWidth={2} />
      ))}
      <circle cx={200} cy={200} r={92} fill={`url(#${id}-caramel)`} />
      <path d="M 140 170 L 190 205 L 240 180 M 190 205 L 205 260 M 190 205 L 150 240" stroke="rgba(255,225,160,0.55)" strokeWidth={2.5} fill="none" />
      <path d="M 140 150 Q 170 128 210 134" stroke="rgba(255,240,200,0.55)" strokeWidth={8} fill="none" strokeLinecap="round" />
      <Dots seed="coco" cx={235} cy={225} spread={26} n={10} r={3} color="#FFFBF2" round={false} />
      <Leaf x={232} y={230} rot={-40} s={1.3} color="#5E9B44" />
    </>
  ),
  cheesecake: (id) => (
    <>
      <Plate id={id} r={160} />
      <g transform="translate(200 210) rotate(-20)">
        <path d="M 0 -120 L 92 76 Q 0 108 -92 76 Z" fill="rgba(60,30,10,0.25)" transform="translate(8 10)" />
        <path d="M 0 -120 L 92 76 Q 0 108 -92 76 Z" fill="#FFF3D6" />
        <path d="M -92 76 Q 0 108 92 76 L 84 60 Q 0 90 -84 60 Z" fill="#C48A48" />
        <path d="M 0 -120 L 70 30 Q 0 56 -70 30 Z" fill="#F7B034" />
        <path d="M 0 -120 L 70 30 Q 0 56 -70 30 Z" fill="url(#none)" stroke="#E79A1E" strokeWidth={2} />
        <path d="M -20 -40 Q 0 -54 18 -40" stroke="rgba(255,240,190,0.7)" strokeWidth={5} fill="none" strokeLinecap="round" />
      </g>
      <Dots seed="zest" cx={205} cy={200} spread={50} n={16} r={2.4} color="#7DB043" round={false} />
      <LimeWheel x={300} y={290} s={0.65} />
      <Leaf x={130} y={280} rot={-30} s={1.2} color="#5E9B44" />
    </>
  ),
  upsideDown: (id) => (
    <>
      <Plate id={id} />
      <circle cx={208} cy={210} r={130} fill="rgba(60,30,10,0.25)" />
      <circle cx={200} cy={200} r={128} fill={`url(#${id}-caramel)`} />
      {[[200, 200], [200, 118], [271, 159], [271, 241], [200, 282], [129, 241], [129, 159]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={36} fill="none" stroke="#F6CE48" strokeWidth={18} />
          <circle cx={x} cy={y} r={36} fill="none" stroke="rgba(160,90,20,0.35)" strokeWidth={2} />
          <circle cx={x} cy={y} r={13} fill="#B8202E" />
          <circle cx={x - 4} cy={y - 4} r={4} fill="rgba(255,255,255,0.6)" />
        </g>
      ))}
    </>
  ),
  tart: (id) => (
    <>
      <Plate id={id} />
      <circle cx={208} cy={210} r={132} fill="rgba(60,30,10,0.25)" />
      {Array.from({ length: 28 }).map((_, i) => {
        const a = (i / 28) * Math.PI * 2;
        return <circle key={i} cx={200 + Math.cos(a) * 120} cy={200 + Math.sin(a) * 120} r={14} fill="#D69A55" />;
      })}
      <circle cx={200} cy={200} r={120} fill="#D69A55" />
      <circle cx={200} cy={200} r={104} fill="#F6CB45" />
      <circle cx={200} cy={200} r={104} fill={`url(#${id}-curry)`} opacity={0.4} />
      {Array.from({ length: 22 }).map((_, i) => {
        const a = random(`ps${i}`) * Math.PI * 2;
        const d = Math.sqrt(random(`psd${i}`)) * 80;
        const x = 200 + Math.cos(a) * d;
        const y = 200 + Math.sin(a) * d;
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={7} fill="#F2B21E" opacity={0.85} />
            <circle cx={x} cy={y} r={3.5} fill="#2A1A10" />
          </g>
        );
      })}
      <Leaf x={250} y={140} rot={-60} s={1.3} color="#5E9B44" />
      <Leaf x={240} y={150} rot={10} s={1.1} color="#6BA548" />
    </>
  ),
};

/** Renders a dish illustration filling its container (square). */
export const Dish: React.FC<{ kind: DishKind; style?: React.CSSProperties }> = ({ kind, style }) => {
  const id = useUid();
  return (
    <svg viewBox="0 0 400 400" style={{ width: "100%", height: "100%", overflow: "visible", ...style }}>
      <Defs id={id} />
      {dishes[kind](id)}
    </svg>
  );
};
