import { SEOHead } from "@/components/SEOHead";

export default function JoinUs() {
  return (
    <>
      <SEOHead title="Join Us" description="Become a member of PDCYES." />
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Join the PDCYES Community</h1>
          <p className="mb-6">
            Grow, connect, and thrive together through our events and
            workshops.
          </p>

          <div className="grid gap-6 sm:grid-cols-3 text-center mb-8">
            {/* Benefit cards */}
            <div className="p-4 border rounded">
              <svg
                className="w-12 h-12 mx-auto mb-3 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zm0 10c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2z" />
              </svg>
              <h3 className="font-semibold">Weekly Workshops</h3>
              <p className="text-sm text-gray-600">Regular sessions on yoga, meditation, and personal growth.</p>
            </div>
            <div className="p-4 border rounded">
              <svg
                className="w-12 h-12 mx-auto mb-3 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h3m8 0v3m-3-3h-8m8 0V5a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2v-3" />
              </svg>
              <h3 className="font-semibold">Retreats</h3>
              <p className="text-sm text-gray-600">Immersive weekend getaways focused on deep transformation.</p>
            </div>
            <div className="p-4 border rounded">
              <svg
                className="w-12 h-12 mx-auto mb-3 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m2 0a6 6 0 01-9 9 1.753 1.753 0 00-.364-.062M21 12a9 9 0 01-9 9m9-9a6.075 6.075 0 00-1.007-.386M5 6a6 6 0 016-6h2a6 6 0 016 6v6m0 0a6 6 0 006 6m0-6a6 6 0 01-6 6H5a6 6 0 00-6-6-6}" />
              </svg>
              <h3 className="font-semibold">Online Community</h3>
              <p className="text-sm text-gray-600">Private forum, resources, and monthly live Q&A.</p>
            </div>
          </div>

          <div className="text-center">
            <a
              href="https://example.com/membership" // replace with actual link
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-secondary text-white rounded hover:bg-opacity-90"
            >
              Become a Member
            </a>
          </div>
        </div>
      </section>
    </>
  );
}