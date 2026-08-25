import {NextRequest, NextResponse} from "next/server";
import {authLanguageForLocale} from "@/lib/auth/contracts";
import {callAuthApi} from "@/lib/auth/server";

type RegistrationInput = {
  email?: unknown;
  locale?: unknown;
  password?: unknown;
  recoveryEmail?: unknown;
};

function errorCodeFor(status: number) {
  if (status === 409) return "IDENTITY_EXISTS";
  if (status === 422 || status === 400) return "INVALID_REGISTRATION";
  if (status === 429) return "RATE_LIMITED";
  return "REGISTRATION_FAILED";
}

export async function POST(request: NextRequest) {
  const input = await request.json().catch(() => null) as RegistrationInput | null;
  if (
    typeof input?.email !== "string"
    || typeof input.password !== "string"
    || typeof input.recoveryEmail !== "string"
  ) {
    return NextResponse.json({code: "INVALID_REQUEST"}, {status: 400});
  }

  try {
    const result = await callAuthApi(request, "/v1/auth/registrations/personal", {
      email: input.email.trim().toLowerCase(),
      language: authLanguageForLocale(typeof input.locale === "string" ? input.locale : "en-GB"),
      provider: "LOCAL",
      recoveryEmail: input.recoveryEmail.trim().toLowerCase(),
      secret: input.password,
    });

    if (!result.ok) {
      return NextResponse.json({code: errorCodeFor(result.status)}, {status: result.status});
    }

    return NextResponse.json({next: "verify-email"}, {status: 201});
  } catch {
    return NextResponse.json({code: "AUTH_UNAVAILABLE"}, {status: 503});
  }
}
