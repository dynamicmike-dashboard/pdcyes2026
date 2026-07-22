"use client";
import { useState } from "react";

export const dynamic = "force-dynamic";
import { useRouter } from "next/navigation";
import { EventForm } from "@/components/EventForm";

export default function NewEventManagePage() {
  const router = useRouter();
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (values: any) => {
    setSubmitMessage("Creating event and committing to GitHub…");
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
speaker2: "${values.speaker2}"
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

      setSubmitMessage("Event published successfully! Redirecting…");
      setTimeout(() => router.push("/manage/events"), 1200);
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

        <EventForm
          initialValues={{ featured: true, publish: true }}
          onSubmit={handleSubmit}
          submitMessage={submitMessage}
        />
      </div>
    </div>
  );
}
