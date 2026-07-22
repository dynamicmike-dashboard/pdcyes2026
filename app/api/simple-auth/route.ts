import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (!password) {
    return NextResponse.json({ error: "Password required" }, { status: 400 });
  }

  // Compute hash of supplied password
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashHex = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // Compute expected hash from env var
  const expectedHashBuffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(process.env.MANAGE_PASSWORD ?? "")
  );
  const expectedHex = Array.from(new Uint8Array(expectedHashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  if (hashHex !== expectedHex) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  // Set cookie with the hash (httpOnly, sameSite lax, 1 week)
  const cookieName = process.env.MANAGE_COOKIE_NAME ?? "manage_session";
  const cookieOptions = {
    name: cookieName,
    value: hashHex,
    httpOnly: true,
    path: "/",
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 7, // 1 week
  };

  const res = NextResponse.json({ success: true });
  cookies().set(cookieOptions);
  return res;
}

// Optional logout endpoint (GET ?action=logout)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  if (searchParams.get("action") === "logout") {
    const cookieName = process.env.MANAGE_COOKIE_NAME ?? "manage_session";
    const res = NextResponse.json({ success: true });
    res.cookies.set(cookieName, "", { path: "/", maxAge: 0 });
    return res;
  }
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}