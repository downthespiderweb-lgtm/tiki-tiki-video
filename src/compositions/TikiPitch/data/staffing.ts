/**
 * Proposed staffing — PROPOSED ASSUMPTIONS requiring validation.
 * Headcounts are illustrative planning ranges, not approved numbers; wages are not established.
 */
export type Role = { title: string; area: Area; headcount: string };
export type Area = "Management" | "Kitchen" | "Bar" | "Service" | "Entertainment";

export const ROLES: Role[] = [
  { title: "General Manager", area: "Management", headcount: "1" },
  { title: "Head Chef / Kitchen Lead", area: "Kitchen", headcount: "1" },
  { title: "Line & Prep Cooks", area: "Kitchen", headcount: "6–8" },
  { title: "Dish & Kitchen Support", area: "Kitchen", headcount: "2–3" },
  { title: "Bartenders", area: "Bar", headcount: "4–5" },
  { title: "Servers", area: "Service", headcount: "8–10" },
  { title: "Hosts", area: "Service", headcount: "2–3" },
  { title: "Bussers & Food Runners", area: "Service", headcount: "3–4" },
  { title: "Live Musicians", area: "Entertainment", headcount: "As booked" },
];

export const PIPELINE = [
  {
    stage: "Recruit",
    icon: "megaphone" as const,
    items: ["Culinary schools", "Hospitality job boards", "Employee referrals", "Local networks & community groups"],
  },
  {
    stage: "Select",
    icon: "clipboard" as const,
    items: ["Clear job descriptions", "Structured interviews", "Skill assessments", "References & qualifications"],
  },
  {
    stage: "Train",
    icon: "book" as const,
    items: ["Menu knowledge", "Food safety & sanitation", "Service & teamwork", "Safety & responsible alcohol service"],
  },
  {
    stage: "Retain",
    icon: "heart" as const,
    items: ["Fair scheduling", "Respectful management", "Cross-training & growth", "Clear expectations & culture"],
  },
];
