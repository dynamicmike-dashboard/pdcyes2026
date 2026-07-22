export const dynamic = "force-dynamic";

import { SEOHead } from "@/components/SEOHead";

export default function About() {
  return (
    <>
      <SEOHead title="About" description="Learn about our mission and team." />
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Our Mission</h1>
          <p className="mb-6">
            We empower individuals to grow, connect, and thrive through
            workshops, retreats, and community gatherings in Playa del Carmen.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Our Story</h2>
          <p className="mb-6">
            Founded in 2020, PDCYES started as a small yoga circle on the beach
            and has grown into a vibrant community of like‑minded seekers.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Meet the Team</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-center">
            {/* Example static team – replace with real data or CMS */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 border rounded">
                <img
                  src="/images/team-placeholder.jpg"
                  alt="Team member"
                  className="w-24 h-24 mx-auto mb-3 rounded-full"
                />
                <h3 className="font-semibold">Name {i}</h3>
                <p className="text-sm text-gray-500">Role</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}