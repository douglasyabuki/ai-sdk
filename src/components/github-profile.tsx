import type { github } from "@/lib/octokit";
import { GetResponseTypeFromEndpointMethod } from "@octokit/types";

type GithubUser = GetResponseTypeFromEndpointMethod<
  typeof github.users.getByUsername
>["data"];

interface GithubProfileProps {
  user: GithubUser;
}

export function GithubProfile({ user }: GithubProfileProps) {
  return (
    <div className="flex gap-3 rounded-lg bg-zinc-950 p-6">
      <img
        src={user.avatar_url}
        alt={user.name ?? ""}
        className="size-10 rounded-full"
      />

      <div className="flex flex-col gap-1">
        <span className="text-lg font-medium">{user.name || user.login}</span>
        <p className="text-sm leading-relaxed text-zinc-400">{user.bio}</p>
      </div>
    </div>
  );
}
