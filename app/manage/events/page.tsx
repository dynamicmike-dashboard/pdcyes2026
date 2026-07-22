"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { EventRow } from "@/components/EventRow";

export default function ManageEventsPage() {
  const [events, setEvents] = useState<Array<any>>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(setEvents)
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = (events ?? [])
    .filter((e: any) => {
      if (search && !e?.title?.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    })
    .sort((a: any, b: any) => new Date(b?.date ?? 0).getTime() - new Date(a?.date ?? 0).getTime());

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Events</h1>
            <p className="text-sm text-gray-500 mt-1">Create, update, clone, and broadcast PDCYES community events</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <Link
              href="/manage/events/new"
              className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-all text-sm shadow-sm"
            >
              + New Event
            </Link>
            <Link
              href="/manage?logout=1"
              className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all text-sm"
            >
              Sign Out
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <input
            type="text"
            placeholder="Search events by title or venue…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-80 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <div className="text-sm text-gray-500">
            Total Events: <span className="font-semibold text-gray-900">{events.length}</span>
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-xl p-12 text-center text-gray-500">
            Loading events from GitHub…
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center text-gray-500 border border-gray-100">
            No events found. Click "+ New Event" above to create your first event.
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full border-collapse text-left text-sm text-gray-600">
              <thead className="bg-gray-50 border-b border-gray-100 text-gray-700 font-semibold">
                <tr>
                  <th className="p-4">Thumbnail</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Venue</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((ev: any) => (
                  <EventRow key={ev.slug} event={ev} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
