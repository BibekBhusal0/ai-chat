import React from "react";
import { Button, Tooltip, Textarea, Card } from "@heroui/react";
import { Icon } from "@iconify/react";
import { format, parseISO } from "date-fns";

import { useChatStore } from "../../store/chatStore";
import type { Message } from "../../types";

interface ChatMessagesProps {
  messages: Message[];
  chatId: string;
}

export default function ChatMessages({ messages, chatId }: ChatMessagesProps) {
  return (
    <div className="flex flex-col gap-6 py-4">
      {messages.length === 0 ? (
        <div className="flex h-32 items-center justify-center">
          <p className="text-center text-default-400">No messages yet. Start a conversation!</p>
        </div>
      ) : (
        messages.map((message) => (
          <MessageItem key={message.id} message={message} chatId={chatId} />
        ))
      )}
    </div>
  );
}

interface MessageItemProps {
  message: Message;
  chatId: string;
}

function MessageItem({ message, chatId }: MessageItemProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedContent, setEditedContent] = React.useState(message.content);
  const { updateMessage } = useChatStore();

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
  };

  if (message.role === "user") {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
            <Icon icon="lucide:user" width={16} />
          </div>
          <span className="font-medium">You</span>
          <span className="text-xs text-default-400">{formattedTime}</span>
        </div>

        {isEditing ? (
          <Card className="ml-10">
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
          <div className="group relative ml-10">
            <div className="whitespace-pre-wrap">{message.content}</div>

            <div className="absolute -right-2 -top-2 hidden gap-1 group-hover:flex">
              <Tooltip content="Edit">
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  className="h-7 w-7 min-w-0 bg-default-100"
                  onPress={() => setIsEditing(true)}
                >
                  <Icon icon="lucide:pencil" width={14} />
                </Button>
              </Tooltip>

              <Tooltip content="Regenerate">
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  className="h-7 w-7 min-w-0 bg-default-100"
                >
                  <Icon icon="lucide:refresh-cw" width={14} />
                </Button>
              </Tooltip>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-default-100">
          <Icon icon="lucide:bot" width={16} />
        </div>
        <span className="font-medium">AI Assistant</span>
        <span className="text-xs text-default-400">{formattedTime}</span>
      </div>

      <div className="group relative ml-10">
        <div className="whitespace-pre-wrap">{message.content}</div>

        <div className="absolute -right-2 -top-2 hidden gap-1 group-hover:flex">
          <Tooltip content="Like">
            <Button isIconOnly size="sm" variant="flat" className="h-7 w-7 min-w-0 bg-default-100">
              <Icon icon="lucide:thumbs-up" width={14} />
            </Button>
          </Tooltip>

          <Tooltip content="Dislike">
            <Button isIconOnly size="sm" variant="flat" className="h-7 w-7 min-w-0 bg-default-100">
              <Icon icon="lucide:thumbs-down" width={14} />
            </Button>
          </Tooltip>

          <Tooltip content="Copy">
            <Button
              isIconOnly
              size="sm"
              variant="flat"
              className="h-7 w-7 min-w-0 bg-default-100"
              onPress={handleCopyToClipboard}
            >
              <Icon icon="lucide:copy" width={14} />
            </Button>
          </Tooltip>

          <Tooltip content="Read aloud">
            <Button isIconOnly size="sm" variant="flat" className="h-7 w-7 min-w-0 bg-default-100">
              <Icon icon="lucide:volume-2" width={14} />
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
