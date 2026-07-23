import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Event Not Found</h2>
        <p className="text-sm text-gray-600 mb-6">
          The event you requested could not be found or has not finished syncing on GitHub yet.
        </p>
        <Link
          href="/"
          className="inline-block w-full py-3 px-4 bg-primary text-white font-bold rounded-xl shadow-md hover:bg-primary/90 transition-all text-sm"
        >
          ← Return to Homepage
        </Link>
      </div>
    </div>
  );
}
