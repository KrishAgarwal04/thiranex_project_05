import { Product } from './types';

// Format currency to INR style: ₹14,999
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
}

// Safe Local Storage Wrapper
export const storage = {
  get: <T>(key: string): T | null => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error(`Error reading key "${key}" from localStorage:`, e);
      return null;
    }
  },
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error writing key "${key}" to localStorage:`, e);
    }
  },
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error(`Error deleting key "${key}" from localStorage:`, e);
    }
  }
};

// Simple debounce function
export function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return function(this: any, ...args: Parameters<T>) {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

// Fuzzy string matching (checks if all search query terms match anywhere in a target string)
export function fuzzyMatch(target: string, query: string): boolean {
  const normTarget = target.toLowerCase();
  const normQuery = query.toLowerCase().trim();
  if (!normQuery) return true;
  
  const queryTerms = normQuery.split(/\s+/);
  return queryTerms.every(term => normTarget.includes(term));
}
