import { EventCard } from "@/components/EventCard";

export function EventGrid({ events }: { events: any[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((ev) => (
        <EventCard key={ev.slug} event={ev} />
      ))}
    </div>
  );
}