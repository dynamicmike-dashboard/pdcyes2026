import { getEventBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import { useState } from "react";
import { EventForm } from "@/components/EventForm";
import { useRouter } from "next/navigation";

export default async function CloneEventPage({ params }: { params: { slug: string } }) {
  const source = await getEventBySlug(params.slug);
  if (!source) notFound();

  const router = useRouter();
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (values: any) => {
    // In a real app you would call /api/github with action:"create"
    setSubmitMessage("Cloning…");
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitMessage("Cloned! Redirecting…");
    await new Promise((r) => setTimeout(r, 1500));
    router.push("/admin/events");
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Clone Event</h1>
      <p className="mb-4">
        Cloning “{source.title}”. Adjust fields below, then save.
      </p>
      <EventForm
        initialValues={{
          title: `Clone of ${source.title}`,
          date: source.date,
          time: source.time,
          venue: source.venue,
          image: source.image,
          speaker1: source.speaker1,
          speaker2: source.speaker2,
          description: source.description,
          registration_link: source.registration_link,
          featured: source.featured ?? false,
          publish: false,
        }}
        onSubmit={handleSubmit}
        submitMessage={submitMessage}
      />
    </>
  );
}