import { NextRequest, NextResponse } from "next/server";
import matter from "gray-matter";
import { getOctokit, getRepoDetails, parseEventMarkdown } from "@/lib/github";
import { isUserAuthenticated, getGitHubToken } from "@/lib/simpleAuth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const authenticated = await isUserAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = await getGitHubToken();
  if (!token) {
    return NextResponse.json(
      { error: "GitHub PAT (GITHUB_PAT) is not configured in environment variables." },
      { status: 500 }
    );
  }

  const { action, ...data } = await req.json();
  const octokit = await getOctokit(token);
  const { owner, repo } = getRepoDetails();

  try {
    switch (action) {
      case "create": {
        const { slug, content, message } = data;
        await octokit.request(
          `PUT /repos/{owner}/{repo}/contents/content/events/{filename}`,
          {
            owner,
            repo,
            filename: `${slug}.md`,
            message,
            content: Buffer.from(content).toString("base64"),
            headers: { authorization: `token ${token}` },
          }
        );
        return NextResponse.json({ success: true });
      }
      case "clone": {
        const { sourceSlug, newSlug, newDate, message } = data;

        if (!sourceSlug || !newSlug) {
          return NextResponse.json({ error: "sourceSlug and newSlug are required" }, { status: 400 });
        }
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(newSlug)) {
          return NextResponse.json({ error: "Invalid new event slug" }, { status: 400 });
        }

        const sourceFile = await octokit.request(
          `GET /repos/{owner}/{repo}/contents/content/events/{filename}`,
          {
            owner,
            repo,
            filename: `${sourceSlug}.md`,
            headers: { authorization: `token ${token}` },
          }
        );
        const sourceContent = Buffer.from((sourceFile.data as any).content, "base64").toString("utf8");
        const { frontmatter, body } = parseEventMarkdown(sourceContent);
        const clonedFrontmatter = {
          ...frontmatter,
          title: `${frontmatter.title || sourceSlug} (Copy)`,
          ...(newDate ? { date: newDate } : {}),
          publish: false,
        };
        const clonedContent = matter.stringify(body, clonedFrontmatter);

        await octokit.request(
          `PUT /repos/{owner}/{repo}/contents/content/events/{filename}`,
          {
            owner,
            repo,
            filename: `${newSlug}.md`,
            message: message || `Clone event: ${frontmatter.title || sourceSlug}`,
            content: Buffer.from(clonedContent).toString("base64"),
            headers: { authorization: `token ${token}` },
          }
        );

        return NextResponse.json({ success: true, slug: newSlug });
      }
      case "update": {
        let { slug, content, message, sha } = data;
        if (!sha) {
          try {
            const existingFile = await octokit.request(
              `GET /repos/{owner}/{repo}/contents/content/events/{filename}`,
              {
                owner,
                repo,
                filename: `${slug}.md`,
                headers: { authorization: `token ${token}` },
              }
            );
            sha = (existingFile.data as any).sha;
          } catch (e: any) {
            // ignore if file doesn't exist
          }
        }

        const payload: Record<string, any> = {
          owner,
          repo,
          filename: `${slug}.md`,
          message,
          content: Buffer.from(content).toString("base64"),
          headers: { authorization: `token ${token}` },
        };
        if (sha) {
          payload.sha = sha;
        }

        await octokit.request(
          `PUT /repos/{owner}/{repo}/contents/content/events/{filename}`,
          payload as any
        );
        return NextResponse.json({ success: true });
      }
      case "delete": {
        let { slug, sha, message } = data;
        if (!sha) {
          try {
            const existingFile = await octokit.request(
              `GET /repos/{owner}/{repo}/contents/content/events/{filename}`,
              {
                owner,
                repo,
                filename: `${slug}.md`,
                headers: { authorization: `token ${token}` },
              }
            );
            sha = (existingFile.data as any).sha;
          } catch (e: any) {
            // ignore
          }
        }

        if (!sha) {
          return NextResponse.json({ error: "File not found or sha unavailable" }, { status: 404 });
        }

        await octokit.request(
          `DELETE /repos/{owner}/{repo}/contents/content/events/{filename}`,
          {
            owner,
            repo,
            filename: `${slug}.md`,
            sha,
            message,
            headers: { authorization: `token ${token}` },
          }
        );
        return NextResponse.json({ success: true });
      }
      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    try {
      const { getAllEvents } = await import("@/lib/content");
      const events = await getAllEvents();
      return NextResponse.json(events);
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }

  const token = await getGitHubToken();
  const octokit = await getOctokit(token ?? undefined);
  const { owner, repo } = getRepoDetails();

  try {
    const { data } = await octokit.request(
      `GET /repos/{owner}/{repo}/contents/content/events/{filename}`,
      {
        owner,
        repo,
        filename: `${slug}.md`,
        headers: token ? { authorization: `token ${token}` } : undefined,
      }
    );
    const content = Buffer.from(data.content, "base64").toString("utf8");
    return NextResponse.json({ content, sha: data.sha });
  } catch (err: any) {
    if (err.status === 404) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
