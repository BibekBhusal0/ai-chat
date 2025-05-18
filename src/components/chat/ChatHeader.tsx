import {
  Button,
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ButtonProps,
  cn,
} from "@heroui/react";
import { Icon } from "@iconify/react";

import { useChatStore } from "../../store/chatStore";
import type { ChatSession } from "../../types";

interface ChatHeaderProps {
  chat: ChatSession;
}

export default function ChatHeader({ chat }: ChatHeaderProps) {
  const { models, togglePinChat, deleteChat } = useChatStore();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const model = models.find((m) => m.id === chat.modelId);

  const handlePin = () => togglePinChat(chat.id);

  const handleDelete = () => onOpen();

  const confirmDelete = () => deleteChat(chat.id);

  interface TooltipButtonProps extends ButtonProps {
    tooltip: string;
    icon: string;
  }

  const buttonConfigs: TooltipButtonProps[] = [
    {
      tooltip: chat.pinned ? "Unpin" : "Pin",
      icon: chat.pinned ? "lucide:pin-off" : "lucide:pin",
      onPress: handlePin,
    },
    {
      tooltip: "Share",
      icon: "lucide:share",
      onPress: () => { },
    },
    {
      tooltip: "Export",
      icon: "lucide:download",
      onPress: () => { },
    },
    {
      tooltip: "Delete",
      icon: "lucide:trash-2",
      onPress: handleDelete,
      color: "danger",
    },
  ];
  const commonButonProps: ButtonProps = {
    size: "sm",
    className: "text-md",
    variant: "flat",
    isIconOnly: true,
  };

  return (
    <div className="flex items-center justify-between border-b border-divider p-2">
      <div className="flex items-center">
        <div className="mr-3 flex items-center justify-center rounded-full bg-default-100 p-2">
          <Icon icon={model?.icon || "lucide:message-square"} width={25} />
        </div>
        <div>
          <h2 className="text-md font-medium">{chat.title}</h2>
          <p className="text-xs text-default-500">{model?.name || "AI Model"}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {buttonConfigs.map((buttonConfig, index) => (
          <Tooltip key={index} content={buttonConfig.tooltip}>
            <Button
              {...commonButonProps}
              {...buttonConfig}
              className={cn(commonButonProps.className, buttonConfig.className)}
            >
              <Icon icon={buttonConfig.icon} />
            </Button>
          </Tooltip>
        ))}
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
    </div>
  );
}
