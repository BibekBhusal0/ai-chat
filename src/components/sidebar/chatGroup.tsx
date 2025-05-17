import { useChatStore } from "../../store/chatStore";
import ChatItem from "./ChatItem";
import { ChatSession } from "../../types";

type chatGroupProps = {
  chats: ChatSession[];
  title: string;
  handleChatSelect: (id: string) => void;
};

export const ChatGroup = ({ chats, title, handleChatSelect }: chatGroupProps) => {
  const { activeChatId } = useChatStore();

  return (
    <>
      {chats.length > 0 && (
        <div className="mb-4">
          <div className="mb-1 px-2 text-xs font-medium text-default-500">{title}</div>
          {chats.map((chat) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              isActive={chat.id === activeChatId}
              onClick={() => handleChatSelect(chat.id)}
            />
          ))}
        </div>
      )}
    </>
  );
};
