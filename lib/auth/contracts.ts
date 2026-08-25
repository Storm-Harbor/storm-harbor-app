export const SESSION_COOKIE = "storm_harbor_session";
export const MFA_CHALLENGE_COOKIE = "storm_harbor_mfa_challenge";

export type AuthLanguage = "de" | "en" | "es" | "fr" | "it" | "pt" | "ru";

const languageByLocale: Record<string, AuthLanguage> = {
  "ca-ES": "es",
  "de-DE": "de",
  "en-GB": "en",
  "en-US": "en",
  "es-ES": "es",
  "fr-FR": "fr",
  "it-IT": "it",
  "pt-BR": "pt",
  "pt-PT": "pt",
  "ru-RU": "ru",
};

export type AuthenticatedSession = {
  accessToken: string;
  expiresAt: number;
  mfaRequired: false;
  tokenType: string;
};

export type MfaChallenge = {
  challengeId: string;
  expiresAt: string;
  mfaRequired: true;
};

export function authLanguageForLocale(locale: string): AuthLanguage {
  return languageByLocale[locale] ?? "en";
}

export function isMfaChallenge(value: unknown): value is MfaChallenge {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<MfaChallenge>;
  return candidate.mfaRequired === true
    && typeof candidate.challengeId === "string"
    && typeof candidate.expiresAt === "string";
}

export function isAuthenticatedSession(value: unknown): value is AuthenticatedSession {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<AuthenticatedSession>;
  return candidate.mfaRequired === false
    && typeof candidate.accessToken === "string"
    && typeof candidate.expiresAt === "number"
    && candidate.tokenType === "Bearer";
}

export function safeReturnTo(value: unknown): string {
  return value === "/console" ? value : "/console";
}
