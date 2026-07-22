import { getAllEvents } from "@/lib/content";
import EventsList from "./EventsList";

export const revalidate = 60;
export const dynamic = "force-static";

export default async function EventsArchive() {
  const events = await getAllEvents();
  return <EventsList events={events} />;
}
