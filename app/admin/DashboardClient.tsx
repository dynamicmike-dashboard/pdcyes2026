"use client";
import { useEffect, useMemo, useState } from "react";
import { StatCard } from "@/components/StatCard";
import { RecentActivity } from "@/components/RecentActivity";
import { QuickActions } from "@/components/QuickActions";

type Event = { slug: string; title: string; date: string };

export default function DashboardClient({ events: initial }: { events: Event[] }) {
  const [events, setEvents] = useState<Event[]>(initial ?? []);

  useEffect(() => {
    if (initial && initial.length) return;
    import("@/lib/content").then((m) => m.getAllEvents()).then(setEvents).catch(() => setEvents([]));
  }, [initial]);

  const { upcoming, past } = useMemo(() => {
    const today = new Date().setHours(0, 0, 0, 0);
    const up = events.filter((e) => new Date(e.date).getTime() >= today).length;
    return { upcoming: up, past: events.length - up };
  }, [events]);

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Events" value={events.length} icon="Calendar" />
        <StatCard label="Upcoming" value={upcoming} icon="Clock" />
        <StatCard label="Past Events" value={past} icon="History" />
        <StatCard label="Pending Edits" value={0} icon="Edit" />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <RecentActivity events={events.slice(0, 5)} />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <QuickActions />
      </div>
    </>
  );
}
