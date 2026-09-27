"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { EventForm } from "@/components/EventForm";

export default function EventFormClient({
  initialValues,
  slug,
}: {
  initialValues: any;
  slug: string;
}) {
  const router = useRouter();
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (values: any) => {
    setSubmitMessage("Saving…");

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

    // Determine target slug (new slug if changed, otherwise current slug)
    const targetSlug = values.slug || slug;

    try {
      const res = await fetch("/api/github", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update",
          slug: targetSlug,
          content: markdownContent,
          message: `Update event: ${values.title}`,
          ...(targetSlug !== slug ? { oldSlug: slug } : {}),
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "GitHub update failed");
      }

      setSubmitMessage("Event saved! Redirecting…");
      setTimeout(() => router.push("/admin/events"), 1200);
    } catch (err: any) {
      setSubmitMessage(`Error: ${err.message}`);
    }
  };

  return (
    <EventForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitMessage={submitMessage}
    />
  );
}
