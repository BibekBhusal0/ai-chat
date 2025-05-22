import { FC, ReactNode, useState } from "react";
import { Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, Button } from "@heroui/react";
import { SettingsIcon } from "../icon/settings2";
import General from "./general";
import { FlaskIcon } from "../icon/flask";
import Experimental from "./experimental";
import { KeyboardIcon } from "../icon/keyboard";
import Shortcuts from "./shortcuts";
import { UserIcon } from "../icon/user";
import Account from "./account";
import { IconButton } from "../iconButton";
import Info from "./info";

type SettingsProps = { onOpenChange: () => void; isOpen: boolean };

// TODO: add description
type setting = {
  icon: ReactNode;
  title: string;
  content: ReactNode;
};

const settings: setting[] = [
  { icon: <SettingsIcon />, title: "General", content: <General /> },
  { icon: <KeyboardIcon />, title: "HotKeys", content: <Shortcuts /> },
  { icon: <FlaskIcon />, title: "Experimental", content: <Experimental /> },
  { icon: <UserIcon />, title: "Account", content: <Account /> },
  { icon: 'lucide:info', title: "Info", content: <Info /> },
];

export const Settings: FC<SettingsProps> = ({ onOpenChange, isOpen }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const size = 15;
  return (
    <Modal backdrop="blur" size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Settings</ModalHeader>
            <ModalBody className="flex w-full flex-row gap-2">
              <div className="flex flex-col gap-2">
                {settings.map(({ icon, title }, i) => {
                  return (
                    <IconButton
                      icon={icon}
                      variant={i === selectedIndex ? "solid" : "light"}
                      className="align-center flex justify-start"
                      size="sm"
                      color={i === selectedIndex ? "primary" : "default"}
                      onPress={() => setSelectedIndex(i)}
                      key={i}
                      iconSize={size}
                      endContent={<div className="text-lg">{title}</div>}
                      isIconOnly={false}
                    />
                  );
                })}
              </div>

              {/* TODO: add animation in switching */}
              <div className="w-full p-1">{settings[selectedIndex].content}</div>
            </ModalBody>
            <ModalFooter>
              <Button variant="solid" color="primary">
                Save
              </Button>
              <Button variant="flat" color="danger" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
