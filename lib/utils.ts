import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** This is just a shadcn (frontend UI library) utility function to merge styles */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
