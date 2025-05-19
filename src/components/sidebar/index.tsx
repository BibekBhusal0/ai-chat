import React from "react";
import { Button, Divider, Tooltip, Tabs, Tab } from "@heroui/react";
import { Icon } from "@iconify/react";
import { isToday, isYesterday, isThisWeek, isThisMonth, parseISO } from "date-fns";
import { useChatStore } from "../../store/chatStore";
import { ChatGroup } from "./chatGroup";
import { SettingsGearIcon } from "../icon/settings";
import ThemeSwitch from "../theme-switch";
import { IconButton } from "../iconButton";
import { cn } from "@heroui/react";
import { motion } from "motion/react";

interface SidebarProps {
  mobile?: boolean;
  collapsed?: boolean;
  onClose?: () => void;
  onCommandKOpen?: () => void;
  setCollapsed?: (istate: boolean) => void;
}

export default function Sidebar({
  mobile = false,
  collapsed = false,
  setCollapsed,
  onClose,
  onCommandKOpen,
}: SidebarProps) {
  const [selectedTab, setSelectedTab] = React.useState("all");
  const { chats, models, createNewChat, setActiveChat } = useChatStore();
  const showFullSidebar = mobile || !collapsed;

  const handleNewChat = () => {
    const defaultModelId = models[0]?.id || "gpt-4";
    createNewChat(defaultModelId);
    if (mobile && onClose) onClose();
  };

  const handleChatSelect = (id: string) => {
    setActiveChat(id);
    if (mobile && onClose) onClose();
  };

  const groupedChats = React.useMemo(() => {
    const filteredChats = selectedTab === "pinned" ? chats.filter((chat) => chat.pinned) : chats;
    const pinnedChats = filteredChats.filter((chat) => chat.pinned);
    const unpinnedChats = filteredChats.filter((chat) => !chat.pinned);
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
      if (isToday(date)) grouped.today.push(chat);
      else if (isYesterday(date)) grouped.yesterday.push(chat);
      else if (isThisWeek(date)) grouped.thisWeek.push(chat);
      else if (isThisMonth(date)) grouped.thisMonth.push(chat);
      else grouped.older.push(chat);
    });
    return grouped;
  }, [chats, selectedTab]);

  const animationConfig = {
    type: "spring",
    visualDuration: 0.2,
    bounce: 0.2,
  };
  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden border-r border-divider bg-default-50 transition-[width] duration-300 ease-in-out",
        showFullSidebar ? "w-72" : "w-16 items-center"
      )}
    >
      {/* Logo and toggle icon */}
      <div className="flex w-full items-center justify-between gap-2 px-4 py-3">
        <h1
          className={cn(
            "absolute text-xl font-semibold transition-all duration-300",
            showFullSidebar ? "left-3" : "-left-20"
          )}
        >
          AI Chat
        </h1>
        {showFullSidebar && <div />}
        <motion.div layout transition={animationConfig}>
          <Button
            isIconOnly
            className="overflow-hidden"
            variant="light"
            onPress={() => {
              if (mobile) onClose();
              else setCollapsed(!collapsed);
            }}
          >
            <Icon
              icon={"lucide:chevrons-left"}
              className={cn("transition-[transform]", showFullSidebar ? "rotate-0" : "rotate-180")}
              width={20}
            />
          </Button>
        </motion.div>
      </div>

      {/* New Chat Button and Search */}
      <div className="flex items-center justify-between gap-4 px-4 pb-2">
        <Button
          color="primary"
          onPress={handleNewChat}
          className={cn(
            "overlfow-hidden min-w-10 transition-all",
            showFullSidebar ? "w-full" : "w-10 p-1"
          )}
        >
          <Icon icon="lucide:plus" width={20} className="-mr-2" />
          <span
            className={cn(
              "w-fit max-w-0 transform-gpu overflow-hidden transition-all duration-300",
              showFullSidebar && "max-w-40"
            )}
          >
            <span
              className={cn(
                "transform-gpu whitespace-nowrap pl-0 opacity-0 transition-all duration-300",
                showFullSidebar && "pl-2 opacity-100"
              )}
            >
              {showFullSidebar && <span className="text-sm">New Chat</span>}
            </span>
          </span>
        </Button>
        {showFullSidebar && (
          <Tooltip content="Search chats (Cmd+K)">
            <IconButton
              icon="lucide:search"
              iconSize={24}
              isIconOnly
              variant="light"
              onPress={onCommandKOpen}
            />
          </Tooltip>
        )}
      </div>

      {/* Tabs and Chat List */}
      {showFullSidebar && (
        <>
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
        </>
      )}

      {/* Bottom Controls: Theme + Settings */}
      <div
        className={cn(
          "flex items-center justify-between",
          "border-t border-divider",
          "mt-auto w-full overflow-hidden px-4 py-2",
          !showFullSidebar && "flex-col gap-2"
        )}
      >
        <motion.div layout transition={animationConfig}>
          <ThemeSwitch />
        </motion.div>
        <motion.div layout transition={animationConfig}>
          <Tooltip content="Settings" placement={collapsed ? "right" : "top"}>
            <IconButton icon={<SettingsGearIcon />} variant="light" />
          </Tooltip>
        </motion.div>
      </div>
    </div>
  );
}
