import React from "react";
import { Button, Divider, Tooltip, Tabs, Tab } from "@heroui/react";
import { Icon } from "@iconify/react";
import { isToday, isYesterday, isThisWeek, isThisMonth, parseISO } from "date-fns";
import { useChatStore } from "../../store/chatStore";
import { ChatGroup } from "./chatGroup";
import { SettingsGearIcon } from "../icon/settings";
import ThemeSwitch from "../theme-switch";
import { IconButton } from "../iconButton";

interface SidebarProps {
  mobile?: boolean;
  collapsed?: boolean;
  onClose?: () => void;
  onCommandKOpen?: () => void;
  setCollapsed?: (istate: boolean) => void;
}

export default function Sidebar({ mobile = false, collapsed = false, setCollapsed, onClose, onCommandKOpen }: SidebarProps) {
  const [selectedTab, setSelectedTab] = React.useState("all");

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

  // Group chats by date category
  const groupedChats = React.useMemo(() => {
    // Filter chats based on pinned status if needed
    const filteredChats = selectedTab === "pinned" ? chats.filter((chat) => chat.pinned) : chats;

    // First separate pinned chats
    const pinnedChats = filteredChats.filter((chat) => chat.pinned);
    const unpinnedChats = filteredChats.filter((chat) => !chat.pinned);

    // Group unpinned chats by date
    const grouped = {
      pinned: pinnedChats,
      today: [] as typeof chats,
      yesterday: [] as typeof chats,
      thisWeek: [] as typeof chats,
      thisMonth: [] as typeof chats,
      older: [] as typeof chats,
    };

    unpinnedChats.forEach((chat) => {
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
  }, [chats, selectedTab]);

  if (!collapsed || mobile) {
    return (
      <div className="flex h-full w-72 flex-col border-r border-divider bg-default-50">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-semibold">AI Chat</h1>
          {!mobile && (
            <Button isIconOnly variant="light" onPress={() => setCollapsed(true)}>
              <Icon icon="lucide:chevrons-left" width={20} />
            </Button>
          )}
        </div>

        <div className="flex items-center justify-between gap-4 px-4 pb-2">
          <Button
            color="primary"
            startContent={<Icon icon="lucide:plus" width={20} />}
            className="w-full"
            onPress={handleNewChat}
          >
            New Chat
          </Button>

          <div className="flex items-center gap-2">
            <Tooltip content="Search chats (Cmd+K)">
              <IconButton
                icon='lucide:search'
                iconSize={24}
                isIconOnly
                variant="light"
                onPress={onCommandKOpen}
              />
            </Tooltip>
          </div>
        </div>

        <Tabs
          aria-label="Chat Filter"
          selectedKey={selectedTab}
          onSelectionChange={(e) => setSelectedTab(e as string)}
          className="mx-auto py-1"
          size="sm"
        >
          <Tab key="all" title="All Chats" />
          <Tab key="pinned" title="Pinned Chats" />
        </Tabs>

        <Divider />

        <div className="flex-1 overflow-y-auto p-2">
          {Object.entries(groupedChats).map(([groupName, chats]) => (
            <ChatGroup
              title={groupName}
              key={groupName}
              chats={chats}
              handleChatSelect={handleChatSelect}
            />
          ))}

          {Object.values(groupedChats).flat().length === 0 && (
            <div className="flex h-32 items-center justify-center">
              <p className="text-center text-default-400">No chats found</p>
            </div>
          )}
        </div>

        <div className="border-t border-divider px-4 py-1">
          <div className="flex items-center justify-between">
            <ThemeSwitch />

            <Tooltip content="Settings">
              <IconButton icon={<SettingsGearIcon />} variant="light" />
            </Tooltip>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-16 flex-col items-center border-r border-divider bg-content1 py-4">
      <div className="mb-8 flex justify-center">
        <Button isIconOnly variant="light" onPress={() => setCollapsed(false)}>
          <Icon icon="lucide:chevrons-right" width={20} />
        </Button>
      </div>

      <Tooltip content="New Chat" color="primary" placement="right">
        <Button isIconOnly color="primary" className="mb-4" onPress={handleNewChat}>
          <Icon icon="lucide:plus" width={24} />
        </Button>
      </Tooltip>

      <div className="mt-auto flex flex-col gap-2">
        <ThemeSwitch />
        <Tooltip content="Settings" placement="right">
          <IconButton icon={<SettingsGearIcon />} variant="light" />
        </Tooltip>
      </div>
    </div>
  );
}
