import assert from "node:assert/strict";
import test from "node:test";
import {
  authLanguageForLocale,
  isAuthenticatedSession,
  isMfaChallenge,
  safeReturnTo,
} from "../lib/auth/contracts.ts";

test("maps UI locales to api-auth base languages", () => {
  assert.equal(authLanguageForLocale("pt-BR"), "pt");
  assert.equal(authLanguageForLocale("ca-ES"), "es");
  assert.equal(authLanguageForLocale("unknown"), "en");
});

test("recognises only complete MFA challenges", () => {
  assert.equal(isMfaChallenge({mfaRequired: true, challengeId: "challenge", expiresAt: "2026-08-23T10:00:00Z"}), true);
  assert.equal(isMfaChallenge({mfaRequired: true, challengeId: "challenge"}), false);
});

test("recognises only complete bearer sessions", () => {
  assert.equal(isAuthenticatedSession({mfaRequired: false, accessToken: "token", expiresAt: 1, tokenType: "Bearer"}), true);
  assert.equal(isAuthenticatedSession({mfaRequired: false, accessToken: "token", expiresAt: 1, tokenType: "Basic"}), false);
});

test("rejects untrusted post-login redirects", () => {
  assert.equal(safeReturnTo("https://example.com"), "/console");
  assert.equal(safeReturnTo("/console"), "/console");
});
