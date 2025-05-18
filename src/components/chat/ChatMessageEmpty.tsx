import { cn } from "@heroui/react";
import { Suggestions } from "./ChatSuggestedCommands.tsx";

interface ChatMessagesProps {
  onSubmit: (message: string) => void
}

export default function ChatMessageEmpty({ onSubmit }: ChatMessagesProps) {
  return (
    <div className="p-4 h-full flex flex-col justify-between">
      <div />
      <div className={ cn("text-4xl text-center font-semibold bg-size animate-bg-position text-transparent",
        "bg-gradient-to-r from-warning-500 from-30% via-primary-700 via-50% to-danger-500 to-80% bg-[length:200%_auto] bg-clip-text ") }>How can I help you</div>
      <Suggestions onSubmit={onSubmit} />
    </div>
  );
}


