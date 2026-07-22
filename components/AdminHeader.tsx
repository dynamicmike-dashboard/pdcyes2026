"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export function AdminHeader() {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow-sm flex items-center justify-between px-4 py-4">
      <div className="text-lg font-semibold">PDCYES Admin</div>
      <div className="flex items-center space-x-3">
        <span className="text-sm text-gray-600">
          Hi, {session?.user?.name ?? ""}
        </span>
        <button
          onClick={() => signOut()}
          className="px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}