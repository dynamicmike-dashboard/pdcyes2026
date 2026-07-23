"use client";
import { useState } from "react";

export const dynamic = "force-dynamic";
import { useRouter } from "next/navigation";
import { EventForm } from "@/components/EventForm";

export default function NewEventManagePage() {
  const router = useRouter();
  const [submitMessage, setSubmitMessage] = useState("");
  const [createdSlug, setCreatedSlug] = useState<string | null>(null);

  const handleSubmit = async (values: any) => {
    setSubmitMessage("Creating event and committing to GitHub…");
    setCreatedSlug(null);

    const slug = values.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const markdownContent = `---
title: "${values.title}"
date: "${values.date}"
time: "${values.time}"
venue: "${values.venue}"
image: "${values.image}"
speaker1: "${values.speaker1}"
speaker1_image: "${values.speaker1_image || ""}"
speaker2: "${values.speaker2}"
speaker2_image: "${values.speaker2_image || ""}"
registration_link: "${values.registration_link}"
featured: ${values.featured}
publish: ${values.publish}
---

${values.description}
`;

    try {
      const res = await fetch("/api/github", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          slug,
          content: markdownContent,
          message: `Add event: ${values.title}`,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "GitHub commit failed");
      }

      setSubmitMessage("🎉 Event published & committed to GitHub!");
      setCreatedSlug(slug);
    } catch (err: any) {
      setSubmitMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Create New Event</h1>
          <button
            onClick={() => router.push("/manage/events")}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← Back to Events
          </button>
        </div>

        {createdSlug && (
          <div className="mb-6 p-5 bg-green-50 border border-green-200 rounded-xl">
            <h3 className="text-lg font-bold text-green-900 flex items-center gap-2 mb-2">
              ✅ Event Published Successfully!
            </h3>
            <p className="text-sm text-green-800 mb-4">
              Your event is now live in the repository and accessible on the site.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`/events/${createdSlug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors text-sm shadow-sm flex items-center gap-1.5"
              >
                👁 View Live Event Page ↗
              </a>
              <button
                onClick={() => {
                  const url = `${window.location.origin}/events/${createdSlug}`;
                  navigator.clipboard.writeText(url);
                  alert(`Link copied to clipboard!\n${url}`);
                }}
                className="px-4 py-2 bg-white text-green-800 border border-green-300 font-semibold rounded-lg hover:bg-green-100 transition-colors text-sm shadow-sm"
              >
                📋 Copy Shareable Link
              </button>
              <button
                onClick={() => router.push("/manage/events")}
                className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                Go to Events Dashboard
              </button>
            </div>
          </div>
        )}

        <EventForm
          initialValues={{ featured: true, publish: true }}
          onSubmit={handleSubmit}
          submitMessage={submitMessage}
        />
      </div>
    </div>
  );
}
