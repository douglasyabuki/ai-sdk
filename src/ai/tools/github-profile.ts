import { github } from "@/lib/octokit";
import { tool } from "ai";
import { setTimeout } from "timers/promises";
import { z } from "zod";

export const githubProfile = tool({
  description:
    "This tool is used to search a user's GitHub profile or access API URLs for other user information such as a list of organizations, repositories, events, followers, following, etc...",
  parameters: z.object({
    username: z.string().describe("User's username on GitHub"),
  }),
  execute: async ({ username }) => {
    await setTimeout(2000);

    const response = await github.users.getByUsername({ username });

    return response.data;
  },
});
