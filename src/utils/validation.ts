// utils/validation.ts

export function validateEmail(email: string): boolean {
  // Validation simple de l'email
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
