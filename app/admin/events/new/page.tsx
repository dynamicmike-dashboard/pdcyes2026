"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewEventPage() {
  const router = useRouter();
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitMessage("Event created! Redirecting…");
    await new Promise((r) => setTimeout(r, 1500));
    router.push("/admin/events");
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">New Event</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Title*</label>
          <input type="text" required className="w-full p-2 border rounded" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-1">Date*</label>
            <input type="date" required className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Time (e.g., 10:00-12:00)</label>
            <input type="text" className="w-full p-2 border rounded" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Venue</label>
          <input type="text" className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image URL (relative to /public)</label>
          <input type="text" className="w-full p-2 border rounded" />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium mb-1">Speaker 1 (Name – Title)</label>
          <input type="text" className="w-full p-2 border rounded" />
          <label className="block text-sm font-medium mb-1">Speaker 2 (Name – Title)</label>
          <input type="text" className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description (Markdown)</label>
          <textarea rows={6} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Registration Link (optional)</label>
          <input type="text" className="w-full p-2 border rounded" />
        </div>

        <div className="flex items-center space-x-3">
          <label className="flex items-center cursor-pointer">
            <input type="checkbox" className="h-4 w-4 text-primary border-gray-300 rounded" />
            Featured on Home
          </label>
        </div>

        <div className="flex items-center space-x-3">
          <label className="flex items-center cursor-pointer">
            <input type="checkbox" className="h-4 w-4 text-primary border-gray-300 rounded" />
            Publish Immediately (uncheck to save as draft)
          </label>
        </div>

        {submitMessage && (
          <p className="text-sm text-green-600">{submitMessage}</p>
        )}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => router.push("/admin/events")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90"
          >
            {submitMessage ? "Saving…" : "Create Event"}
          </button>
        </div>
      </form>
    </>
  );
}
