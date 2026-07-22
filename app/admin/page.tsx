import { getAllEvents } from "@/lib/content";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const events = await getAllEvents();
  return <DashboardClient events={events} />;
}
