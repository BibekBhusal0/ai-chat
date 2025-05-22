import React from "react";
import { Button, Drawer, DrawerContent, useDisclosure } from "@heroui/react";
import { Icon } from "@iconify/react";

import ChatContainer from "./components/chat/ChatContainer";
import { useChatStore } from "./store/chatStore";
import CommandK from "./components/command-k/CommandK";
import Sidebar from "./components/sidebar";
import { Settings } from "./components/settings";

export default function App() {
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onOpenChange: onDrawerOpenChange,
  } = useDisclosure();
  const {
    isOpen: isSettingsOpen,
    onOpen: onSettingsOpen,
    onOpenChange: onSettingsOpenChange,
  } = useDisclosure();
  const [commandKOpen, setCommandKOpen] = React.useState(false);
  const { createNewChat, setActiveChat } = useChatStore();
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  // TODO: close settings, search in other shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        // Search chats
        e.preventDefault();
        setCommandKOpen(true);
      } else if (e.altKey && e.key === "n") {
        // Create new chat
        e.preventDefault();
        const newChatId = createNewChat("gpt-4");
        setActiveChat(newChatId);
      } else if (e.altKey && e.key === "b") {
        //Toggle sidebar
        e.preventDefault();
        setSidebarCollapsed((prev) => !prev);
      } else if ((e.ctrlKey || e.metaKey) && e.key === ",") {
        //Open settings
        e.preventDefault();
        onSettingsOpen();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div className="flex h-screen w-full overflow-hidden bg-default-100">
      {/* Mobile sidebar toggle */}
      <Button
        className="fixed left-4 top-2 z-30 rounded-full p-2 text-foreground md:hidden"
        onPress={onDrawerOpen}
        variant="flat"
        isIconOnly
      >
        <Icon icon="lucide:menu" width={24} />
      </Button>

      {/* Mobile drawer for sidebar */}
      <Drawer
        isOpen={isDrawerOpen}
        classNames={{ closeButton: "hidden", base: "w-auto" }}
        onOpenChange={onDrawerOpenChange}
        placement="left"
      >
        <DrawerContent>
          {(onClose) => (
            <Sidebar
              mobile
              onClose={onClose}
              onSettingsOpen={onSettingsOpen}
              onCommandKOpen={() => setCommandKOpen(true)}
            />
          )}
        </DrawerContent>
      </Drawer>

      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar
          collapsed={sidebarCollapsed}
          setCollapsed={(a) => setSidebarCollapsed(a)}
          onSettingsOpen={onSettingsOpen}
          onCommandKOpen={() => setCommandKOpen(true)}
        />
      </div>

      {/* Main chat area */}
      <div className="flex h-full w-full flex-col">
        <ChatContainer />
      </div>

      {/* Command K search */}
      <CommandK open={commandKOpen} onOpenChange={setCommandKOpen} />
      <Settings onOpenChange={onSettingsOpenChange} isOpen={isSettingsOpen} />
    </div>
  );
}
