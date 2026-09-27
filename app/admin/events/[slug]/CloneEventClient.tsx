"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { EventForm } from "@/components/EventForm";

export default function CloneEventClient({ source }: { source: any }) {
  const router = useRouter();
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (values: any) => {
    setSubmitMessage("Cloning event on GitHub…");

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
          action: "clone",
          sourceSlug: source.slug,
          newSlug: values.slug,
          newDate: values.date,
          message: `Clone event: ${values.title}`,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "GitHub clone failed");
      }

      setSubmitMessage("Event cloned successfully! Redirecting…");
      setTimeout(() => router.push("/admin/events"), 1200);
    } catch (err: any) {
      setSubmitMessage(`Error: ${err.message}`);
    }
  };

  // Generate initial slug from title with date suffix
  const initialSlug = `clone-of-${(source?.title ?? source?.slug ?? "event")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}-${new Date().toISOString().split("T")[0]}`;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Clone Event</h1>
            <p className="text-xs text-gray-500 mt-0.5">Source: <code className="bg-gray-100 px-1 py-0.5 rounded">{source?.slug}</code></p>
          </div>
          <button
            onClick={() => router.push("/admin/events")}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← Back to Events
          </button>
        </div>

        <EventForm
          initialValues={{
            title: `Clone of ${source?.title ?? source?.slug ?? "Untitled"}`,
            slug: initialSlug,
            date: source?.date ?? "",
            time: source?.time ?? "",
            venue: source?.venue ?? "",
            image: source?.image ?? "",
            speaker1: source?.speaker1 ?? "",
            speaker1_image: source?.speaker1_image ?? "",
            speaker2: source?.speaker2 ?? "",
            speaker2_image: source?.speaker2_image ?? "",
            description: source?.description ?? source?.body ?? "",
            registration_link: source?.registration_link ?? "",
            featured: source?.featured ?? false,
            publish: false,
          }}
          onSubmit={handleSubmit}
          submitMessage={submitMessage}
        />
      </div>
    </div>
  );
}
