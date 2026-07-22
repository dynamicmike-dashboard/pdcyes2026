"use client";
import { useState } from "react";
import Link from "next/link";
import { EventCard } from "@/components/EventCard";
import { SEOHead } from "@/components/SEOHead";
import { EventData } from "@/lib/types";

export default function EventsList({ events }: { events: EventData[] }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = (events ?? [])
    .filter((e) => {
      if (search && !e?.title?.toLowerCase().includes(search.toLowerCase())) return false;
      if (filter !== "all" && e?.category !== filter) return false;
      return true;
    })
    .sort((a, b) => new Date(b?.date ?? 0).getTime() - new Date(a?.date ?? 0).getTime());

  return (
    <>
      <SEOHead title="Events" description="Upcoming and past PDCYES events." />
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Events</h1>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <input
              type="text"
              placeholder="Search events…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-1/3 p-2 border rounded mb-2 sm:mb-0"
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full sm:w-1/3 p-2 border rounded mb-2 sm:mb-0"
            >
              <option value="all">All</option>
              <option value="yoga">Yoga</option>
              <option value="workshop">Workshop</option>
              <option value="retreat">Retreat</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-gray-500">No events match your filters.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((ev) => (
                <Link key={ev.slug} href={`/events/${ev.slug}`} className="group">
                  <EventCard event={ev} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
