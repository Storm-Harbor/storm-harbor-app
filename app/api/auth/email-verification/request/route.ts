import {NextRequest, NextResponse} from "next/server";
import {callAuthApi} from "@/lib/auth/server";

export async function POST(request: NextRequest) {
  const input = await request.json().catch(() => null) as {email?: unknown} | null;
  if (typeof input?.email !== "string") {
    return NextResponse.json({code: "INVALID_REQUEST"}, {status: 400});
  }

  try {
    const result = await callAuthApi(request, "/v1/auth/email-verification/request", {
      email: input.email.trim().toLowerCase(),
    });
    if (!result.ok) {
      return NextResponse.json(
        {code: result.status === 429 ? "RATE_LIMITED" : "VERIFICATION_REQUEST_FAILED"},
        {status: result.status},
      );
    }
    return NextResponse.json({accepted: true}, {status: 202});
  } catch {
    return NextResponse.json({code: "AUTH_UNAVAILABLE"}, {status: 503});
  }
}
