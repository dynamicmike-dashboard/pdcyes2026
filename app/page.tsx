import Link from "next/link";
import { getAllEvents } from "@/lib/content";
import { EventCard } from "@/components/EventCard";
import { SEOHead } from "@/components/SEOHead";
import { formatDate } from "@/lib/utils";

export const revalidate = 60; // ISR

export default async function Home() {
  const events = await getAllEvents();
  const featured = events[0]; // most recent

  return (
    <>
      <SEOHead
        title="Home"
        description="Upcoming events and community highlights"
      />
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4">
          {/* Hero */}
          <div className="relative h-96 bg-gradient-to-b from-primary/20 to-white rounded-xl overflow-hidden mb-8">
            {featured?.image && (
              <img
                src={`https://raw.githubusercontent.com/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/main/${featured.image}`}
                alt={featured.title}
                className="object-cover w-full h-full"
              />
            )}
            <div className="absolute inset-0 flex flex-col justify-between p-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {featured?.title ?? "Welcome to PDCYES"}
                </h1>
                <p className="mt-2 text-gray-600">
                  {featured?.date ? (
                    <>
                      <span className="mr-2">{formatDate(featured.date)}</span>
                      <span>• </span>
                      {featured.time && (
                        <span>{featured.time}</span>
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </p>
              </div>
              <div className="mt-4">
                <Link
                  href={`/events/${featured?.slug}`}
                  className="px-4 py-2 bg-secondary text-white rounded hover:bg-opacity-90"
                >
                  Learn More
                </Link>
                {featured?.registration_link && (
                  <a
                    href={featured.registration_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 px-4 py-2 bg-accent text-white rounded hover:bg-opacity-90"
                  >
                    Register
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Upcoming Carousel (simple grid) */}
          <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events
              .slice(0, 6)
              .map((ev) => (
                <Link
                  key={ev.slug}
                  href={`/events/${ev.slug}`}
                  className="group"
                >
                  <EventCard event={ev} />
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}