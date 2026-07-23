"use client";
import { useMemo } from "react";

export default function MarkdownBody({ content }: { content?: string }) {
  const html = useMemo(() => {
    const text = typeof content === "string" ? content : String(content ?? "");
    if (!text.trim()) return "";
    return text
      .split("\n\n")
      .map((para) => `<p>${para.replace(/\n/g, "<br/>")}</p>`)
      .join("");
  }, [content]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}