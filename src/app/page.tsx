import { Chat } from "@/components/chat";

export default function Home() {
  return (
    <div className="relative mx-auto flex h-dvh w-full max-w-3xl flex-col justify-between gap-6 py-6">
      <Chat />
    </div>
  );
}
