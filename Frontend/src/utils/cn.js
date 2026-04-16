import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Merges Tailwind classes safely — no conflicting duplicates
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
