import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind classes cleanly with clsx and twMerge.
 * 
 * TypeScript breakdown:
 * - `ClassValue[]`: A variadic list of strings, arrays, objects, or falsy values.
 * - Returns a consolidated string of class names.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
