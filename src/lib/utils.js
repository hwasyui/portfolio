import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

// merges tailwind classes and resolves conflicts
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
