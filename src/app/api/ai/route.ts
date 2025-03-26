import { openrouter } from "@/ai/open-router";
import { tools } from "@/ai/tools";
import { streamText } from "ai";
import { type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { messages } = await request.json();

  const result = streamText({
    model: openrouter.chat("openai/gpt-4o-2024-11-20"),
    tools,
    messages,
    maxSteps: 5,
    system: `Always reply in markdown without quotes at the beginning or end of the message.`,
  });

  return result.toDataStreamResponse();
}
