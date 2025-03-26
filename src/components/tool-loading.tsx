import { Loader2 } from "lucide-react";

export function ToolLoading({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-zinc-900 px-3 py-1 text-sm text-white">
      <Loader2 className="size-3 animate-spin" />
      <span>{text}</span>
    </div>
  );
}
