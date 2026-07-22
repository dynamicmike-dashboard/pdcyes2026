// middleware.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(req: Request) {
  const { pathname } = new URL(req.url);

  // Allow access to the login page itself
  if (!pathname.startsWith("/manage") || pathname === "/manage") {
    return NextResponse.next();
  }

  // Read the cookie that we set after a successful password login
  const cookieStore = await cookies();
  const token = cookieStore.get(
    process.env.MANAGE_COOKIE_NAME ?? "manage_session"
  )?.value;

  // Compute expected hash of the password (SHA‑256)
  const encoder = new TextEncoder();
  const pwdBytes = encoder.encode(process.env.MANAGE_PASSWORD ?? "");
  const hashBuffer = await crypto.subtle.digest("SHA-256", pwdBytes);
  const expectedHex = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  if (token === expectedHex) {
    // Valid session – let the request through
    return NextResponse.next();
  }

  // Not authenticated → redirect to the login page
  const loginUrl = new URL("/manage", req.url);
  loginUrl.searchParams.set("redirect", pathname);
  return NextResponse.redirect(loginUrl);
}