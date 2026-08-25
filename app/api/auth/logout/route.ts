import {NextResponse} from "next/server";
import {clearAuthCookies} from "@/lib/auth/server";

export async function POST() {
  const response = NextResponse.json({signedOut: true});
  clearAuthCookies(response);
  return response;
}
