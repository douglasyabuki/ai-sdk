import { Plus } from "lucide-react";
import { ChatHistory } from "./chat-history";

export function Sidebar() {
  return (
    <aside className="h-dvh space-y-4 border-r border-zinc-900 bg-zinc-950 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium tracking-tight text-zinc-400">
          Recent chats
        </span>

        <button className="flex size-6 cursor-pointer items-center justify-center rounded-md border border-zinc-800 text-sm font-medium text-zinc-400 uppercase hover:bg-zinc-900">
          <Plus className="size-4" />
          <span className="sr-only">New chat</span>
        </button>
      </div>

      <ChatHistory />
    </aside>
  );
}
