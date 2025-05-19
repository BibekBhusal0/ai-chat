import React from "react";
import { Button, Drawer, DrawerContent, useDisclosure } from "@heroui/react";
import { Icon } from "@iconify/react";

import ChatContainer from "./components/chat/ChatContainer";
import { useChatStore } from "./store/chatStore";
import CommandK from "./components/command-k/CommandK";
import Sidebar from "./components/sidebar";

export default function App() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [commandKOpen, setCommandKOpen] = React.useState(false);
  const { createNewChat, setActiveChat } = useChatStore();
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandKOpen(true);
      } else if (e.altKey && e.key === "n") {
        // Create new chat
        e.preventDefault();
        const newChatId = createNewChat("gpt-4");
        setActiveChat(newChatId);
      }
      else if (e.altKey && e.key === "b") {
        //Toggle sidebar
        e.preventDefault();
        setSidebarCollapsed((prev) => !prev)
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onOpen, createNewChat, setActiveChat]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-default-100">
      {/* Mobile sidebar toggle */}
      <Button
        className="fixed left-4 top-2 z-30 rounded-full p-2 text-foreground md:hidden"
        onPress={onOpen}
        variant="flat"
        isIconOnly
      >
        <Icon icon="lucide:menu" width={24} />
      </Button>

      {/* Mobile drawer for sidebar */}
      <Drawer
        isOpen={isOpen}
        classNames={{ closeButton: "hidden", base: "w-auto" }}
        onOpenChange={onOpenChange}
        placement="left"
      >
        <DrawerContent>{(onClose) => <Sidebar mobile onClose={onClose} onCommandKOpen={() => setCommandKOpen(true)} />}</DrawerContent>
      </Drawer>

      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar collapsed={sidebarCollapsed} setCollapsed={(a) => setSidebarCollapsed(a)} onCommandKOpen={() => setCommandKOpen(true)} />
      </div>

      {/* Main chat area */}
      <div className="flex h-full w-full flex-col">
        <ChatContainer />
      </div>

      {/* Command K search */}
      <CommandK open={commandKOpen} onOpenChange={setCommandKOpen} />
    </div>
  );
}
