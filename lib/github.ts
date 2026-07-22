import { Octokit } from "@octokit/core";

/**
 * Returns an Octokit instance.
 * If a NextAuth accessToken is available (GitHub login) we use it.
 * Otherwise we fall back to a PAT stored in GITHUB_PAT (for the hidden admin).
 */
export async function getOctokit(accessToken?: string) {
  const token =
    accessToken ||
    process.env.GITHUB_PAT; // <-- set this in .env for the hidden admin

  if (!token) {
    throw new Error("No GitHub token available (login or PAT)");
  }
  return new Octokit({ auth: token });
}

/**
 * Parses markdown front‑matter using gray‑matter.
 */
import matter from "gray-matter";

export function parseEventMarkdown(raw: string) {
  const { data, content } = matter(raw);
  return {
    frontmatter: data as Record<string, any>,
    body: content,
  };
}