import React from "react";
import { Spinner } from "@heroui/react";

import { useChatStore } from "../../store/chatStore";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

export default function ChatContainer() {
  const { activeChatId, chats, isLoading } = useChatStore();
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const activeChat = chats.find((chat) => chat.id === activeChatId);

  // Scroll to bottom when messages change or when loading completes
  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeChat?.messages, isLoading]);

  if (!activeChat) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>No chat selected</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <ChatHeader chat={activeChat} />

      <div className="flex-1 overflow-y-auto p-4">
        <div className="mx-auto max-w-3xl">
          <ChatMessages messages={activeChat.messages} chatId={activeChat.id} />

          {isLoading && (
            <div className="flex justify-center py-4">
              <Spinner size="md" />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="py-2">
        <div className="mx-auto max-w-3xl">
          <ChatInput chatId={activeChat.id} modelId={activeChat.modelId} />
        </div>
      </div>
    </div>
  );
}
