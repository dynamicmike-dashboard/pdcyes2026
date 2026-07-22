import { getEventBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import DeletePageClient from "../DeletePageClient";

export const dynamic = "force-dynamic";

export default async function DeletePage({
  params,
}: {
  params: { slug: string };
}) {
  const event: any = await getEventBySlug(params.slug).catch(() => null);
  if (!event) notFound();
  return <DeletePageClient event={event} />;
}
