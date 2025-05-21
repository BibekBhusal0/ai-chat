import { Button, ScrollShadow } from "@heroui/react";
import { suggestedCommands } from "../../data/suggestions";

interface SuggestionsProps {
  onSubmit: (message: string) => void;
}

export const Suggestions = ({ onSubmit }: SuggestionsProps) => {
  return (
    <ScrollShadow hideScrollBar className="flex flex-nowrap gap-2" orientation="horizontal">
      <div className="flex gap-2">
        {suggestedCommands.map((command, index) => (
          <Button
            onPress={() => onSubmit(command.question)}
            key={index}
            className="flex h-14 flex-col items-start gap-0"
            variant="flat"
          >
            {command.question}
          </Button>
        ))}
      </div>
    </ScrollShadow>
  );
};
