"use client";
import Link from "next/link";

export function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100 px-6 py-4 flex items-center justify-between">
      <Link href="/" className="flex items-center space-x-2">
        <span className="text-2xl font-bold tracking-tight text-primary">PDCYES</span>
      </Link>

      <nav className="flex space-x-6 text-sm font-medium text-gray-600">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <Link href="/events" className="hover:text-primary transition-colors">Events</Link>
        <Link href="/about" className="hover:text-primary transition-colors">About</Link>
        <Link href="/community" className="hover:text-primary transition-colors">Community</Link>
        <Link href="/join" className="hover:text-primary transition-colors">Join Us</Link>
      </nav>
    </header>
  );
}