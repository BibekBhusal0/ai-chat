import React from "react";
import { Button, Divider, Tooltip, Switch } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useTheme } from "@heroui/use-theme";
import { isToday, isYesterday, isThisWeek, isThisMonth, parseISO } from "date-fns";
import { useChatStore } from "../../store/chatStore";
import { ChatGroup } from "./chatGroup";

interface SidebarProps {
  mobile?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ mobile = false, onClose }: SidebarProps) {
  const { theme, setTheme } = useTheme();
  const [collapsed, setCollapsed] = React.useState(false);
  const [showPinnedOnly, setShowPinnedOnly] = React.useState(false);

  const { chats, models, createNewChat, setActiveChat } = useChatStore();

  const handleNewChat = () => {
    // Default to first model
    const defaultModelId = models[0]?.id || "gpt-4";
    createNewChat(defaultModelId);
    if (mobile && onClose) onClose();
  };


  const handleChatSelect = (id: string) => {
    setActiveChat(id);
    if (mobile && onClose) onClose();
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Group chats by date category
  const groupedChats = React.useMemo(() => {
    // Filter chats based on pinned status if needed
    const filteredChats = showPinnedOnly ? chats.filter(chat => chat.pinned) : chats;

    // First separate pinned chats
    const pinnedChats = filteredChats.filter(chat => chat.pinned);
    const unpinnedChats = filteredChats.filter(chat => !chat.pinned);

    // Group unpinned chats by date
    const grouped = {
      pinned: pinnedChats,
      today: [] as typeof chats,
      yesterday: [] as typeof chats,
      thisWeek: [] as typeof chats,
      thisMonth: [] as typeof chats,
      older: [] as typeof chats,
    };

    unpinnedChats.forEach(chat => {
      const date = parseISO(chat.date);

      if (isToday(date)) {
        grouped.today.push(chat);
      } else if (isYesterday(date)) {
        grouped.yesterday.push(chat);
      } else if (isThisWeek(date)) {
        grouped.thisWeek.push(chat);
      } else if (isThisMonth(date)) {
        grouped.thisMonth.push(chat);
      } else {
        grouped.older.push(chat);
      }
    });

    return grouped;
  }, [chats, showPinnedOnly]);


  if (collapsed) {
    return (
      <div className="flex h-full w-16 flex-col items-center border-r border-divider bg-content1 py-4">
        <div className="mb-8 flex justify-center">
          <Button isIconOnly variant="light" onPress={() => setCollapsed(false)}>
            <Icon icon="lucide:chevrons-right" width={20} />
          </Button>
        </div>


        <Tooltip content="New Chat" color='primary' placement="right">
          <Button isIconOnly color="primary" className="mb-4" onPress={handleNewChat}>
            <Icon icon="lucide:plus" width={24} />
          </Button>
        </Tooltip>

        <div className="mt-auto flex flex-col gap-2">
          <Tooltip content="Toggle theme" placement="right">
            <Button isIconOnly variant="light" onPress={toggleTheme}>
              <Icon icon={theme === "light" ? "lucide:moon" : "lucide:sun"} width={20} />
            </Button>
          </Tooltip>

          <Tooltip content="Settings" placement="right">
            <Button isIconOnly variant="light">
              <Icon icon="lucide:settings" width={20} />
            </Button>
          </Tooltip>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-72 flex-col border-r border-divider bg-content1">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-xl font-semibold">AI Chat</h1>
        <Button isIconOnly variant="light" onPress={() => setCollapsed(true)}>
          <Icon icon="lucide:chevrons-left" width={20} />
        </Button>
      </div>

      <div className="flex items-center justify-between px-4 pb-2 gap-4">
        <Button color="primary" startContent={<Icon icon="lucide:plus" width={20} />} className='w-full' onPress={handleNewChat}>
          New Chat
        </Button>

        <div className="flex items-center gap-2">
          <Tooltip content="Search chats (Cmd+K)">
            <Button isIconOnly variant="light">
              <Icon icon="lucide:search" width={20} />
            </Button>
          </Tooltip>
        </div>
      </div>

      <div className="flex items-center justify-between px-4 py-2">
        <span className="text-sm text-default-600">Show pinned only</span>
        <Switch
          size="sm"
          isSelected={showPinnedOnly}
          onValueChange={setShowPinnedOnly}
        />
      </div>

      <Divider />

      <div className="flex-1 overflow-y-auto p-2">

        {Object.entries(groupedChats).map(([groupName, chats]) => <ChatGroup title={groupName} key={groupName} chats={chats} handleChatSelect={handleChatSelect} />)}


        {Object.values(groupedChats).flat().length === 0 && (
          <div className="flex h-32 items-center justify-center">
            <p className="text-center text-default-400">No chats found</p>
          </div>
        )}
      </div>

      <div className="border-t border-divider p-4">
        <div className="flex items-center justify-between">
          <Tooltip content="Toggle theme">
            <Button isIconOnly variant="light" onPress={toggleTheme}>
              <Icon icon={theme === "light" ? "lucide:moon" : "lucide:sun"} width={20} />
            </Button>
          </Tooltip>

          <Tooltip content="Settings">
            <Button isIconOnly variant="light">
              <Icon icon="lucide:settings" width={20} />
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
