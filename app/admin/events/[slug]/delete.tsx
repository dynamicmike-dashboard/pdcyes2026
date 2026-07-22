import { getEventBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";

export default async function DeletePage({ params }: { params: { slug: string } }) {
  const event = await getEventBySlug(params.slug);
  if (!event) notFound();

  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    // In a real app you would call /api/github with action:"delete"
    await new Promise((r) => setTimeout(r, 1500));
    setDeleting(false);
    router.push("/admin/events");
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Delete Event</h1>
      <p className="mb-4">
        Are you sure you want to delete “{event.title}”? This action cannot be
        undone.
      </p>

      {deleting ? (
        <p>Deleting…</p>
      ) : (
        <div className="mt-6 flex space-x-3">
          <Button
            variant="outline"
            onClick={() => router.push("/admin/events")}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete Permanently
          </Button>
        </div>
      )}
    </>
  );
}