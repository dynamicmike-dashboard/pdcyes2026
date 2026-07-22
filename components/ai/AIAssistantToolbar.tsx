import { Button } from "@/components/Button";

export function AIAssistantToolbar({
  onGenerate,
}: {
  onGenerate: (type: "event-page" | "whatsapp" | "facebook" | "linkedin" | "email") => Promise<void> | void;
}) {
  return (
 
  onCaret>;onClick={() => onGenerate("event-page")}
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