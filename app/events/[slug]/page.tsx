import { getEventBySlug } from "@/lib/content";
import { getImageUrl } from "@/lib/github";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import MarkdownBody from "@/components/MarkdownBody";
import { SpeakerCard } from "@/components/SpeakerCard";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const event = await getEventBySlug(params.slug);
  if (!event) return { title: "Event Not Found | PDCYES" };
  const titleText = event.title || "Event Detail";
  const bodyText = event.body || "";
  const imageUrl = event.image ? getImageUrl(event.image) : undefined;
  return {
    title: `${titleText} | PDCYES`,
    description: bodyText.slice(0, 150),
    openGraph: {
      title: titleText,
      description: bodyText.slice(0, 150),
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function EventDetail({ params }: { params: { slug: string } }) {
  const event = await getEventBySlug(params.slug);
  if (!event) notFound();

  const bodyText = event.body || "";
  const titleText = event.title || "Event Detail";

  const startTime = typeof event.time === "string" && event.time.includes("-")
    ? event.time.split("-")[0].trim()
    : typeof event.time === "string" && event.time
    ? event.time.trim()
    : "00:00";

  const endTime = typeof event.time === "string" && event.time.includes("-")
    ? event.time.split("-")[1].trim()
    : "23:59";

  return (
    <>
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Hero Image */}
          {event.image && (
            <img
              src={getImageUrl(event.image)}
              alt={titleText}
              className="w-full h-64 object-cover rounded-xl mb-6"
            />
          )}

          <article>
            <header className="mb-8">
              <h1 className="text-4xl font-bold">{titleText}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
                <span>{event.date ? formatDate(event.date) : "TBA"}</span>
                <span>•</span>
                <span>{event.time || "TBA"}</span>
                <span>•</span>
                <span>{event.venue || "TBA"}</span>
              </div>
            </header>

            {/* Description */}
            <div className="mb-8 prose prose-lg max-w-none">
              <MarkdownBody content={bodyText} />
            </div>

            {/* Speakers */}
            {(event.speaker1 || event.speaker2) ? (
              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Featured Speakers</h2>
                <div className="flex flex-wrap gap-4">
                  {event.speaker1 && (
                    <SpeakerCard name={event.speaker1} image={event.speaker1_image} />
                  )}
                  {event.speaker2 && (
                    <SpeakerCard name={event.speaker2} image={event.speaker2_image} />
                  )}
                </div>
              </section>
            ) : null}

            {/* Registration CTA */}
            {event.registration_link && (
              <div className="mt-6 mb-8 p-6 bg-amber-50 border border-amber-200 rounded-2xl text-center">
                <p className="text-sm font-semibold text-amber-800 uppercase tracking-wide mb-3">
                  📝 Registration
                </p>
                <a
                  href={event.registration_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-md shadow-primary/25 hover:bg-primary/90 transition-all text-base"
                >
                  Register Now →
                </a>
                <p className="mt-3 text-xs text-gray-500 break-all">
                  <a
                    href={event.registration_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-primary"
                  >
                    {event.registration_link}
                  </a>
                </p>
              </div>
            )}
          </article>
        </div>
      </section>

      {/* JSON-LD script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: titleText,
            startDate: event.date ? `${event.date}T${startTime}:00` : undefined,
            endDate: event.date ? `${event.date}T${endTime}:00` : undefined,
            location: {
              "@type": "Place",
              name: event.venue ?? "",
            },
            description: bodyText,
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
          }),
        }}
      />
    </>
  );
}