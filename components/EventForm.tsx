import { useState } from "react";
import { Button } from "@/components/Button";
import { AIAssistantToolbar } from "@/components/ai/AIAssistantToolbar";
import { AIModal } from "@/components/ai/AIModal";

type FormValues = {
  title: string;
  date: string; // YYYY-MM-DD
  time: string;
  venue: string;
  image: string;
  speaker1: string;
  speaker2: string;
  description: string;
  registration_link: string;
  featured: boolean;
  publish: boolean;
  // AI-generated fields (optional)
  whatsapp_copy?: string;
  facebook_copy?: string;
  linkedin_copy?: string;
  email_copy?: string;
};

export function EventForm({
  initialValues,
  onSubmit,
  submitMessage,
}: {
  initialValues: Partial<FormValues>;
  onSubmit: (values: FormValues) => Promise<void> | void;
  submitMessage?: string;
}) {
  const [values, setValues] = useState<FormValues>({
    title: "",
    date: "",
    time: "",
    venue: "",
    image: "",
    speaker1: "",
    speaker2: "",
    description: "",
    registration_link: "",
    featured: false,
    publish: false,
    ...initialValues,
  });

  const [aiOpen, setAiOpen] = useState<false | {
    type: FormValues["whatsapp"] extends string ? "whatsapp" : never; // placeholder
    initial: string;
  }>(false);
  const [aiDraft, setAiDraft] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(values as FormValues);
  };

  // AI generation handler
  const handleGenerate = async (type: "event-page" | "whatsapp" | "facebook" | "linkedin" | "email") => {
    // Build context from current form values
    const ctx = {
      title: values.title,
      date: values.date,
      time: values.time,
      venue: values.venue,
      speaker1: values.speaker1,
      speaker2: values.speaker2,
      description: values.description,
      registration_link: values.registration_link,
      // optional extra prompt from user (could be added as a textarea)
      extraPrompt: "",
    };
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, context: ctx }),
      });
      if (!res.ok) throw new Error("Failed to generate");
      const data = await res.json();
      setAiDraft(data.generated ?? "");
      setAiOpen({ type: type as any, initial: data.generated ?? "" } as any);
    } catch (err: any) {
      alert(`AI generation failed: ${err.message ?? err}`);
    }
  };

  // Handle accepting AI-generated content
  const handleAiAccept = (value: string) => {
    const upd: Partial<FormValues> = {};
    switch (aiOpen?.type) {
      case "event-page":
        upd.description = value;
        break;
      case "whatsapp":
        upd.whatsapp_copy = value;
        break;
      case "facebook":
        upd.facebook_copy = value;
        break;
      case "linkedin":
        upd.linkedin_copy = value;
        break;
      case "email":
        upd.email_copy = value;
        break;
    }
    setValues((prev) => ({ ...prev, ...upd }));
    setAiOpen(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">Title*</label>
        <input
          name="title"
          value={values.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-1">Date*</label>
          <input
            name="date"
            type="date"
            value={values.date}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Time (e.g., 10:00-12:00)</label>
          <input
            name="time"
            value={values.time}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Venue</label>
        <input
          name="venue"
          value={values.venue}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Image URL (relative to /public)</label>
        <input
          name="image"
          value={values.image}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium mb-1">Speaker 1 (Name – Title)</label>
        <input
          name="speaker1"
          value={values.speaker1}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <label className="block text-sm font-medium mb-1">Speaker 2 (Name – Title)</label>
        <input
          name="speaker2"
          value={values.speaker2}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description (Markdown)</label>
        <textarea
          name="description"
          value={values.description}
          onChange={handleChange}
          rows={6}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Registration Link"label>
        <input
          name="registration_link"
          value={values.registration_link}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="flex items-center space-x-3">
        <label className="flex items-center cursor-pointer">
          <input
            name="featured"
            type="checkbox"
            checked={values.featured}
            onChange={handleChange}
            className="h-4 w-4 text-primary border-gray-300 rounded"
          />
          Featured on Home
        </label>
      </div>

      <div className="flex items-center space-x-3">
        <label className="flex items-center cursor-pointer">
          <input
            name="publish"
            type="checkbox"
            checked={values.publish}
            onChange={handleChange}
            className="h-4 w-4 text-primary border-gray-300 rounded"
          />
          Publish Immediately (uncheck to save as draft)
        </label>
      </div>

      {/* AI Assistant Toolbar */}
      <AIAssistantToolbar onGenerate={handleGenerate} />

      {/* AI Modal */}
      {aiOpen && (
        <AIModal
          open={true}
          onClose={() => setAiOpen(false)}
          type={aiOpen.type}
          initialValue={aiDraft}
          onAccept={handleAiAccept}
        />
      )}

      {submitMessage && (
        <p className="text-sm text-green-600">{submitMessage}</p>
      )}

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => {
            // reset or navigate back – here we just alert
            alert("Cancel – implement navigation as needed");
          }}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90"
        >
          {values.publish ? "Publish" : "Save Draft"}
        </button>
      </div>
    </form>
  );
}