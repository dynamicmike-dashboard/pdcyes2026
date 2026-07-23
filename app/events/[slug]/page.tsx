import { getEventBySlug } from "@/lib/content";
import { getImageUrl } from "@/lib/github";
import { notFound } from "next/navigation";
import { SEOHead } from "@/components/SEOHead";
import { formatDate } from "@/lib/utils";
import MarkdownBody from "@/components/MarkdownBody";
import { SpeakerCard } from "@/components/SpeakerCard";

export const revalidate = 60;

export default async function EventDetail({ params }: { params: { slug: string } }) {
  const event = await getEventBySlug(params.slug);
  if (!event) notFound();

  return (
    <>
      <SEOHead
        title={event.title}
        description={event.body.slice(0, 150)}
        image={event.image ? getImageUrl(event.image) : undefined}
      />
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Hero Image */}
          {event.image && (
            <img
              src={getImageUrl(event.image)}
              alt={event.title}
              className="w-full h-64 object-cover rounded-xl mb-6"
            />
          )}

          <article>
            <header className="mb-8">
              <h1 className="text-4xl font-bold">{event.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
                <span>{formatDate(event.date)}</span>
                <span>•</span>
                <span>{event.time}</span>
                <span>•</span>
                <span>{event.venue}</span>
              </div>
            </header>

            {/* Description */}
            <div className="mb-8 prose prose-lg max-w-none">
              <MarkdownBody content={event.body} />
            </div>

            {/* Speakers */}
            {event.speaker1 || event.speaker2 ? (
              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Speakers</h2>
                <div className="flex flex-wrap gap-4">
                  {event.speaker1 && (
                    <SpeakerCard name={event.speaker1} />
                  )}
                  {event.speaker2 && (
                    <SpeakerCard name={event.speaker2} />
                  )}
                </div>
              </section>
            ) : null}

            {/* Registration CTA */}
            {event.registration_link && (
              <div className="text-center mb-8">
                <a
                  href={event.registration_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-accent text-white rounded hover:bg-opacity-90"
                >
                  Register Now
                </a>
              </div>
            )}

            {/* Related Events (simple placeholder) */}
            <section className="mt-12">
              <h2 className="text-xl font-bold mb-4">You May Also Like</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {[1, 2].map((i) => (
                  <div key={i} className="p-4 border rounded">
                    <h3 className="font-semibold">Related Event {i}</h3>
                    <p className="text-sm">Date • Venue</p>
                  </div>
                ))}
              </div>
            </section>
          </article>
        </div>
      </section>

      {/* JSON‑LD script */}
      <script
        type="application/json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: event.title,
            startDate: `${event.date}T${event.time?.split("-")[0].trim() || "00:00"}:00`,
            endDate: `${event.date}T${event.time?.split("-")[1].trim() || "23:59"}:00`,
            location: {
              "@type": "Place",
              name: event.venue ?? "",
            },
            description: event.body,
            image: event.image ? getImageUrl(event.image) : undefined,
            offers: {
              "@type": "Offer",
              url: event.registration_link ?? "",
              price: "0",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
            performer: [
              { "@type": "Person", name: event.speaker1 ?? "" },
              { "@type": "Person", name: event.speaker2 ?? "" },
            ].filter((p) => p.name),
          })
        }}
      />
    </>
  );
}