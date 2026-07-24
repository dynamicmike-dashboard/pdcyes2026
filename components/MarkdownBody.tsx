"use client";
import { useMemo } from "react";

export default function MarkdownBody({ content }: { content?: string }) {
  const html = useMemo(() => {
    let text = typeof content === "string" ? content : String(content ?? "");
    if (!text.trim()) return "";

    // 1. Tokenize Markdown links [text](url)
    const links: string[] = [];
    text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)/g, (_, label, url) => {
      const idx = links.length;
      links.push(
        `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-primary font-bold underline hover:text-primary/80 break-all">${label}</a>`
      );
      return `___LINK_TOKEN_${idx}___`;
    });

    // 2. Convert remaining raw URLs (https://... or http://...)
    text = text.replace(/(https?:\/\/[^\s<]+)/g, (url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-primary font-bold underline hover:text-primary/80 break-all">${url}</a>`;
    });

    // 3. Restore link tokens
    links.forEach((linkHtml, idx) => {
      text = text.replace(`___LINK_TOKEN_${idx}___`, linkHtml);
    });

    // 4. Bold **text**
    text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // 5. Italic *text*
    text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // 6. Split paragraphs
    return text
      .split("\n\n")
      .map((para) => `<p class="mb-4 text-gray-800 leading-relaxed">${para.replace(/\n/g, "<br/>")}</p>`)
      .join("");
  }, [content]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}