import { MoreHorizontal } from "lucide-react";

export function ChatHeader() {
  return (
    <div className="flex items-center justify-between self-stretch border-b border-zinc-900 bg-zinc-950 px-5 py-4">
      <span className="text-sm text-zinc-100">
        How to create Next.js applications with TypeScript
      </span>

      <button className="flex size-6 cursor-pointer items-center justify-center rounded-md border border-zinc-800 font-medium text-zinc-400 uppercase hover:bg-zinc-900">
        <MoreHorizontal className="size-4" />
        <span className="sr-only">Chat actions</span>
      </button>
    </div>
  );
}
