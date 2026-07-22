import { useState } from "react";
import { Button } from "@/components/Button";
import { CharacterCounter } from "./CharacterCounter";

export function AIModal({
  open,
  onClose,
  type,
  initialValue,
  onAccept,
}: {
  open: boolean;
  onClose: () => void;
  type:
    | "event-page"
    | "whatsapp"
    | "facebook"
    | "linkedin"
    | "email";
  initialValue: string;
  onAccept: (value: string) => void;
}) {
  const [value, setValue] = useState(initialValue);
  const limits: Record<string, number> = {
    whatsapp: 400,
    facebook: 200,
    linkedin: 300,
    // event-page and email have no hard limit
  };
  const limit = limits[type] ?? 0;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            AI Generated – {type.replace("-", " ").toUpperCase()}
          </h2>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Generated copy (edit if needed)
          </label>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={type === "email" ? 8 : 4}
            className="w-full p-2 border rounded"
          />
          {limit > 0 && (
            <CharacterCounter value={value} limit={limit} />
          )}
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onAccept(value);
              onClose();
            }}
          >
            Use this
          </Button>
        </div>
      </div>
    </div>
  );
}