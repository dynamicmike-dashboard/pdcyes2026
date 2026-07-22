import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import OpenAI from "openai";

async function getSession(req: NextRequest) {
  return (await auth()) as any;
}

export async function POST(req: NextRequest) {
  const session = await getSession(req);
  if (!session?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY not configured" },
      { status: 500 }
    );
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const { type, context } = await req.json();

  let systemPrompt = "You are an expert copywriter for the PDCYES community.";
  let userPrompt = "";

  switch (type) {
    case "event-page":
      userPrompt = `
        Write an engaging event-page description (markdown-friendly) for the following event:
        Title: ${context.title}
        Date: ${context.date}
        Time: ${context.time}
        Venue: ${context.venue}
        Speakers: ${context.speaker1 ?? ""}${
        context.speaker2 ? ", " + context.speaker2 : ""
      }
        Existing description (if any): ${context.description ?? ""}
        Registration link: ${context.registration_link ?? ""}
        ${context.extraPrompt ?? ""}
        Keep the tone warm, inspirational and community-focused. End with a clear call-to-action to register.
      `;
      break;
    case "whatsapp":
      userPrompt = `
        Create a WhatsApp-style message (max ~400 characters) promoting the event:
        Title: ${context.title}
        Date: ${context.date}
        Time: ${context.time}
        Venue: ${context.venue}
        Registration link: ${context.registration_link ?? ""}
        ${context.extraPrompt ?? ""}
        Use a friendly tone, include emojis if appropriate, and end with a clear CTA.
      `;
      break;
    case "facebook":
      userPrompt = `
        Write a Facebook caption (max ~200 characters) for the event:
        Title: ${context.title}
        Date: ${context.date}
        Time: ${context.time}
        Venue: ${context.venue}
        Registration link: ${context.registration_link ?? ""}
        ${context.extraPrompt ?? ""}
        Keep it engaging, include a hashtag or two, and end with a CTA.
      `;
      break;
    case "linkedin":
      userPrompt = `
        Write a LinkedIn update (150-300 words) announcing the event:
        Title: ${context.title}
        Date: ${context.date}
        Time: ${context.time}
        Venue: ${context.venue}
        Speakers: ${context.speaker1 ?? ""}${
        context.speaker2 ? ", " + context.speaker2 : ""
      }
        Registration link: ${context.registration_link ?? ""}
        ${context.extraPrompt ?? ""}
        Use a professional yet inviting tone suitable for a professional network.
      `;
      break;
    case "email":
      userPrompt = `
        Write an HTML email invitation (subject + body) for the event:
        Title: ${context.title}
        Date: ${context.date}
        Time: ${context.time}
        Venue: ${context.venue}
        Speakers: ${context.speaker1 ?? ""}${
        context.speaker2 ? ", " + context.speaker2 : ""
      }
        Registration link: ${context.registration_link ?? ""}
        ${context.extraPrompt ?? ""}
        Include a warm greeting, event details, benefits, and a clear registration button/link.
      `;
      break;
    default:
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const generated = completion.choices[0]?.message?.content?.trim() ?? "";

    return NextResponse.json({ generated });
  } catch (err: any) {
    return NextResponse.json(
      { error: "AI generation failed", details: err?.message ?? String(err) },
      { status: 500 }
    );
  }
}
