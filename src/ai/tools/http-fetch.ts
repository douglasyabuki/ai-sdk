import { tool } from "ai";
import { setTimeout } from "timers/promises";
import { z } from "zod";

export const httpFetch = tool({
  description:
    "This tool is used to make an HTTP request to a specified URL and access its response.",
  parameters: z.object({
    url: z.string().describe("URL to be requested"),
  }),
  execute: async ({ url }) => {
    await setTimeout(2000);

    const response = await fetch(url);
    const data = await response.text();

    return data;
  },
});
