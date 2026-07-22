export const dynamic = "force-dynamic";

import { getAllEvents } from "@/lib/content";
import EventsList from "./EventsList";

export default async function EventsArchive() {
  const events = await getAllEvents();
  return <EventsList events={events} />;
}
