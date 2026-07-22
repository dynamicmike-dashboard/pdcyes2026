"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";

export function EventRow({ event }: { event: any }) {
  const router = useRouter();
  const [openDelete, setOpenDelete] = useState(false);
  const [openClone, setOpenClone] = useState(false);
  const [newDate, setNewDate] = useState(event.date || "");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/github", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "delete",
          slug: event.slug,
          sha: event.sha,
          message: `Delete event: ${event.title}`,
        }),
      });

      if (!res.ok) throw new Error("Delete failed");
      setOpenDelete(false);
      window.location.reload();
    } catch (err: any) {
      alert(`Delete error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleClone = async () => {
    setLoading(true);
    const newSlug = `${event.slug}-copy-${Date.now().toString().slice(-4)}`;
    const clonedContent = `---
title: "${event.title} (Copy)"
date: "${newDate || event.date}"
time: "${event.time || ""}"
venue: "${event.venue || ""}"
image: "${event.image || ""}"
speaker1: "${event.speaker1 || ""}"
speaker2: "${event.speaker2 || ""}"
registration_link: "${event.registration_link || ""}"
featured: true
publish: true
---

${event.body || event.description || ""}
`;

    try {
      const res = await fetch("/api/github", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          slug: newSlug,
          content: clonedContent,
          message: `Clone event: ${event.title}`,
        }),
      });

      if (!res.ok) throw new Error("Clone failed");
      setOpenClone(false);
      window.location.reload();
    } catch (err: any) {
      alert(`Clone error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
        <td className="p-4">
          {event.image ? (
            <img
              src={event.image.startsWith("http") ? event.image : `https://raw.githubusercontent.com/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/main/${event.image}`}
              alt={event.title}
              className="w-12 h-12 object-cover rounded-lg shadow-xs"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-400">
              No Image
            </div>
          )}
        </td>
        <td className="p-4">
          <Link href={`/manage/events/${event.slug}/edit`} className="font-semibold text-gray-900 hover:text-primary transition-colors">
            {event.title}
          </Link>
        </td>
        <td className="p-4 text-gray-600 font-medium">{event.date ? new Date(event.date).toLocaleDateString() : "-"}</td>
        <td className="p-4 text-gray-600">{event.venue ?? "-"}</td>
        <td className="p-4">
          <span className="px-2.5 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-200">
            Published
          </span>
        </td>
        <td className="p-4 text-right">
          <div className="flex items-center justify-end space-x-2">
            <Link
              href={`/manage/events/${event.slug}/edit`}
              className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-lg hover:bg-primary/20 transition-colors"
            >
              Edit
            </Link>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setOpenClone(true)}
            >
              Clone
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => setOpenDelete(true)}
            >
              Delete
            </Button>
          </div>
        </td>
      </tr>

      {/* Clone Modal */}
      <Modal open={openClone} onClose={() => setOpenClone(false)}>
        <div className="p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Clone Event</h2>
          <p className="text-sm text-gray-600 mb-4">
            Creating a duplicate of “<span className="font-medium">{event.title}</span>”. Choose a date for the new event:
          </p>
          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-700 mb-1">New Event Date</label>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setOpenClone(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleClone}
            >
              {loading ? "Cloning…" : "Confirm Clone"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
        <div className="p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Delete Event?</h2>
          <p className="text-sm text-gray-600 mb-6">
            Are you sure you want to delete “<span className="font-semibold">{event.title}</span>”? This will remove the file from your GitHub repository.
          </p>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setOpenDelete(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
            >
              {loading ? "Deleting…" : "Delete Permanently"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}