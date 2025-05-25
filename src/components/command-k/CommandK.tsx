import React from "react";
import { Command } from "cmdk";
import { Icon } from "@iconify/react";

import { useChatStore } from "../../store/chatStore";
import "./command-k.css";
import { Button } from "@heroui/react";

interface CommandKProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CommandK({ open, onOpenChange }: CommandKProps) {
  const { chats, simulateResponse, setActiveChat, createNewChat } = useChatStore();
  const [search, setSearch] = React.useState("");

  const handleOpenChange = (newOpenState: boolean) => {
    onOpenChange(newOpenState);
    if (!newOpenState) {
      setSearch("");
    }
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleOpenChange(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleOpenChange]);

  const filteredChats = React.useMemo(() => {
    if (!search) return chats;
    return chats.filter((chat) => chat.title.toLowerCase().includes(search.toLowerCase()));
  }, [chats, search]);
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-16 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleOpenChange(false);
        }
      }}
    >
      <div className="w-full max-w-2xl rounded-lg bg-content1 shadow-lg">
        <Command
          className="command-k"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              handleOpenChange(false);
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
              placeholder="Search chats..."
              className="flex-1 border-none bg-transparent px-2 py-2 text-sm outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && filteredChats.length === 0 && search !== "") {
                  const newChatId = createNewChat("gpt-4");
                  setActiveChat(newChatId);
                  simulateResponse(newChatId, search);
                  handleOpenChange(false);
                }
              }}
            />
            <div className="mr-2 rounded border border-divider px-1.5 py-0.5 text-xs text-default-400">
              ESC
            </div>
          </div>

          <Command.List className="max-h-96 overflow-y-auto p-2">
            {chats.length === 0 ? (
              <div className="py-6 text-center text-sm text-default-400">
                <div className="mb-4">No chats available</div>
                <Button
                  onPress={() => {
                    createNewChat("gpt-4");
                    handleOpenChange(false);
                  }}
                >
                  Create new chat
                </Button>
              </div>
            ) : filteredChats.length === 0 ? (
              <div className="py-6 text-center text-sm text-default-400">
                <div>No results found for "{search}"</div>
                <div>Press Enter to create a new chat</div>
              </div>
            ) : (
              filteredChats.map((chat) => (
                <Command.Item
                  key={chat.id}
                  id={chat.id}
                  onSelect={() => {
                    setActiveChat(chat.id);
                    handleOpenChange(false);
                  }}
                  className="flex cursor-pointer flex-col gap-1 rounded-md p-2 text-sm hover:bg-default-100"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{chat.title}</span>
                    <div className="hidden">{chat.id}</div>
                  </div>
                </Command.Item>
              ))
            )}
          </Command.List>
        </Command>
      </div>
    </div>
  );
}

