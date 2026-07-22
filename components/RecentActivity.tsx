export function RecentActivity({ events }: { events: any[] }) {
  return (
    <ul className="space-y-4">
      {events.map((ev) => (
        <li key={ev.slug} className="p-3 bg-gray-50 rounded flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/20 rounded flex items-center justify-center text-primary">
            📅
          </div>
          <div>
            <p className="font-medium">Updated event: {ev.title}</p>
            <p className="text-sm text-gray-500">
              {/* In a real app you'd have timestamp from commit */}
              Just now
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}