import { getEventBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import EventFormClient from "./EventFormClient";

export const dynamic = "force-dynamic";

export default async function EditEventPage({
  params,
}: {
  params: { slug: string };
}) {
  const event = await getEventBySlug(params.slug).catch(() => null);
  if (!event) notFound();
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Edit Event</h1>
      <EventFormClient initialValues={event} />
    </>
  );
}
