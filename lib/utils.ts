import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import isEqual from "lodash/isEqual";

export const getStatusForArrays = (original: any[], current: any[]): boolean => {
  if (original.length !== current.length) return false;

  const isSame = current.every((currentEl) => {
    const originalEl = original.find((o) => o.id === currentEl.id);
    return originalEl && isEqual(originalEl, currentEl);
  });

  return isSame ? true : false;
};
