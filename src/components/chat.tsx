"use client";

import { useChat } from "@ai-sdk/react";
import { Bot, User2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { ChatScrollToBottomButton } from "./chat-scroll-to-bottom-button";
import { GithubProfile } from "./github-profile";
import { Markdown } from "./markdown";
import { MessageInput } from "./message-input";
import { ToolLoading } from "./tool-loading";

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    api: "/api/ai",
    initialMessages: [
      {
        id: "init-1",
        role: "assistant",
        content: "Hi, how can I help you today?",
      },
    ],
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "instant",
      });
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0 && status === "streaming" && containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, status]);

  return (
    <>
      <div className="relative flex-1">
        <div
          ref={containerRef}
          className="scrollbar scrollbar-thumb-rounded-full scrollbar-thumb-zinc-900 scrollbar-track-transparent absolute inset-0 space-y-6 overflow-y-scroll"
        >
          {messages.map((message) => {
            return (
              <div key={message.id} className="flex items-start gap-3">
                {message.role === "user" && (
                  <div className="flex size-7 items-center justify-center rounded-md bg-zinc-900">
                    <User2 className="size-4 text-zinc-100" />
                  </div>
                )}

                {message.role === "assistant" && (
                  <div className="flex size-7 items-center justify-center rounded-md bg-zinc-900">
                    <Bot className="size-4 text-zinc-400" />
                  </div>
                )}

                <div className="flex flex-col gap-4">
                  {message.content && (
                    <div className="prose prose-invert prose-zinc prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-h4:text-base prose-h5:text-sm prose-h6:text-xs flex-1">
                      <Markdown>{message.content}</Markdown>
                    </div>
                  )}

                  {message.parts.map((part) => {
                    if (part.type !== "tool-invocation") {
                      return null;
                    }

                    if (part.toolInvocation.state === "call") {
                      switch (part.toolInvocation.toolName) {
                        case "githubProfile":
                          return (
                            <ToolLoading
                              key={part.toolInvocation.toolCallId}
                              text="Loading information from GitHub..."
                            />
                          );
                        case "httpFetch":
                          return (
                            <ToolLoading
                              key={part.toolInvocation.toolCallId}
                              text="Performing HTTP request..."
                            />
                          );
                      }
                    }

                    if (part.toolInvocation.state === "result") {
                      switch (part.toolInvocation.toolName) {
                        case "githubProfile":
                          return (
                            <GithubProfile
                              key={part.toolInvocation.toolCallId}
                              user={part.toolInvocation.result}
                            />
                          );
                      }
                    }
                  })}
                </div>
              </div>
            );
          })}

          <div ref={bottomRef} />
        </div>

        <ChatScrollToBottomButton
          containerRef={containerRef}
          scrollRef={bottomRef}
        />
      </div>

      <MessageInput
        disabled={status === "streaming" || status === "submitted"}
        value={input}
        onValueChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </>
  );
}
