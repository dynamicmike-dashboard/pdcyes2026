"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { EventForm } from "@/components/EventForm";

export default function ManageEditEventClient({
  slug,
  initialValues,
}: {
  slug: string;
  initialValues: any;
}) {
  const router = useRouter();
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (values: any) => {
    setSubmitMessage("Updating event on GitHub…");

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
          action: "update",
          slug,
          content: markdownContent,
          message: `Update event: ${values.title}`,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "GitHub update failed");
      }

      setSubmitMessage("Event updated successfully! Redirecting…");
      setTimeout(() => router.push("/manage/events"), 1200);
    } catch (err: any) {
      setSubmitMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Event</h1>
            <p className="text-xs text-gray-500 mt-0.5">Slug: <code className="bg-gray-100 px-1 py-0.5 rounded">{slug}</code></p>
          </div>
          <div className="flex items-center space-x-3">
            <a
              href={`/events/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-blue-50 text-blue-700 font-semibold rounded-lg hover:bg-blue-100 transition-colors text-sm flex items-center gap-1.5 border border-blue-200"
            >
              👁 View Live Event ↗
            </a>
            <button
              onClick={() => {
                const url = `${window.location.origin}/events/${slug}`;
                navigator.clipboard.writeText(url);
                alert(`Link copied to clipboard!\n${url}`);
              }}
              className="px-3 py-1.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors text-sm border border-gray-200"
            >
              📋 Copy Link
            </button>
            <button
              onClick={() => router.push("/manage/events")}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← Back to Events
            </button>
          </div>
        </div>

        <EventForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          submitMessage={submitMessage}
        />
      </div>
    </div>
  );
}
