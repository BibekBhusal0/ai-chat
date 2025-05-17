import React from "react";
import { Button, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";

import { useChatStore } from "../../store/chatStore";
import type { ChatSession } from "../../types";

interface ChatHeaderProps {
  chat: ChatSession;
}

export default function ChatHeader({ chat }: ChatHeaderProps) {
  const { models } = useChatStore();
  
  const model = models.find((m) => m.id === chat.modelId);
  
  return (
    <div className="flex items-center justify-between border-b border-divider p-4">
      <div className="flex items-center">
        <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-default-100">
          <Icon icon={model?.icon || "lucide:message-square"} width={16} />
        </div>
        <div>
          <h2 className="text-lg font-medium">{chat.title}</h2>
          <p className="text-xs text-default-500">{model?.name || "AI Model"}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Tooltip content="Share">
          <Button isIconOnly variant="light">
            <Icon icon="lucide:share" width={18} />
          </Button>
        </Tooltip>
        
        <Tooltip content="Export">
          <Button isIconOnly variant="light">
            <Icon icon="lucide:download" width={18} />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}