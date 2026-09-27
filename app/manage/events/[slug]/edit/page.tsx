import { getEventBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import ManageEditEventClient from "./ManageEditEventClient";

export const dynamic = "force-dynamic";

export default async function ManageEditEventPage({
  params,
}: {
  params: { slug: string };
}) {
  const event = await getEventBySlug(params.slug).catch(() => null);
  if (!event) notFound();

  // Ensure slug is in initialValues for the form
  const initialValues = { ...event, slug: event.slug };

  return <ManageEditEventClient slug={params.slug} initialValues={initialValues} />;
}
