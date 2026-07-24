export const dynamic = "force-dynamic";

import { getAllEvents } from "@/lib/content";
import { getImageUrl } from "@/lib/github";
import { SEOHead } from "@/components/SEOHead";
import { formatDate } from "@/lib/utils";
import EventsList from "./events/EventsList";

export default async function Home() {
  // Fetch only published events (or all, sorting by date)
  const allEvents = await getAllEvents();
  const publishedEvents = allEvents.filter((e) => e.publish !== false);

  return (
    <>
      <SEOHead
        title="PDCYES Events – Discover Workshops, Retreats & Gatherings"
        description="Join the PDCYES personal development community in Playa del Carmen. Browse our upcoming and past workshops, movement sessions, and interactive gatherings."
      />
      <main className="min-h-screen bg-gradient-to-b from-amber-50/40 via-white to-sky-50/30 py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header intro */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-xs tracking-wide uppercase mb-3">
              📅 Community Calendar
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
              PDCYES Events
            </h1>
            <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
              Connect with like-minded seekers, learn practical growth tools, and elevate your vibration at our monthly gatherings in Playa del Carmen.
            </p>
          </div>

          <EventsList events={publishedEvents} />
        </div>
      </main>
    </>
  );
}