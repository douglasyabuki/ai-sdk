function ChatHistoryItem({ isActive = false }: { isActive?: boolean }) {
  return (
    <button
      data-active={isActive}
      className="w-full cursor-pointer truncate rounded-md px-2.5 py-2 text-left text-sm text-zinc-100 hover:bg-zinc-900 data-active:bg-zinc-900"
    >
      How to create Next.js applications...
    </button>
  );
}

export function ChatHistory() {
  return (
    <div className="-mx-2.5 space-y-1">
      <ChatHistoryItem isActive />
      <ChatHistoryItem />
      <ChatHistoryItem />
      <ChatHistoryItem />
      <ChatHistoryItem />
      <ChatHistoryItem />
      <ChatHistoryItem />
      <ChatHistoryItem />
    </div>
  );
}
