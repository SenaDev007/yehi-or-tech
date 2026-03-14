/**
 * Auth backoffice — JWT (délégué à auth-jwt) + bcrypt pour mots de passe.
 * Utiliser auth-jwt dans le middleware (Edge), auth.ts dans les API routes (Node).
 * CDC v1.4
 */

import bcrypt from "bcryptjs";
import {
  signToken,
  verifyToken,
  getTokenFromCookie,
  getUserFromCookie,
  getCookieName,
  getCookieOptions,
  type JwtPayload,
} from "./auth-jwt";

export type { JwtPayload };
export {
  signToken,
  verifyToken,
  getTokenFromCookie,
  getUserFromCookie,
  getCookieName,
  getCookieOptions,
};

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  plain: string,
  hashed: string
): Promise<boolean> {
  return bcrypt.compare(plain, hashed);
}

const ROLE_ORDER: Record<string, number> = {
  LECTEUR: 0,
  EDITEUR: 1,
  ADMIN: 2,
  SUPER_ADMIN: 3,
};

/**
 * Vérifie que l'utilisateur a au moins le rôle requis (EDITEUR = écriture, etc.).
 * CDC v1.4 — rôles : LECTEUR (lecture seule), EDITEUR, ADMIN, SUPER_ADMIN.
 */
export function requireMinRole(
  user: JwtPayload | null,
  minRole: keyof typeof ROLE_ORDER
): boolean {
  if (!user) return false;
  const userLevel = ROLE_ORDER[user.role] ?? -1;
  const requiredLevel = ROLE_ORDER[minRole] ?? 0;
  return userLevel >= requiredLevel;
}

/**
 * Vérifie que l'utilisateur a l'un des rôles autorisés (ex. gestion des utilisateurs).
 */
export function requireRole(
  user: JwtPayload | null,
  allowedRoles: string[]
): boolean {
  if (!user) return false;
  return allowedRoles.includes(user.role);
}
