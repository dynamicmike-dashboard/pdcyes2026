export function EventCarousel({ events }: { events: any[] }) {
  return (
    <div className="overflow-x-auto whitespace-now">
      <div className="inline-flex space-x-4">
        {events.map((ev) => (
          <EventCard key={ev.slug} event={ev} className="shrink-0" />
        ))}
      </div>
    </div>
  );
}