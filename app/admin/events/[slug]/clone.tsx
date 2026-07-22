import { getEventBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import CloneEventClient from "./CloneEventClient";

export const dynamic = "force-dynamic";

export default async function CloneEventPage({
  params,
}: {
  params: { slug: string };
}) {
  const source: any = await getEventBySlug(params.slug).catch(() => null);
  if (!source) notFound();
  return <CloneEventClient source={source} />;
}
