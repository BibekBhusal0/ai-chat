import React from "react";
import { Button, cn, Textarea, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";
import ModelSelector from "../models/ModelSelector";

interface ChatInputProps {
  onSubmit: (message: string) => void;
  onModelChange: (modelId: string) => void;
  modelId: string;
}

export default function ChatInput({ onSubmit, onModelChange, modelId }: ChatInputProps) {
  const [prompt, setPrompt] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt.trim()) return;

    onSubmit(prompt);
    setPrompt("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Submit on Enter (without shift)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("relative w-full rounded-medium bg-default-100",
        "flex flex-col items-start", 'border-2 border-default-300 focus-within:border-default-600 transition-border')}
    >
      <Textarea
        placeholder="Ask me anything ..."
        variant="flat"
        value={prompt}
        onValueChange={setPrompt}
        minRows={2}
        maxRows={5}
        onKeyDown={handleKeyDown}
        classNames={{
          inputWrapper: "!bg-transparent shadow-none  ",
          innerWrapper: "relative",
          input: "pt-1 pl-2 pb-6 !pr-10 text-medium ",
        }}
      />

      <div className="flex w-full items-center justify-between px-3 pb-3">
        <div className="flex items-center gap-2">
          <ModelSelector selectedModelId={modelId} onModelChange={onModelChange} />

          <Tooltip content="Upload file">
            <Button isIconOnly variant="flat" size="sm">
              <Icon icon="lucide:paperclip" width={18} />
            </Button>
          </Tooltip>

          <Tooltip content="Voice input">
            <Button isIconOnly variant="flat" size="sm">
              <Icon icon="lucide:mic" width={18} />
            </Button>
          </Tooltip>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-xs text-default-400">
            {prompt.length > 0 ? `${prompt.length} characters` : ""}
          </div>
          <Button
            isIconOnly
            type="submit"
            color={prompt.trim() ? "primary" : "default"}
            isDisabled={!prompt.trim()}
            size="sm"
          >
            <Icon icon="lucide:send" width={16} />
          </Button>
        </div>
      </div>
    </form>
  );
}
