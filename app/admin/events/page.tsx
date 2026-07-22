"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { EventRow } from "@/components/EventRow";
import { Button } from "@/components/Button";

export default function EventsList() {
  const [events, setEvents] = useState<Array<any>>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("/api/github")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(setEvents)
      .catch(() => setEvents([]));
  }, []);

  const filtered = (events ?? [])
    .filter((e: any) => {
      if (search && !e?.title?.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    })
    .sort((a: any, b: any) => new Date(b?.date ?? 0).getTime() - new Date(a?.date ?? 0).getTime());

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Manage Events</h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <input
          type="text"
          placeholder="Search by title, venue…"
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
          <option value="upcoming">Upcoming</option>
          <option value="past">Past</option>
        </select>
        <Link
          href="/admin/events/new"
          className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90"
        >
          New Event
        </Link>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">No events found.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 text-left">Thumbnail</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Venue</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((ev: any) => (
              <EventRow key={ev.slug} event={ev} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
