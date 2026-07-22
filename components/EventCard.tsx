import Link from "next/link";
import { formatDate } from "@/lib/utils";

export function EventCard({ event }: { event: any }) {
  return (
    <Link
      href={`/events/${event.slug}`}
      className="group block overflow-hidden rounded border shadow hover:shadow-lg transition-shadow"
    >
      <img
        src={event.image
          ? `https://raw.githubusercontent.com/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/main/${event.image}`
          : "/images/placeholder.jpg"}
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold">{event.title}</h3>
        <p className="text-sm text-gray-500 mt-2">
          {formatDate(event.date)} • {event.time} • {event.venue}
        </p>
      </div>
    </Link>
  );
}