import React from "react";

/** Original line-icon set (24×24 grid, stroke-based) used for guests, staffing and labels. */
const PATHS = {
  cap: "M2 9l10-5 10 5-10 5-10-5z M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5 M22 9v6",
  briefcase: "M3 8h18v11H3z M8 8V5h8v3 M3 13h18",
  heart: "M12 20s-7-4.5-9-9c-1.2-2.8.8-6 4-6 2 0 3.5 1.2 5 3 1.5-1.8 3-3 5-3 3.2 0 5.2 3.2 4 6-2 4.5-9 9-9 9z",
  users: "M9 11a3.5 3.5 0 100-7 3.5 3.5 0 000 7z M2 20c0-3.5 3-6 7-6s7 2.5 7 6 M16 4.5a3.5 3.5 0 010 6.5 M18 14c2.4.6 4 2.8 4 6",
  home: "M3 11l9-7 9 7 M5 10v10h14V10 M10 20v-5h4v5",
  camera: "M3 8h4l2-3h6l2 3h4v11H3z M12 17a4 4 0 100-8 4 4 0 000 8z",
  music: "M9 18V5l11-2v13 M9 18a3 3 0 11-6 0 3 3 0 016 0z M20 16a3 3 0 11-6 0 3 3 0 016 0z",
  sun: "M12 16a4 4 0 100-8 4 4 0 000 8z M12 2v2 M12 20v2 M4.9 4.9l1.4 1.4 M17.7 17.7l1.4 1.4 M2 12h2 M20 12h2 M4.9 19.1l1.4-1.4 M17.7 6.3l1.4-1.4",
  cocktail: "M4 4h16l-8 9z M12 13v7 M8 20h8 M15 4l3-2",
  chat: "M4 5h16v10H9l-5 4z M8 9h8 M8 12h5",
  sparkle: "M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z M19 3v4 M17 5h4",
  share: "M18 8a3 3 0 100-6 3 3 0 000 6z M6 15a3 3 0 100-6 3 3 0 000 6z M18 22a3 3 0 100-6 3 3 0 000 6z M8.6 13.5l6.8 4 M15.4 6.5l-6.8 4",
  fork: "M7 3v8 M4 3v5a3 3 0 006 0V3 M7 11v10 M17 3c-2 0-3 3-3 7h3v11",
  chef: "M7 18h10v3H7z M7 18v-4.5A4 4 0 015 6a4 4 0 017-2 4 4 0 017 2 4 4 0 01-2 7.5V18",
  megaphone: "M3 10v4h4l7 4V6l-7 4z M17 9a4 4 0 010 6 M7 14l1.5 5h2.5l-1-5",
  clipboard: "M8 4h8v3H8z M6 5H5v16h14V5h-1 M8 12l2.5 2.5L16 9",
  book: "M4 4h6a2 2 0 012 2v14a2 2 0 00-2-2H4z M20 4h-6a2 2 0 00-2 2v14a2 2 0 012-2h6z",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z M8.5 12l2.5 2.5 4.5-5",
  calendar: "M4 6h16v15H4z M4 10h16 M8 3v5 M16 3v5 M8 14h3 M13 14h3 M8 17h3",
  trending: "M3 17l6-6 4 4 8-8 M15 7h6v6",
  alert: "M12 3l10 18H2z M12 10v5 M12 18v.5",
  search: "M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z M16 16l5 5",
  star: "M12 3l2.8 5.8 6.2.9-4.5 4.4 1 6.2-5.5-3-5.5 3 1-6.2L3 9.7l6.2-.9z",
  leaf: "M5 19c0-8 6-14 15-14 0 9-6 15-14 15 M5 19l8-8",
  wave: "M2 12c2.5-3 5-3 7.5 0s5 3 7.5 0 3.5-2.5 5 0 M2 17c2.5-3 5-3 7.5 0s5 3 7.5 0 3.5-2.5 5 0",
  check: "M4 12.5l5 5L20 6",
  id: "M3 5h18v14H3z M9 13a2.5 2.5 0 100-5 2.5 2.5 0 000 5z M5.5 17c.5-2 2-3 3.5-3s3 1 3.5 3 M14 9h4 M14 13h4",
  handshake: "M2 12l4-4 4 2 3-2 4 1 5 3 M2 12l6 6c1 1 2 1 3 0l1-1 M22 12l-6 6c-1 1-2 1-3 0 M10 10l4 4",
  pin: "M12 21s7-6.5 7-12a7 7 0 00-14 0c0 5.5 7 12 7 12z M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
  plane: "M2 14l20-8-6 15-4-6z M12 15l4-9",
  wine: "M7 3h10c0 5-2 8-5 8s-5-3-5-8z M12 11v9 M8 20h8",
  beer: "M5 7h11v14H5z M16 10h3v7h-3 M5 7c0-2 2-3 4-3 1-1 4-1 5 1 2 0 2 2 2 2",
  zero: "M12 21a8 8 0 100-16 8 8 0 000 16z M6.5 18.5L17.5 7.5",
  dollar: "M12 3v18 M16.5 7.5c-.5-1.5-2-2.5-4.5-2.5-3 0-4.5 1.5-4.5 3.5 0 4.5 9.5 2.5 9.5 7 0 2-1.8 3.5-5 3.5-2.5 0-4.3-1-5-3",
  tool: "M14 6a4 4 0 015 5l-2 1-8 8-3-3 8-8z",
  box: "M3 7l9-4 9 4v10l-9 4-9-4z M3 7l9 4 9-4 M12 11v10",
  trash: "M4 6h16 M9 6V4h6v2 M6 6l1 14h10l1-14",
  receipt: "M6 2h12v20l-3-2-3 2-3-2-3 2z M9 7h6 M9 11h6 M9 15h4",
  growth: "M4 20V10 M10 20V4 M16 20v-7 M22 20H2",
  bar: "M4 21V8l8-5 8 5v13 M4 12h16 M9 21v-5h6v5",
} as const;

export type IconName = keyof typeof PATHS;

export const Icon: React.FC<{ name: IconName; size?: number; color?: string; stroke?: number; style?: React.CSSProperties }> = ({
  name,
  size = 48,
  color = "currentColor",
  stroke = 1.6,
  style,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d={PATHS[name]} />
  </svg>
);
