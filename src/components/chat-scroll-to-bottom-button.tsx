"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export type ScrollButtonProps = {
  scrollRef: React.RefObject<HTMLElement | null>;
  containerRef: React.RefObject<HTMLElement | null>;
  className?: string;
  threshold?: number;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function ChatScrollToBottomButton({
  scrollRef,
  containerRef,
  className,
  threshold = 100,
  ...props
}: ScrollButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        setIsVisible(scrollTop + clientHeight < scrollHeight - threshold);
      }
    };

    const container = containerRef.current;

    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [containerRef, threshold]);

  const handleScroll = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <button
      onClick={handleScroll}
      aria-hidden={!isVisible}
      className="absolute bottom-4 left-1/2 flex -translate-x-1/2 translate-y-0 scale-100 cursor-pointer items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-black opacity-100 shadow-md transition-all duration-150 ease-out aria-hidden:pointer-events-none aria-hidden:translate-y-4 aria-hidden:scale-95 aria-hidden:opacity-0"
      {...props}
    >
      Scroll down
      <ChevronDown className="size-3" />
    </button>
  );
}
