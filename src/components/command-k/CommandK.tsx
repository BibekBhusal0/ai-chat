import React from "react";
import { Command } from "cmdk";
import { format, parseISO } from "date-fns";
import { Icon } from "@iconify/react";

import { useChatStore } from "../../store/chatStore";
import "./command-k.css";

interface CommandKProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CommandK({ open, onOpenChange }: CommandKProps) {
  const { chats, setActiveChat } = useChatStore();
  const [search, setSearch] = React.useState("");

  // Close with escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onOpenChange]);

  // Flatten all messages from all chats for searching
  const allMessages = React.useMemo(() => {
    return chats.flatMap((chat) =>
      chat.messages.map((message) => ({
        chatId: chat.id,
        chatTitle: chat.title,
        message,
      }))
    );
  }, [chats]);

  // Filter messages based on search
  const filteredMessages = React.useMemo(() => {
    if (!search) return [];

    return allMessages.filter(
      (item) =>
        item.message.content.toLowerCase().includes(search.toLowerCase()) ||
        item.chatTitle.toLowerCase().includes(search.toLowerCase())
    );
  }, [allMessages, search]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-16">
      <div className="w-full max-w-2xl rounded-lg bg-content1 shadow-lg">
        <Command
          className="command-k"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              onOpenChange(false);
              e.preventDefault();
            }
          }}
        >
          <div className="flex items-center border-b border-divider p-2">
            <Icon icon="lucide:search" className="ml-2 text-default-400" width={16} />
            <Command.Input
              autoFocus
              value={search}
              onValueChange={setSearch}
              placeholder="Search messages..."
              className="flex-1 border-none bg-transparent px-2 py-2 text-sm outline-none"
            />
            <div className="mr-2 rounded border border-divider px-1.5 py-0.5 text-xs text-default-400">
              ESC
            </div>
          </div>

          <Command.List className="max-h-96 overflow-y-auto p-2">
            {search === "" ? (
              <div className="py-6 text-center text-sm text-default-400">
                Type to search across all chats...
              </div>
            ) : filteredMessages.length === 0 ? (
              <div className="py-6 text-center text-sm text-default-400">
                No results found for "{search}"
              </div>
            ) : (
              <Command.Group heading="Messages">
                {filteredMessages.map((item) => (
                  <Command.Item
                    key={item.message.id}
                    onSelect={() => {
                      setActiveChat(item.chatId);
                      onOpenChange(false);
                    }}
                    className="flex cursor-pointer flex-col gap-1 rounded-md p-2 text-sm hover:bg-default-100"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.chatTitle}</span>
                      <span className="text-xs text-default-400">
                        {format(parseISO(item.message.timestamp), "MMM d, yyyy")}
                      </span>
                    </div>
                    <div className="line-clamp-2 text-default-500">
                      <span className="mr-1 font-medium">
                        {item.message.role === "user" ? "You:" : "AI:"}
                      </span>
                      {item.message.content}
                    </div>
                  </Command.Item>
                ))}
              </Command.Group>
            )}
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
