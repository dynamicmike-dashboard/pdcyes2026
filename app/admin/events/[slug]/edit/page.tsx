import { getEventBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import { useState } from "react";
import { EventForm } from "@/components/EventForm";
import { useRouter } from "next/navigation";

export default async function EditEventPage({ params }: { params: { slug: string } }) {
  const event = await getEventBySlug(params.slug);
  if (!event) notFound();

  const router = useRouter();
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (values: any) => {
    // In a real app you would call /api/github with action:"update"
    setSubmitMessage("Saving…");
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitMessage("Event saved! Redirecting…");
    await new Promise((r) => setTimeout(r, 1500));
    router.push("/admin/events");
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Edit Event</h1>
      <EventForm
        initialValues={event}
        onSubmit={handleSubmit}
        submitMessage={submitMessage}
      />
    </>
  );
}