import React from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  cn,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Listbox,
  ListboxItemProps,
  ListboxItem,
} from "@heroui/react";
import { Icon } from "@iconify/react";

import { useChatStore } from "../../store/chatStore";
import type { ChatSession } from "../../types";

interface ChatItemProps {
  chat: ChatSession;
  isActive: boolean;
  onClick: () => void;
}

export default function ChatItem({ chat, isActive, onClick }: ChatItemProps) {
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalOpenChange,
  } = useDisclosure();
  const { togglePinChat, deleteChat, models } = useChatStore();
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  const model = models.find((m) => m.id === chat.modelId);

  const handleDelete = () => {
    onDeleteModalOpen();
    setIsPopoverOpen(false);
  };

  const confirmDelete = () => {
    deleteChat(chat.id);
  };

  const handlePin = () => {
    togglePinChat(chat.id);
  };

  const buttonConfigs: (Omit<ListboxItemProps, "startContent"> & {
    startContent: string;
    onPress: any;
  })[] = [
    {
      children: chat.pinned ? "Unpin" : "Pin",
      startContent: chat.pinned ? "lucide:pin-off" : "lucide:pin",
      onPress: handlePin,
    },
    {
      children: "Share",
      startContent: "lucide:share",
      onPress: null,
    },
    {
      children: "Export",
      startContent: "lucide:download",
      onPress: null,
    },
    {
      children: "Delete",
      startContent: "lucide:trash-2",
      onPress: handleDelete,
      className: "text-danger",
      color: "danger",
    },
  ];
  const commonProps: ListboxItemProps = {
    classNames: { title: "text-md" },
  };

  return (
    <>
      <div className="group relative">
        <div
          className={cn(
            `relative mb-1 flex cursor-pointer items-center rounded-md p-2`,
            isActive ? "bg-default-200" : "hover:bg-default-100"
          )}
          onClick={onClick}
        >
          <div
            className={cn(
              "mr-3 flex h-8 w-8 items-center justify-center rounded-full",
              isActive ? "bg-default-50" : "bg-default-200"
            )}
          >
            <Icon icon={model?.icon || "lucide:message-square"} width={16} />
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center justify-between">
              <p className="truncate text-sm font-medium">{chat.title}</p>
            </div>
            <p className="truncate text-xs text-default-500">
              {chat.messages[chat.messages.length - 1]?.content.substring(0, 30) || "New chat"}
              {chat.messages[chat.messages.length - 1]?.content.length > 30 ? "..." : ""}
            </p>
          </div>
        </div>

        <Popover isOpen={isPopoverOpen} onOpenChange={setIsPopoverOpen} placement="right-start">
          <PopoverTrigger>
            <Button
              isIconOnly
              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              size="sm"
              variant="faded"
              aria-label="More actions"
              onPress={() => setIsPopoverOpen(!isPopoverOpen)}
            >
              <Icon width={17} icon="lucide:more-vertical" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <Listbox className="">
              {buttonConfigs.map((buttonConfig, index) => (
                <ListboxItem
                  key={index}
                  {...commonProps}
                  {...buttonConfig}
                  className={cn(commonProps.className, buttonConfig.className)}
                  startContent={<Icon width={16} icon={buttonConfig.startContent} />}
                />
              ))}
            </Listbox>
          </PopoverContent>
        </Popover>
      </div>

      <Modal isOpen={isDeleteModalOpen} onOpenChange={onDeleteModalOpenChange}>
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
                <Button
                  color="danger"
                  onPress={() => {
                    confirmDelete();
                    onClose();
                  }}
                >
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
