import React from "react";
import { Button, Tooltip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { Icon } from "@iconify/react";
import { format, parseISO } from "date-fns";

import { useChatStore } from "../../store/chatStore";
import type { ChatSession } from "../../types";

interface ChatItemProps {
  chat: ChatSession;
  isActive: boolean;
  onClick: () => void;
}

export default function ChatItem({ chat, isActive, onClick }: ChatItemProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isHovered, setIsHovered] = React.useState(false);
  const { togglePinChat, deleteChat, models } = useChatStore();
  
  const model = models.find(m => m.id === chat.modelId);
  const formattedDate = format(parseISO(chat.date), "MMM d");
  
  const handleDelete = () => {
    onOpen();
  };
  
  const confirmDelete = () => {
    deleteChat(chat.id);
  };
  
  const handlePin = (e: React.MouseEvent) => {
    e.stopPropagation();
    togglePinChat(chat.id);
  };
  
  return (
    <>
      <div
        className={`group relative mb-1 flex cursor-pointer items-center rounded-md p-2 ${
          isActive ? "bg-default-100" : "hover:bg-default-50"
        }`}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-default-100">
          <Icon icon={model?.icon || "lucide:message-square"} width={16} />
        </div>
        
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center justify-between">
            <p className="truncate text-sm font-medium">{chat.title}</p>
            <span className="ml-2 text-xs text-default-400">{formattedDate}</span>
          </div>
          <p className="truncate text-xs text-default-500">
            {chat.messages[chat.messages.length - 1]?.content.substring(0, 30) || "New chat"}
            {chat.messages[chat.messages.length - 1]?.content.length > 30 ? "..." : ""}
          </p>
        </div>
        
        {(isHovered || chat.pinned) && (
          <div className="absolute right-2 top-2 flex gap-1">
            <Tooltip content={chat.pinned ? "Unpin" : "Pin"}>
              <Button
                isIconOnly
                size="sm"
                variant="light"
                className="min-w-0 h-6 w-6 bg-default-100"
                onPress={handlePin}
              >
                <Icon
                  icon={chat.pinned ? "lucide:pin-off" : "lucide:pin"}
                  className={chat.pinned ? "text-primary" : ""}
                  width={14}
                />
              </Button>
            </Tooltip>
            
            <Tooltip content="Delete">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                className="min-w-0 h-6 w-6 bg-default-100"
                onPress={handleDelete}
              >
                <Icon icon="lucide:trash-2" width={14} />
              </Button>
            </Tooltip>
          </div>
        )}
      </div>
      
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Delete Chat</ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete "{chat.title}"?</p>
                <p className="text-sm text-default-500">This action cannot be undone.</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="danger" onPress={() => {
                  confirmDelete();
                  onClose();
                }}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}