import {NextRequest, NextResponse} from "next/server";
import {isAuthenticatedSession, isMfaChallenge} from "@/lib/auth/contracts";
import {callAuthApi, setMfaChallengeCookie, setSessionCookie} from "@/lib/auth/server";

type LoginInput = {email?: unknown; password?: unknown};

function errorCodeFor(status: number) {
  if (status === 401) return "INVALID_CREDENTIALS";
  if (status === 403) return "EMAIL_NOT_VERIFIED";
  if (status === 429) return "RATE_LIMITED";
  return "AUTH_FAILED";
}

export async function POST(request: NextRequest) {
  const input = await request.json().catch(() => null) as LoginInput | null;
  if (typeof input?.email !== "string" || typeof input.password !== "string") {
    return NextResponse.json({code: "INVALID_REQUEST"}, {status: 400});
  }

  try {
    const result = await callAuthApi(request, "/v1/auth/login", {
      email: input.email.trim().toLowerCase(),
      provider: "LOCAL",
      secret: input.password,
    });

    if (!result.ok) {
      return NextResponse.json({code: errorCodeFor(result.status)}, {status: result.status});
    }

    if (isMfaChallenge(result.body)) {
      const response = NextResponse.json({next: "mfa"});
      setMfaChallengeCookie(response, result.body.challengeId, result.body.expiresAt);
      return response;
    }

    if (!isAuthenticatedSession(result.body)) {
      return NextResponse.json({code: "INVALID_AUTH_RESPONSE"}, {status: 502});
    }

    const response = NextResponse.json({next: "console"});
    setSessionCookie(response, result.body.accessToken, result.body.expiresAt);
    return response;
  } catch {
    return NextResponse.json({code: "AUTH_UNAVAILABLE"}, {status: 503});
  }
}
