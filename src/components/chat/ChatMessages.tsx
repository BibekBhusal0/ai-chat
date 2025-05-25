import React, { ReactNode, useRef } from "react";
import { Button, Tooltip, Textarea, Card, cn, CardBody, CardFooter } from "@heroui/react";
import { format, parseISO } from "date-fns";

import { useChatStore } from "../../store/chatStore";
import type { Message } from "../../types";
import TypingText from "../typing-text";
import ChatMessageEmpty from "./ChatMessageEmpty.tsx";
import { IconButton } from "../iconButton.tsx";
import { RefreshCWIcon } from "../icon/refresh.tsx";
import { CheckIcon } from "../icon/check.tsx";
import { SquarePenIcon } from "../icon/pen.tsx";
import { LikeIcon, LikeIconFilled } from "../icon/like.tsx";
import { DislikeIcon, DislikeIconFilled } from "../icon/dislike.tsx";

interface ChatMessagesProps {
  messages: Message[];
  chatId: string;
  onSubmit: (message: string) => void;
}

export default function ChatMessages({ messages, chatId, onSubmit }: ChatMessagesProps) {
  const isRecentMessage = (timestamp: string) => {
    const messageTime = new Date(timestamp).getTime();
    const now = Date.now();
    const difference = now - messageTime;
    return difference <= 1000;
  };

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex h-full flex-col gap-6 pt-2" ref={messagesContainerRef}>
      {messages.length === 0 ? (
        <ChatMessageEmpty onSubmit={onSubmit} />
      ) : (
        messages.map((message) =>
          message.role === "user" ? (
            <UserMessageItem key={message.id} message={message} chatId={chatId} />
          ) : (
            <AssistantMessageItem
              key={message.id}
              message={message}
              isRecent={isRecentMessage(message.timestamp)}
            />
          )
        )
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
  const { simulateResponse, chats } = useChatStore();
  const [isCopied, setIsCopied] = React.useState(false);

  const formattedTime = format(parseISO(message.timestamp), "h:mm a");

  const handleSaveEdit = async () => {
    const chat = chats.find((c) => c.id === chatId);
    if (!chat) return;

    // Find the index of the current message in the chat's messages array
    const messageIndex = chat.messages.findIndex((msg) => msg.id === message.id);
    if (messageIndex === -1) return;

    // Remove all messages after the current message
    const newChats = chats.map((c) => {
      if (c.id === chatId) {
        return {
          ...c,
          messages: c.messages.slice(0, messageIndex),
        };
      }
      return c;
    });

    useChatStore.setState({ chats: newChats });
    setIsEditing(false);
    await simulateResponse(chatId, editedContent);
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

  const handleRegenerate = async () => {
    const chat = chats.find((c) => c.id === chatId);
    if (!chat) return;

    // Find the index of the current message in the chat's messages array
    const messageIndex = chat.messages.findIndex((msg) => msg.id === message.id);

    if (messageIndex === -1) return;

    // Remove all messages after the current message
    const newChats = chats.map((c) => {
      if (c.id === chatId) {
        return {
          ...c,
          messages: c.messages.slice(0, messageIndex),
        };
      }
      return c;
    });

    useChatStore.setState({
      chats: newChats,
    });
    await simulateResponse(chatId, message.content);
  };

  const userButtons: smallButton[] = [
    {
      content: "Edit",
      icon: <SquarePenIcon />,
      onClick: () => setIsEditing(true),
    },
    {
      content: "Copy",
      icon: isCopied ? <CheckIcon /> : "lucide:copy",
      onClick: handleCopyToClipboard,
    },
    {
      content: "Regenerate",
      icon: <RefreshCWIcon />,
      onClick: handleRegenerate,
    },
  ];

  return (
    <div className="flex w-full flex-col items-end">
      <span className="mr-10 text-xs text-default-400">{formattedTime}</span>
      {isEditing ? (
        <Card className="w-[80%]">
          <CardBody>
            <Textarea
              value={editedContent}
              onValueChange={setEditedContent}
              variant="faded"
              autoFocus
              minRows={3}
              className="w-full"
            />
          </CardBody>
          <CardFooter className="flex justify-end gap-2 p-2">
            <Button size="sm" variant="flat" onPress={handleCancelEdit}>
              Cancel
            </Button>
            <Button size="sm" color="primary" onPress={handleSaveEdit}>
              Save
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="group relative mr-10 max-w-[80%] rounded-xl bg-primary-300 px-4 py-2 text-right dark:bg-primary-400">
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
  const [isLiked, setIsLiked] = React.useState(false);
  const [isCompleted, setIsCompleted] = React.useState(!isRecent);
  const [isDisliked, setIsDisliked] = React.useState(false);
  const formattedTime = format(parseISO(message.timestamp), "h:mm a");
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
    } else {
      setIsLiked(true);
      setIsDisliked(false);
    }
  };

  const handleDislike = () => {
    if (isDisliked) {
      setIsDisliked(false);
    } else {
      setIsDisliked(true);
      setIsLiked(false);
    }
  };

  const assistantButtons = [
    {
      content: "Like",
      icon: isLiked ? <LikeIconFilled /> : <LikeIcon />,
      onClick: handleLike,
    },
    {
      content: "Dislike",
      icon: isDisliked ? <DislikeIconFilled /> : <DislikeIcon />,
      onClick: handleDislike,
    },
    {
      content: "Copy",
      icon: isCopied ? <CheckIcon /> : "lucide:copy",
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
      <div className="group relative ml-10 h-auto max-w-[80%] rounded-xl bg-default-200 px-4 py-2 text-left">
        {message.role === "assistant" && isRecent ? (
          <>
            <TypingText
              delay={15}
              waitTime={500}
              cursor={false}
              grow
              text={message.content}
              repeat={false}
              onComplete={() => {
                if (messagesEndRef.current) {
                  setIsCompleted(true);
                  messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
                }
              }}
            />
            <div ref={messagesEndRef} />
          </>
        ) : (
          <div className="whitespace-pre-wrap">{message.content}</div>
        )}
        {isCompleted && <MessageItemButtons buttons={assistantButtons} align="left" />}
      </div>
    </div>
  );
}

type smallButton = {
  content: string;
  icon: string | ReactNode;
  onClick: () => void;
};
interface MessageItemButtonsProps {
  buttons: smallButton[];
  align: "left" | "right";
}

function MessageItemButtons({ buttons, align }: MessageItemButtonsProps) {
  const alignmentClass = align === "left" ? "left-2" : "-right-1";
  return (
    <div
      className={cn(
        "absolute -bottom-8 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100",
        alignmentClass
      )}
    >
      {buttons.map((button, index) => (
        <Tooltip key={index} size="sm" content={button.content} delay={0} closeDelay={0}>
          <IconButton
            icon={button.icon}
            isIconOnly
            size="sm"
            variant="shadow"
            className="h-7 w-7 min-w-7"
            onPress={button.onClick}
            iconSize={14}
          />
        </Tooltip>
      ))}
    </div>
  );
}
