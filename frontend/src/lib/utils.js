import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(date) {
  if (!date) return "";
  try {
    const d = new Date(date);
    return d.toLocaleString("default", { month: "short", year: "numeric" });
  } catch {
    return date;
  }
}

export function formatDateLong(date) {
  if (!date) return "";
  try {
    const d = new Date(date);
    return d.toLocaleString("default", { month: "long", year: "numeric" });
  } catch {
    return date;
  }
}
