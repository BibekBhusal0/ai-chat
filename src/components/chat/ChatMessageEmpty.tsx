import { Suggestions } from "./ChatSuggestedCommands.tsx";

interface ChatMessagesProps {
  onSubmit: (message: string) => void
}

export default function ChatMessageEmpty({ onSubmit }: ChatMessagesProps) {
  return (
    <div className="p-4 h-full flex flex-col justify-between">
      <div />
      <div className="text-4xl text-center">How can I help you</div>
      <Suggestions onSubmit={onSubmit} />
    </div>
  );
}


