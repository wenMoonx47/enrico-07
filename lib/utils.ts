import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind class names safely (handles conflicts). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Generate a short random commit hash for decorative use in the timeline. */
export function shortHash(): string {
  return Math.random().toString(16).slice(2, 9);
}

/** Format a date range for display. */
export function formatDateRange(start: string, end: string | null): string {
  return end ? `${start} – ${end}` : `${start} – Present`;
}
