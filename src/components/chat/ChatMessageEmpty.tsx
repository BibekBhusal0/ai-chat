import { cn } from "@heroui/react";
import { Suggestions } from "./ChatSuggestedCommands.tsx";
import { motion } from "motion/react";

interface ChatMessagesProps {
  onSubmit: (message: string) => void;
}

export default function ChatMessageEmpty({ onSubmit }: ChatMessagesProps) {
  return (
    <div className="flex h-full flex-col justify-between p-4">
      <div />
      <motion.div
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        initial={{
          filter: "blur(10px)",
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
        }}
        className={cn(
          "bg-size animate-bg-position p-2 text-center text-4xl font-semibold text-transparent",
          "bg-gradient-to-r from-warning-700 from-30% via-primary-700 via-50% to-danger-500 to-80% bg-[length:200%_auto] bg-clip-text"
        )}
      >
        How can I help you
      </motion.div>
      <Suggestions onSubmit={onSubmit} />
    </div>
  );
}
