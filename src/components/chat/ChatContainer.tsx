import React, { useState } from "react";

import { useChatStore } from "../../store/chatStore";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import ChatMessageEmpty from "./ChatMessageEmpty";

export default function ChatContainer() {
  const {
    activeChatId,
    simulateResponse,
    chats,
    createNewChat,
    changeModel,
    setActiveChat,
  } = useChatStore();
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const [tempModel, setTempModel] = useState("gpt-4");

  const activeChat = chats.find((chat) => chat.id === activeChatId);

  // Scroll to bottom when messages change or when loading completes
  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeChat?.messages,]);

  const handleSubmit = (message: string) => {
    if (activeChat?.id) simulateResponse(activeChat.id, message);
    else {
      const newChatId = createNewChat(tempModel);
      setActiveChat(newChatId);
      simulateResponse(newChatId, message);
    }
  };

  return (
    <div className="flex h-full flex-col">
      {activeChat && <ChatHeader chat={activeChat} />}

      <div className="flex-1 overflow-y-auto p-3 md:p-0">
        <div className="mx-auto h-full max-w-3xl">
          {activeChat !== undefined ? (
            <ChatMessages
              onSubmit={handleSubmit}
              messages={activeChat.messages}
              chatId={activeChat.id}
            />
          ) : (
            <div className="h-full">
              <ChatMessageEmpty onSubmit={handleSubmit} />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="px-4 py-2 md:px-0 md:py-4">
        <div className="mx-auto max-w-3xl">
          <ChatInput
            onSubmit={handleSubmit}
            modelId={activeChat?.modelId || tempModel}
            onModelChange={(model_id) => {
              if (!activeChat?.modelId) {
                setTempModel(model_id);
                console.log(model_id);
              } else changeModel(activeChat.id, model_id);
            }}
          />
        </div>
      </div>
    </div>
  );
}
