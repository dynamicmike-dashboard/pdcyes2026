"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";

export default function DeletePageClient({ event }: { event: any }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await fetch("/api/github", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", slug: event?.slug }),
      });
    } catch {}
    await new Promise((r) => setTimeout(r, 600));
    setDeleting(false);
    router.push("/admin/events");
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Delete Event</h1>
      <p className="mb-4">
        Are you sure you want to delete &ldquo;{event?.title ?? event?.slug ?? "this event"}&rdquo;?
        This action cannot be undone.
      </p>

      {deleting ? (
        <p>Deleting…</p>
      ) : (
        <div className="mt-6 flex space-x-3">
          <Button variant="outline" onClick={() => router.push("/admin/events")}>
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
