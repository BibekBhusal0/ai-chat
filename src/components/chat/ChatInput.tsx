import React from "react";
import { Button, Textarea, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";

import { useChatStore } from "../../store/chatStore";
import ModelSelector from "../models/ModelSelector";

interface ChatInputProps {
  chatId: string;
  modelId: string;
}

export default function ChatInput({ chatId, modelId }: ChatInputProps) {
  const [prompt, setPrompt] = React.useState("");
  const { simulateResponse, isLoading } = useChatStore();
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim() || isLoading) return;
    
    simulateResponse(chatId, prompt);
    setPrompt("");
    
    // Focus back on textarea after submission
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 0);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Submit on Enter (without shift)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  const handleModelChange = (newModelId: string) => {
    // In a real app, you would update the model for the current chat
    console.log("Model changed to:", newModelId);
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="relative rounded-lg border border-divider bg-content1">
        <Textarea
          ref={textareaRef}
          value={prompt}
          onValueChange={setPrompt}
          placeholder="Message the AI..."
          minRows={2}
          maxRows={8}
          onKeyDown={handleKeyDown}
          classNames={{
            inputWrapper: "shadow-none",
            input: "pr-12",
          }}
          disabled={isLoading}
        />
        
        <div className="absolute bottom-2 right-2">
          <Button
            isIconOnly
            type="submit"
            color={prompt.trim() ? "primary" : "default"}
            isDisabled={!prompt.trim() || isLoading}
            size="sm"
          >
            <Icon icon="lucide:send" width={16} />
          </Button>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ModelSelector selectedModelId={modelId} onModelChange={handleModelChange} />
          
          <Tooltip content="Upload file">
            <Button isIconOnly variant="flat" className="h-9 min-w-0 px-2">
              <Icon icon="lucide:paperclip" width={18} />
            </Button>
          </Tooltip>
          
          <Tooltip content="Voice input">
            <Button isIconOnly variant="flat" className="h-9 min-w-0 px-2">
              <Icon icon="lucide:mic" width={18} />
            </Button>
          </Tooltip>
        </div>
        
        <div className="text-xs text-default-400">
          {prompt.length > 0 ? `${prompt.length} characters` : ""}
        </div>
      </div>
    </form>
  );
}