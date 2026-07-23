import { parseEventMarkdown, getRepoDetails } from "./github";
import { EventData } from "./types";

const BRANCH = "main";

/**
 * Fetch all events from the default branch (public raw URL works for public repo)
 */
export async function getAllEvents() {
  const { owner, repo } = getRepoDetails();
  try {
    const token = process.env.GITHUB_PAT || process.env.GITHUB_TOKEN;
    const headers: Record<string, string> = token ? { Authorization: `token ${token}` } : {};
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/content/events?ref=${BRANCH}`,
      { headers, cache: "no-store" }
    );
    if (!res.ok) return [];
    const files: Array<{ name: string; download_url: string; sha: string }> = await res.json();

    const events: EventData[] = await Promise.all(
      files.map(async (f) => {
        try {
          const rawRes = await fetch(f.download_url, { cache: "no-store" });
          const raw = await rawRes.text();
          const { frontmatter, body } = parseEventMarkdown(raw);
          return ({
            slug: f.name.replace(/\.md$/, ""),
            sha: f.sha,
            ...frontmatter,
            body: body || "",
          } as unknown) as EventData;
        } catch {
          return null as any;
        }
      })
    );

    return events
      .filter(Boolean)
      .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());
  } catch {
    return [];
  }
}

/**
 * Fetch a single event by its slug
 */
export async function getEventBySlug(slug: string): Promise<EventData | null> {
  const { owner, repo } = getRepoDetails();

  // 1. Try raw CDN URL (Fast, no API rate-limiting)
  try {
    const rawRes = await fetch(
      `https://raw.githubusercontent.com/${owner}/${repo}/${BRANCH}/content/events/${slug}.md`,
      { cache: "no-store" }
    );
    if (rawRes.ok) {
      const raw = await rawRes.text();
      const { frontmatter, body } = parseEventMarkdown(raw);
      return ({
        slug,
        ...frontmatter,
        body: body || "",
        title: frontmatter.title || slug,
        date: frontmatter.date || "",
      } as unknown) as EventData;
    }
  } catch (e) {
    // fallback to REST API
  }

  // 2. Fallback to GitHub REST API
  try {
    const token = process.env.GITHUB_PAT || process.env.GITHUB_TOKEN;
    const headers: Record<string, string> = token ? { Authorization: `token ${token}` } : {};
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/content/events/${slug}.md?ref=${BRANCH}`,
      { headers, cache: "no-store" }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const raw = Buffer.from(data.content, "base64").toString("utf8");
    const { frontmatter, body } = parseEventMarkdown(raw);
    return ({
      slug,
      sha: data.sha,
      ...frontmatter,
      body: body || "",
      title: frontmatter.title || slug,
      date: frontmatter.date || "",
    } as unknown) as EventData;
  } catch {
    return null;
  }
}