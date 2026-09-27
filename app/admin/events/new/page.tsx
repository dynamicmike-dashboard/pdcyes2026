"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { EventForm } from "@/components/EventForm";

export default function NewEventPage() {
  const router = useRouter();
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (values: any) => {
    setSubmitMessage("Creating event…");
    
    const markdownContent = `---
title: "${values.title}"
slug: "${values.slug}"
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
          slug: values.slug,
          content: markdownContent,
          message: `Add event: ${values.title}`,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "GitHub commit failed");
      }

      setSubmitMessage("Event created! Redirecting…");
      setTimeout(() => router.push("/admin/events"), 1200);
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
            onClick={() => router.push("/admin/events")}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← Back to Events
          </button>
        </div>

        <EventForm
          initialValues={{ featured: true, publish: true, slug: "" }}
          onSubmit={handleSubmit}
          submitMessage={submitMessage}
        />
      </div>
    </div>
  );
}
