import "server-only";

import {randomUUID} from "node:crypto";
import type {NextRequest, NextResponse} from "next/server";
import {MFA_CHALLENGE_COOKIE, SESSION_COOKIE} from "./contracts";

type AuthApiResult = {
  body: unknown;
  ok: boolean;
  status: number;
};

function authApiUrl(path: string) {
  const configuredUrl = process.env.AUTH_API_URL;
  if (!configuredUrl) throw new Error("AUTH_API_URL is not configured");

  const baseUrl = new URL(configuredUrl);
  if (!new Set(["http:", "https:"]).has(baseUrl.protocol)) {
    throw new Error("AUTH_API_URL must use HTTP or HTTPS");
  }
  if (process.env.NODE_ENV === "production" && baseUrl.protocol !== "https:") {
    throw new Error("AUTH_API_URL must use HTTPS in production");
  }

  return new URL(path, `${baseUrl.toString().replace(/\/$/, "")}/`);
}

export async function callAuthApi(
  request: NextRequest,
  path: string,
  body: unknown,
): Promise<AuthApiResult> {
  const requestId = request.headers.get("x-request-id") ?? randomUUID();
  const correlationId = request.headers.get("x-correlation-id") ?? requestId;
  const response = await fetch(authApiUrl(path), {
    method: "POST",
    cache: "no-store",
    headers: {
      "accept": "application/json",
      "accept-language": request.headers.get("accept-language") ?? "en",
      "content-type": "application/json",
      "x-client-id": "storm-harbor-app",
      "x-correlation-id": correlationId,
      "x-request-id": requestId,
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(10_000),
  });

  const responseBody = response.status === 204
    ? null
    : await response.json().catch(() => null);

  return {body: responseBody, ok: response.ok, status: response.status};
}

const secureCookie = process.env.NODE_ENV === "production";

export function setSessionCookie(response: NextResponse, accessToken: string, expiresAt: number) {
  const nowInSeconds = Math.floor(Date.now() / 1000);
  response.cookies.set(SESSION_COOKIE, accessToken, {
    httpOnly: true,
    maxAge: Math.max(0, expiresAt - nowInSeconds),
    path: "/",
    sameSite: "strict",
    secure: secureCookie,
  });
}

export function setMfaChallengeCookie(response: NextResponse, challengeId: string, expiresAt: string) {
  const expiry = new Date(expiresAt);
  response.cookies.set(MFA_CHALLENGE_COOKIE, challengeId, {
    expires: Number.isNaN(expiry.valueOf()) ? new Date(Date.now() + 5 * 60_000) : expiry,
    httpOnly: true,
    path: "/api/auth/mfa",
    sameSite: "strict",
    secure: secureCookie,
  });
}

export function clearAuthCookies(response: NextResponse) {
  response.cookies.set(SESSION_COOKIE, "", {expires: new Date(0), httpOnly: true, path: "/"});
  response.cookies.set(MFA_CHALLENGE_COOKIE, "", {expires: new Date(0), httpOnly: true, path: "/api/auth/mfa"});
}
