/**
 * Preliminary project estimates (from the brief) and values derived from them.
 * These are NOT verified financial statements, supplier quotes or proof of profit.
 */
export const EST = {
  squareFeet: 3000,
  sales: 1_500_000,
  beverageSales: 450_000,
  rent: 200_000,
  insurance: 3_500,
  managerSalary: 52_000,
  licenses: 3_000,
  posAccounting: 2_000,
  food: 480_000,
  labor: 547_500,
  alcohol: 112_500,
  utilities: 60_000,
  paymentProcessing: 45_000,
} as const;

export type CostLine = { key: keyof typeof EST; label: string; amount: number; basis: string };

export const COSTS: CostLine[] = [
  { key: "labor", label: "Labor", amount: EST.labor, basis: "36.5% of sales" },
  { key: "food", label: "Food cost", amount: EST.food, basis: "32% of sales" },
  { key: "rent", label: "Rent", amount: EST.rent, basis: "fixed, annual" },
  { key: "alcohol", label: "Alcohol cost", amount: EST.alcohol, basis: "25% of beverage sales" },
  { key: "utilities", label: "Utilities", amount: EST.utilities, basis: "4% of sales" },
  { key: "managerSalary", label: "Manager salary", amount: EST.managerSalary, basis: "annual" },
  { key: "paymentProcessing", label: "Card processing", amount: EST.paymentProcessing, basis: "3% of sales" },
  { key: "insurance", label: "Insurance", amount: EST.insurance, basis: "annual" },
  { key: "licenses", label: "Licenses", amount: EST.licenses, basis: "annual" },
  { key: "posAccounting", label: "POS & accounting", amount: EST.posAccounting, basis: "annual" },
];

export const TOTAL_LISTED = COSTS.reduce((s, c) => s + c.amount, 0); // 1,505,500
export const REMAINDER = EST.sales - TOTAL_LISTED; // -5,500
export const REMAINDER_IF_MANAGER_IN_LABOR = REMAINDER + EST.managerSalary; // 46,500
export const FOOD_SALES = EST.sales - EST.beverageSales; // 1,050,000
export const FOOD_COST_OF_FOOD_SALES = EST.food / FOOD_SALES; // 45.7%
export const PRIME_COST = EST.food + EST.alcohol + EST.labor; // 1,140,000 (76% of sales)

// Guard against accidental edits: the brief's percentages must still hold.
const check = (cond: boolean, msg: string) => {
  if (!cond) throw new Error(`Financial data inconsistency: ${msg}`);
};
check(TOTAL_LISTED === 1_505_500, "listed total");
check(EST.food === EST.sales * 0.32, "food 32%");
check(EST.labor === EST.sales * 0.365, "labor 36.5%");
check(EST.alcohol === EST.beverageSales * 0.25, "alcohol 25% of beverage sales");
check(EST.utilities === EST.sales * 0.04, "utilities 4%");
check(EST.paymentProcessing === EST.sales * 0.03, "processing 3%");

export const usd = (n: number) =>
  `${n < 0 ? "−" : ""}$${Math.abs(Math.round(n)).toLocaleString("en-US")}`;
export const usdShort = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 2).replace(/0$/, "")}M` : `$${Math.round(n / 1000)}K`;
