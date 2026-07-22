import { NextRequest, NextResponse } from "next/server";
import { getOctokit } from "@/lib/github";
import { auth } from "@/lib/auth";

async function getAuthToken(req: NextRequest) {
  const session = (await auth()) as any;
  return session?.accessToken ?? null;
}

export async function POST(req: NextRequest) {
  const token = await getAuthToken(req);
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { action, ...data } = await req.json();
  const octokit = await getOctokit(token);

  try {
    switch (action) {
      case "create": {
        const { slug, content, message } = data;
        await octokit.request(
          `PUT /repos/{owner}/{repo}/contents/content/events/{filename}`,
          {
            owner: process.env.GITHUB_OWNER!,
            repo: process.env.GITHUB_REPO!,
            filename: `${slug}.md`,
            message,
            content: Buffer.from(content).toString("base64"),
            headers: { authorization: `token ${token}` },
          }
        );
        return NextResponse.json({ success: true });
      }
      case "update": {
        const { slug, content, message, sha } = data;
        await octokit.request(
          `PUT /repos/{owner}/{repo}/contents/content/events/{filename}`,
          {
            owner: process.env.GITHUB_OWNER!,
            repo: process.env.GITHUB_REPO!,
            filename: `${slug}.md`,
            message,
            content: Buffer.from(content).toString("base64"),
            sha,
            headers: { authorization: `token ${token}` },
          }
        );
        return NextResponse.json({ success: true });
      }
      case "delete": {
        const { slug, sha, message } = data;
        await octokit.request(
          `DELETE /repos/{owner}/{repo}/contents/content/events/{filename}`,
          {
            owner: process.env.GITHUB_OWNER!,
            repo: process.env.GITHUB_REPO!,
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
  const token = await getAuthToken(req);
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

  const octokit = await getOctokit(token);
  try {
    const { data } = await octokit.request(
      `GET /repos/{owner}/{repo}/contents/content/events/{filename}`,
      {
        owner: process.env.GITHUB_OWNER!,
        repo: process.env.GITHUB_REPO!,
        filename: `${slug}.md`,
        headers: { authorization: `token ${token}` },
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