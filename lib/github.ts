import { Octokit } from "@octokit/core";
import matter from "gray-matter";

/**
 * Returns clean owner and repo values even if GITHUB_REPO is a full URL
 * or GITHUB_OWNER is a placeholder.
 */
export function getRepoDetails() {
  let owner = process.env.GITHUB_OWNER || "dynamicmike-dashboard";
  let repo = process.env.GITHUB_REPO || "pdcyes2026";

  if (repo.includes("github.com")) {
    const parts = repo.replace(/\.git$/, "").split("github.com/")[1]?.split("/") || [];
    if (parts.length >= 2) {
      if (!owner || owner === "your_github_username_or_org") {
        owner = parts[0];
      }
      repo = parts[1];
    }
  }

  if (!owner || owner === "your_github_username_or_org") {
    owner = "dynamicmike-dashboard";
  }
  if (!repo || repo.includes("github.com")) {
    repo = "pdcyes2026";
  }

  return { owner, repo };
}

/**
 * Returns formatted image URL from relative path or absolute URL.
 */
export function getImageUrl(imagePath?: string) {
  if (!imagePath) return "/images/placeholder.jpg";
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://") || imagePath.startsWith("/")) {
    return imagePath;
  }
  const { owner, repo } = getRepoDetails();
  return `https://raw.githubusercontent.com/${owner}/${repo}/main/${imagePath}`;
}

/**
 * Returns an Octokit instance.
 * If a NextAuth accessToken is available (GitHub login) we use it.
 * Otherwise we fall back to a PAT stored in GITHUB_PAT.
 */
export async function getOctokit(accessToken?: string) {
  const token =
    accessToken ||
    process.env.GITHUB_PAT ||
    process.env.GITHUB_TOKEN;

  if (!token) {
    throw new Error("No GitHub token available (login or PAT)");
  }
  return new Octokit({ auth: token });
}

/**
 * Parses markdown front-matter using gray-matter with safe fallback parser.
 */
export function parseEventMarkdown(raw: string) {
  if (!raw) return { frontmatter: {}, body: "" };
  try {
    const { data, content } = matter(raw);
    return {
      frontmatter: (data || {}) as Record<string, any>,
      body: content || "",
    };
  } catch (err) {
    // Fallback manual parser if YAML parsing fails due to unescaped characters
    try {
      const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
      if (match) {
        const frontmatterStr = match[1];
        const body = match[2];
        const data: Record<string, any> = {};
        frontmatterStr.split("\n").forEach((line) => {
          const colonIdx = line.indexOf(":");
          if (colonIdx > 0) {
            const key = line.slice(0, colonIdx).trim();
            let val = line.slice(colonIdx + 1).trim();
            if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
            if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
            data[key] = val;
          }
        });
        return { frontmatter: data, body: body || "" };
      }
    } catch (e) {
      // ignore fallback error
    }
    return { frontmatter: {}, body: raw };
  }
}