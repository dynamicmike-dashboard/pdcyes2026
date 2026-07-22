export const dynamic = "force-dynamic";

import Link from "next/link";
import { getAllEvents } from "@/lib/content";
import { SEOHead } from "@/components/SEOHead";
import { formatDate } from "@/lib/utils";
import MarkdownBody from "@/components/MarkdownBody";

export default async function Home() {
  const events = await getAllEvents();
  // Upcoming or most recent event
  const featured = events.find((e) => e.publish !== false) || events[0];

  return (
    <>
      <SEOHead
        title={featured ? `${featured.title} – PDCYES` : "PDCYES – Next Community Event"}
        description={featured?.body?.slice(0, 160) || "Join PDCYES for our next personal development event in Playa del Carmen."}
      />
      <main className="min-h-screen bg-gradient-to-b from-amber-50/40 via-white to-sky-50/30 py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">

          {/* Keynote Event Badge */}
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-xs tracking-wide uppercase">
              ✨ Next Community Event
            </span>
          </div>

          {featured ? (
            <article className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100/80 overflow-hidden backdrop-blur-sm">
              {featured.image && (
                <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-gray-100">
                  <img
                    src={featured.image.startsWith("http") ? featured.image : `https://raw.githubusercontent.com/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/main/${featured.image}`}
                    alt={featured.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight drop-shadow-sm">
                      {featured.title}
                    </h1>
                  </div>
                </div>
              )}

              <div className="p-8 sm:p-12">
                {!featured.image && (
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-6">
                    {featured.title}
                  </h1>
                )}

                {/* Event Key Facts Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 rounded-2xl bg-amber-50/50 border border-amber-100/60 mb-8">
                  <div>
                    <span className="block text-xs font-semibold uppercase text-amber-800/70 tracking-wider">Date</span>
                    <span className="text-base font-bold text-gray-900 mt-1 block">
                      {featured.date ? formatDate(featured.date) : "TBA"}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold uppercase text-amber-800/70 tracking-wider">Time</span>
                    <span className="text-base font-bold text-gray-900 mt-1 block">
                      {featured.time || "TBA"}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold uppercase text-amber-800/70 tracking-wider">Venue</span>
                    <span className="text-base font-bold text-gray-900 mt-1 block">
                      {featured.venue || "Playa del Carmen"}
                    </span>
                  </div>
                </div>

                {/* Speakers */}
                {(featured.speaker1 || featured.speaker2) && (
                  <div className="mb-8">
                    <h3 className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-3">Featured Speakers</h3>
                    <div className="flex flex-wrap gap-4">
                      {featured.speaker1 && (
                        <div className="px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-100 text-sm font-medium text-gray-800">
                          🗣️ {featured.speaker1}
                        </div>
                      )}
                      {featured.speaker2 && (
                        <div className="px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-100 text-sm font-medium text-gray-800">
                          🗣️ {featured.speaker2}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Description */}
                <div className="prose prose-lg prose-amber max-w-none text-gray-700 leading-relaxed mb-10">
                  <MarkdownBody content={featured.body || featured.description || ""} />
                </div>

                {/* Call to Action */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100">
                  {featured.registration_link ? (
                    <a
                      href={featured.registration_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all text-center text-lg"
                    >
                      RSVP / Register Now →
                    </a>
                  ) : (
                    <span className="text-sm text-gray-500 italic">Registration opening soon</span>
                  )}

                  {events.length > 1 && (
                    <Link
                      href="/events"
                      className="text-sm font-semibold text-gray-600 hover:text-primary transition-colors"
                    >
                      View All Events ({events.length}) →
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900">PDCYES Personal Development Community</h2>
              <p className="mt-3 text-gray-600 max-w-md mx-auto">
                No upcoming events published yet. Check back soon for our next workshop in Playa del Carmen!
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}