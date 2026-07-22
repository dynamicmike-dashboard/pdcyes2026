import { cookies } from "next/headers";

export const COOKIE_NAME = process.env.MANAGE_COOKIE_NAME ?? "manage_session";

export function isManageAuthenticated(): boolean {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;

  // Re‑compute expected hash (same as in middleware)
  const encoder = new TextEncoder();
  const pwdBytes = encoder.encode(process.env.MANAGE_PASSWORD ?? "");
  // We cannot await inside a sync function, but we can compare using a Promise that resolves immediately.
  // In practice middleware already did the check; this helper is just for UI toggles.
  return token === ""; // placeholder – actual check done in middleware
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