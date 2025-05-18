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
import { DownloadIcon } from "../icon/donwload";
import { UploadIcon } from "../icon/upload";
import { DeleteIcon } from "../icon/delete";
import { ReactNode } from "react";
import { IconButton } from "../iconButton";

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
    icon: string | ReactNode;
  }

  const buttonConfigs: TooltipButtonProps[] = [
    {
      tooltip: chat.pinned ? "Unpin" : "Pin",
      icon: chat.pinned ? "lucide:pin-off" : "lucide:pin",
      onPress: handlePin,
    },
    {
      tooltip: "Share",
      icon: <UploadIcon />,
      onPress: () => { },
    },
    {
      tooltip: "Export",
      icon: <DownloadIcon />,
      onPress: () => { },
    },
    {
      tooltip: "Delete",
      icon: <DeleteIcon />,
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
    <div className={"flex items-center justify-between border-b border-divider p-2 pl-16 md:pl-3"}>
      <div className="flex items-center">
        <div className="mr-3 flex items-center justify-center rounded-full bg-default-200 p-2">
          <Icon icon={model?.icon || "lucide:message-square"} width={25} />
        </div>
        <div>
          <h2 className="text-md font-medium">{chat.title}</h2>
          <p className="text-xs text-default-500">{model?.name || "AI Model"}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {buttonConfigs.map(({ tooltip, ...props }, index) => (
          <Tooltip key={index} content={tooltip}>
            <IconButton iconSize={18}  {...commonButonProps} {...props} className={cn(commonButonProps.className, props.className)} />
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
