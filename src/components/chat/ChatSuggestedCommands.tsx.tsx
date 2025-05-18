import { Button, ScrollShadow } from "@heroui/react";

interface SuggestionsProps {
  onSubmit: (message: string) => void;
}

const suggestedCommands = [
  "Write a poem about the moon",
  "Explain quantum physics",
  "Translate 'hello' to Spanish",
  "Summarize the plot of Hamlet",
];

export const Suggestions = ({ onSubmit }: SuggestionsProps) => {
  return (
    <ScrollShadow hideScrollBar className="flex flex-nowrap gap-2" orientation="horizontal">
      <div className="flex gap-2">
        {suggestedCommands.map((command, index) => (
          <Button
            onPress={() => onSubmit(command)}
            key={index}
            className="flex h-14 flex-col items-start gap-0"
            variant="flat"
          >
            {command}
          </Button>
        ))}
      </div>
    </ScrollShadow>
  );
};
