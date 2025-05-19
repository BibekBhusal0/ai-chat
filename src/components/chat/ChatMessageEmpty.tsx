import { cn } from "@heroui/react";
import { Suggestions } from "./ChatSuggestedCommands.tsx";

interface ChatMessagesProps {
  onSubmit: (message: string) => void;
}

export default function ChatMessageEmpty({ onSubmit }: ChatMessagesProps) {
  return (
    <div className="flex h-full flex-col justify-between p-4">
      <div />
      <div
        className={cn(
          "bg-size animate-bg-position p-2 text-center text-4xl font-semibold text-transparent",
          "bg-gradient-to-r from-warning-700 from-30% via-primary-700 via-50% to-danger-500 to-80% bg-[length:200%_auto] bg-clip-text"
        )}
      >
        How can I help you
      </div>
      <Suggestions onSubmit={onSubmit} />
    </div>
  );
}
