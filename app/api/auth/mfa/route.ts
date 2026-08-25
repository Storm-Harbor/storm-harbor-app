import {NextRequest, NextResponse} from "next/server";
import {isAuthenticatedSession, MFA_CHALLENGE_COOKIE} from "@/lib/auth/contracts";
import {callAuthApi, clearAuthCookies, setSessionCookie} from "@/lib/auth/server";

export async function POST(request: NextRequest) {
  const input = await request.json().catch(() => null) as {code?: unknown} | null;
  const challengeId = request.cookies.get(MFA_CHALLENGE_COOKIE)?.value;
  if (typeof input?.code !== "string" || !challengeId) {
    return NextResponse.json({code: "INVALID_MFA_CHALLENGE"}, {status: 400});
  }

  try {
    const result = await callAuthApi(request, "/v1/auth/mfa/challenge/verify", {
      challengeId,
      code: input.code.trim(),
    });

    if (!result.ok) {
      return NextResponse.json(
        {code: result.status === 429 ? "RATE_LIMITED" : "INVALID_MFA_CODE"},
        {status: result.status},
      );
    }

    if (!isAuthenticatedSession(result.body)) {
      return NextResponse.json({code: "INVALID_AUTH_RESPONSE"}, {status: 502});
    }

    const response = NextResponse.json({next: "console"});
    clearAuthCookies(response);
    setSessionCookie(response, result.body.accessToken, result.body.expiresAt);
    return response;
  } catch {
    return NextResponse.json({code: "AUTH_UNAVAILABLE"}, {status: 503});
  }
}
