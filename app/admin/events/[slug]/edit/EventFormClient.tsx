"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { EventForm } from "@/components/EventForm";

export default function EventFormClient({
  initialValues,
}: {
  initialValues: any;
}) {
  const router = useRouter();
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (values: any) => {
    setSubmitMessage("Saving…");
    await new Promise((r) => setTimeout(r, 800));
    setSubmitMessage("Event saved! Redirecting…");
    await new Promise((r) => setTimeout(r, 800));
    try {
      await fetch("/api/github", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update", event: values }),
      });
    } catch {}
    router.push("/admin/events");
  };

  return (
    <EventForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitMessage={submitMessage}
    />
  );
}
