import { parseEventMarkdown, getRepoDetails } from "./github";
import { EventData } from "./types";

const BRANCH = "main";

/**
 * Fetch all events from the default branch (public raw URL works for public repo)
 */
export async function getAllEvents() {
  const { owner, repo } = getRepoDetails();
  try {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/content/events?ref=${BRANCH}`
    );
    if (!res.ok) return [];
    const files: Array<{ name: string; download_url: string; sha: string }> = await res.json();

    const events: EventData[] = await Promise.all(
      files.map(async (f) => {
        const rawRes = await fetch(f.download_url);
        const raw = await rawRes.text();
        const { frontmatter, body } = parseEventMarkdown(raw);
        return {
          slug: f.name.replace(/\.md$/, ""),
          ...frontmatter,
          body,
        } as EventData;
      })
    );

    // Sort by date descending
    return events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch {
    return [];
  }
}

/**
 * Fetch a single event by its slug
 */
export async function getEventBySlug(slug: string): Promise<EventData | null> {
  const { owner, repo } = getRepoDetails();
  try {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/content/events/${slug}.md?ref=${BRANCH}`
    );
    if (!res.ok) return null;
    const data = await res.json();
    const raw = Buffer.from(data.content, "base64").toString("utf8");
    const { frontmatter, body } = parseEventMarkdown(raw);
    return {
      slug,
      ...frontmatter,
      body,
    } as EventData;
  } catch {
    return null;
  }
}