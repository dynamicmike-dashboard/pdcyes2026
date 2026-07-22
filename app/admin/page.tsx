import { getAllEvents } from "@/lib/content";
import { useEffect, useState } from "react";
import { StatCard } from "@/components/StatCard";
import { RecentActivity } from "@/components/RecentActivity";
import { QuickActions } from "@/components/QuickActions";

export default async function Dashboard() {
  const [events, setEvents] = useState<Array<any>>([]);

  useEffect(() => {
    getAllEvents().then(setEvents);
  }, []);

  const upcoming = events.filter(
    (e) => new Date(e.date) >= new Date().setHours(0, 0, 0, 0)
  ).length;
  const past = events.length - upcoming;

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