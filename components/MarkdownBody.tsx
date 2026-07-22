"use client";
import { useMemo } from "react";

export default function MarkdownBody({ content }: { content: string }) {
  // Very simple markdown‑to‑html conversion – for production use a library like `remark` or `marked`.
  const html = useMemo(() => {
    return content
      .split("\n\n")
      .map((para) => `<p>${para.replace(/\n/g, "<br/>")}</p>`)
      .join("");
  }, [content]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}