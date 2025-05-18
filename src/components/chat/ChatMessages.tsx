import React from "react";
import { Button, Tooltip, Textarea, Card, cn } from "@heroui/react";
import { Icon } from "@iconify/react";
import { format, parseISO } from "date-fns";

import { useChatStore } from "../../store/chatStore";
import type { Message } from "../../types";
import TypingText from "../typing-text";

interface ChatMessagesProps {
  messages: Message[];
  chatId: string;
}

export default function ChatMessages({ messages, chatId }: ChatMessagesProps) {
  const isRecentMessage = (timestamp: string) => {
    const messageTime = new Date(timestamp).getTime();
    const now = Date.now();
    const difference = now - messageTime;
    return difference <= 1000;
  };

  return (
    <div className="flex flex-col gap-6 py-4">
      {messages.length === 0 ? (
        <div className="flex h-32 items-center justify-center">
          <p className="text-center text-default-400">No messages yet. Start a conversation!</p>
        </div>
      ) : (
        messages.map((message) => (
          message.role === "user" ? (
            <UserMessageItem
              key={message.id}
              message={message}
              chatId={chatId}
            />
          ) : (
            <AssistantMessageItem
              key={message.id}
              message={message}
              isRecent={isRecentMessage(message.timestamp)}
            />
          )
        ))
      )}
    </div>
  );
}

interface UserMessageItemProps {
  message: Message;
  chatId: string;
}

function UserMessageItem({ message, chatId }: UserMessageItemProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedContent, setEditedContent] = React.useState(message.content);
  const { updateMessage } = useChatStore();
  const [isCopied, setIsCopied] = React.useState(false);

  const formattedTime = format(parseISO(message.timestamp), "h:mm a");

  const handleSaveEdit = () => {
    updateMessage(chatId, message.id, editedContent);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedContent(message.content);
    setIsEditing(false);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  const userButtons = [
    {
      content: "Edit",
      icon: "lucide:pencil",
      onClick: () => setIsEditing(true),
    },
    {
      content: "Copy",
      icon: isCopied ? "lucide:check" : "lucide:copy",
      onClick: handleCopyToClipboard,
    },
    {
      content: "Regenerate",
      icon: "lucide:refresh-cw",
      onClick: () => console.log("Regenerate"),
    },
  ];

  return (
    <div className="flex w-full flex-col items-end">
      <span className="mr-10 text-xs text-default-400">{formattedTime}</span>
      {isEditing ? (
        <Card className="mr-10">
          <Textarea
            value={editedContent}
            onValueChange={setEditedContent}
            minRows={3}
            className="w-full"
          />
          <div className="flex justify-end gap-2 p-2">
            <Button size="sm" variant="flat" onPress={handleCancelEdit}>
              Cancel
            </Button>
            <Button size="sm" color="primary" onPress={handleSaveEdit}>
              Save
            </Button>
          </div>
        </Card>
      ) : (
        <div className="group relative mr-10 rounded-xl bg-primary-50 max-w-[80%] p-4 text-right">
          <div className="whitespace-pre-wrap">{message.content}</div>
          <MessageItemButtons buttons={userButtons} align="right" />
        </div>
      )}
    </div>
  );
}

interface AssistantMessageItemProps {
  message: Message;
  isRecent: boolean;
}

function AssistantMessageItem({ message, isRecent }: AssistantMessageItemProps) {
  const [isCopied, setIsCopied] = React.useState(false);
  const formattedTime = format(parseISO(message.timestamp), "h:mm a");

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  const assistantButtons = [
    {
      content: "Like",
      icon: "lucide:thumbs-up",
      onClick: () => console.log("Like"),
    },
    {
      content: "Dislike",
      icon: "lucide:thumbs-down",
      onClick: () => console.log("Dislike"),
    },
    {
      content: "Copy",
      icon: isCopied ? "lucide:check" : "lucide:copy",
      onClick: handleCopyToClipboard,
    },
    {
      content: "Read aloud",
      icon: "lucide:volume-2",
      onClick: () => console.log("Read aloud"),
    },
  ];

  return (
    <div className="flex w-full flex-col items-start">
      <span className="ml-10 text-xs text-default-400">{formattedTime}</span>
      <div className="group relative ml-10 rounded-xl max-w-[80%] w-full bg-default-100 p-4 text-left">
        {message.role === "assistant" && isRecent ? (
          <TypingText className='bg-default-100' delay={50} smooth waitTime={500} text={message.content} repeat={false} />
        ) : (
          <div className="whitespace-pre-wrap">{message.content}</div>
        )}
        <MessageItemButtons buttons={assistantButtons} align="left" />
      </div>
    </div>
  );
}

interface MessageItemButtonsProps {
  buttons: {
    content: string;
    icon: string;
    onClick: () => void;
  }[];
  align: "left" | "right";
}

function MessageItemButtons({ buttons, align }: MessageItemButtonsProps) {
  const alignmentClass = align === "left" ? "justify-start -ml-4" : "justify-end pr-4";
  return (
    <div className={cn('absolute -bottom-8 flex w-full gap-1 opacity-0 group-hover:opacity-100 transition-opacity', alignmentClass)}>
      {buttons.map((button, index) => (
        <Tooltip key={index} content={button.content}>
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            className="h-7 w-7 min-w-0 bg-default-100"
            onPress={button.onClick}
          >
            <Icon icon={button.icon} width={14} />
          </Button>
        </Tooltip>
      ))}
    </div>
  );
}
