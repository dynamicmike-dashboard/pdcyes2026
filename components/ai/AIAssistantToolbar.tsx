"use client";
import { Button } from "@/components/Button";

export function AIAssistantToolbar({
  onGenerate,
}: {
  onGenerate: (
    type: "event-page" | "whatsapp" | "facebook" | "linkedin" | "email"
  ) => Promise<void> | void;
}) {
  return (
    <div className="flex flex-wrap gap-2 my-4 p-3 bg-gray-50 rounded border">
      <Button
        variant="primary"
        size="sm"
        onClick={() => onGenerate("event-page")}
      >
        Generate Event Page
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => onGenerate("whatsapp")}
      >
        Generate WhatsApp Post
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => onGenerate("facebook")}
      >
        Generate Facebook Post
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => onGenerate("linkedin")}
      >
        Generate LinkedIn Post
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => onGenerate("email")}
      >
        Generate Email Invitation
      </Button>
    </div>
  );
}
