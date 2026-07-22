"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { EventForm } from "@/components/EventForm";

export default function CloneEventClient({ source }: { source: any }) {
  const router = useRouter();
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (_values: any) => {
    setSubmitMessage("Cloning…");
    await new Promise((r) => setTimeout(r, 800));
    setSubmitMessage("Cloned! Redirecting…");
    await new Promise((r) => setTimeout(r, 800));
    router.push("/admin/events");
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Clone Event</h1>
      <p className="mb-4">
        Cloning “{source?.title ?? source?.slug ?? "event"}”. Adjust fields below, then save.
      </p>
      <EventForm
        initialValues={{
          title: `Clone of ${source?.title ?? source?.slug ?? "Untitled"}`,
          date: source?.date ?? "",
          time: source?.time ?? "",
          venue: source?.venue ?? "",
          image: source?.image ?? "",
          speaker1: source?.speaker1 ?? "",
          speaker2: source?.speaker2 ?? "",
          description: source?.description ?? source?.body ?? "",
          registration_link: source?.registration_link ?? "",
          featured: source?.featured ?? false,
          publish: false,
        }}
        onSubmit={handleSubmit}
        submitMessage={submitMessage}
      />
    </>
  );
}
