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

  return <ManageEditEventClient slug={params.slug} initialValues={event} />;
}
