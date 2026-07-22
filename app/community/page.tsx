export const dynamic = "force-dynamic";

import { SEOHead } from "@/components/SEOHead";

export default function Community() {
  return (
    <>
      <SEOHead title="Community" description="Our community gallery and stories." />
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Our Community</h1>
          <p className="mb-6">
            Photos, stories, and partner highlights from our events.
          </p>

          <div className="space-y-8">
            {/* Photos Tab – simple Masonry using CSS grid */}
            <section>
              <h2 className="text-xl font-bold mb-4">Photo Gallery</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <img
                    key={i}
                    src={`/images/gallery-${i}.jpg`}
                    alt={`Gallery ${i}`}
                    className="w-full h-48 object-cover rounded"
                  />
                ))}
              </div>
            </section>

            {/* Stories Tab – placeholder */}
            <section>
              <h2 className="text-xl font-bold mb-4">Member Stories</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <blockquote
                    key={i}
                    className="p-4 border-l-4 border-primary"
                  >
                    <p>
                      “Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.”
                    </p>
                    <footer className="mt-2 text-right text-sm text-gray-500">
                      — Member {i}
                    </footer>
                  </blockquote>
                ))}
              </div>
            </section>

            {/* Partners */}
            <section>
              <h2 className="text-xl font-bold mb-4">Our Partners</h2>
              <div className="flex flex-wrap gap-4 justify-center">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`/images/partner-${i}.png`}
                    alt={`Partner ${i}`}
                    className="h-12 grayscale hover:grayscale-0 transition"
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}