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

  const handleDelete = async () => {
    // In a real app call /api/github with action:"delete"
    setOpenDelete(false);
    alert(`Deleted ${event.title}`); // placeholder
    router.refresh();
  };

  return (
    <>
      <tr className="border-b hover:bg-gray-50">
        <td className="p-3">
          {event.image && (
            <img
              src={`https://raw.githubusercontent.com/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/main/${event.image}`}
              alt={event.title}
              className="w-16 h-16 object-cover rounded"
            />
          )}
        </td>
        <td className="p-3">
          <Link href={`/admin/events/${event.slug}/edit`} className="font-medium">
            {event.title}
          </Link>
        </td>
        <td className="p-3">{new Date(event.date).toLocaleDateString()}</td>
        <td className="p-3">{event.venue ?? "-"}</td>
        <td className="p-3">
          <span className="px-2 py-0.5 bg-primary/10 text-primary rounded">
            Live
          </span>
        </td>
        <td className="p-3 flex space-x-2">
          <Link
            href={`/admin/events/${event.slug}/edit`}
            className="text-sm text-primary hover:underline"
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
        </td>
      </tr>

      {/* Clone Modal */}
      <Modal open={openClone} onClose={() => setOpenClone(false)}>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Clone Event</h2>
          <p className="mb-4">
            This will create a copy of “{event.title}”. You can edit the date
            and other fields before saving.
          </p>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">New Date</label>
            <input
              type="date"
              defaultValue={event.date}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setOpenClone(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setOpenClone(false);
                alert("Cloning logic goes here – create new file with new slug");
              }}
            >
              Create Event
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Delete Event?</h2>
          <p className="mb-4">
            Are you sure you want to delete “{event.title}”? This action cannot
            be undone.
          </p>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setOpenDelete(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
            >
              Delete Permanently
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}