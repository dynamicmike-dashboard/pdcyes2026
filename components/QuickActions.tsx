"use client";
import Link from "next/link";

export function QuickActions() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Link
        href="/admin/events/new"
        className="bg-primary text-white px-4 py-3 rounded hover:bg-opacity-90"
      >
        New Event
      </Link>
      <button
        className="bg-secondary text-white px-4 py-3 rounded hover:bg-opacity-90"
        onClick={() => alert("Clone latest – implement as needed")}
      >
        Clone Latest Event
      </button>
    </div>
  );
}