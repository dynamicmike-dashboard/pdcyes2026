"use client";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow-sm flex items-center justify-between px-4 py-6">
      <Link href="/" className="flex items-center space-x-2">
        <span className="text-xl font-bold text-primary">PDCYES</span>
      </Link>

      <nav className="hidden md:flex space-x-6">
        <Link href="/about" className="hover:text-secondary">About</Link>
        <Link href="/community" className="hover:text-secondary">Community</Link>
        <Link href="/join" className="hover:text-secondary">Join Us</Link>
        <Link href="/events" className="hover:text-secondary">Events</Link>
      </nav>

      <div className="flex items-center space-x-4">
        {session ? (
          <div className="relative">
            <button
              onClick={() => signOut()}
              className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800"
            >
              <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                {session.user?.name?.[0].toUpperCase()}
              </span>
              <span>{session.user?.name}</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn("github")}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}