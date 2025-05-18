import React from "react";
import { Drawer, DrawerContent, useDisclosure } from "@heroui/react";
import { Icon } from "@iconify/react";

import ChatContainer from "./components/chat/ChatContainer";
import { useChatStore } from "./store/chatStore";
import CommandK from "./components/command-k/CommandK";
import Sidebar from "./components/sidebar";

export default function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [commandKOpen, setCommandKOpen] = React.useState(false);
  const { activeChatId } = useChatStore();

  // Handle Cmd+K keyboard shortcut
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandKOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Mobile sidebar toggle */}
      <button
        className="fixed left-4 top-4 z-30 rounded-full p-2 text-foreground md:hidden"
        onClick={onOpen}
      >
        <Icon icon="lucide:menu" width={24} />
      </button>

      {/* Mobile drawer for sidebar */}
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange} placement="left">
        <DrawerContent>{(onClose) => <Sidebar mobile onClose={onClose} />}</DrawerContent>
      </Drawer>

      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar onCommandKOpen={() => setCommandKOpen(true)} />
      </div>

      {/* Main chat area */}
      <div className="flex h-full w-full flex-col">
        {activeChatId ? (
          <ChatContainer />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl font-medium">Select a chat or start a new one</h2>
              <p className="mt-2 text-default-500">Choose from the sidebar or create a new chat</p>
            </div>
          </div>
        )}
      </div>

      {/* Command K search */}
      <CommandK open={commandKOpen} onOpenChange={setCommandKOpen} />
    </div>
  );
}
