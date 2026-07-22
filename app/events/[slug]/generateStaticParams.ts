import { getAllEvents } from "@/lib/content";

export async function generateStaticParams() {
  const events = await getAllEvents();
  return events.map((ev) => ({ slug: ev.slug }));
}