import { cookies } from "next/headers";
import { auth } from "@/lib/auth";

export const COOKIE_NAME = process.env.MANAGE_COOKIE_NAME ?? "manage_session";

export async function isUserAuthenticated(): Promise<boolean> {
  // 1. Check NextAuth session
  try {
    const session = (await auth()) as any;
    if (session?.user || session?.accessToken) {
      return true;
    }
  } catch (e) {
    // ignore
  }

  // 2. Check manage_session cookie against expected password hash
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (token) {
      const password = process.env.MANAGE_PASSWORD ?? "dormobile1";
      const encoder = new TextEncoder();
      const pwdBytes = encoder.encode(password);
      const hashBuffer = await crypto.subtle.digest("SHA-256", pwdBytes);
      const expectedHex = Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      if (token === expectedHex) {
        return true;
      }
    }
  } catch (e) {
    // ignore
  }

  return false;
}

export async function getGitHubToken(): Promise<string | null> {
  try {
    const session = (await auth()) as any;
    if (session?.accessToken) {
      return session.accessToken;
    }
  } catch (e) {
    // ignore
  }
  return process.env.GITHUB_PAT || process.env.GITHUB_TOKEN || null;
}

export function isManageAuthenticated(): boolean {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return Boolean(token);
}

export function setManageCookie(hash: string) {
  const cookieStore = cookies();
  cookieStore.set({
    name: COOKIE_NAME,
    value: hash,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
}

export function removeManageCookie() {
  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
}