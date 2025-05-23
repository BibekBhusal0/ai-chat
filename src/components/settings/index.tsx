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
import { AnimatePresence, motion } from "motion/react";
import { AudioLinesIcon } from "../icon/audio";
import Audio from "./audio";

type SettingsProps = { onOpenChange: () => void; isOpen: boolean };

type setting = {
  icon: ReactNode;
  title: string;
  content: ReactNode;
};

const settings: setting[] = [
  { icon: <SettingsIcon />, title: "General", content: <General /> },
  { icon: <AudioLinesIcon />, title: "Speech", content: <Audio /> },
  { icon: <KeyboardIcon />, title: "HotKeys", content: <Shortcuts /> },
  { icon: <FlaskIcon />, title: "Experimental", content: <Experimental /> },
  { icon: <UserIcon />, title: "Account", content: <Account /> },
  { icon: "lucide:info", title: "Info", content: <Info /> },
];

export const Settings: FC<SettingsProps> = ({ onOpenChange, isOpen }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const onPress = (i: number) => {
    if (i === selectedIndex) return;
    setDirection(i > selectedIndex ? 1 : -1);
    setSelectedIndex(i);
  };

  const variants = {
    initial: (direction: number) => ({
      y: 300 * direction,
      opacity: 0,
      filter: "blur(1px)",
    }),
    active: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      y: -300 * direction,
      opacity: 0,
      filter: "blur(1px)",
    }),
  };

  const size = 15;
  return (
    <Modal backdrop="blur" size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="border-b-1 border-divider">Settings</ModalHeader>
            <ModalBody className="flex w-full flex-row gap-2 overflow-y-hidden py-0">
              <div className="my-3 flex h-auto flex-col gap-2 rounded-md border-1 border-divider p-2">
                {settings.map(({ icon, title }, i) => {
                  return (
                    <IconButton
                      icon={icon}
                      variant={i === selectedIndex ? "solid" : "light"}
                      className="align-center flex justify-start min-w-4"
                      size="sm"
                      color={i === selectedIndex ? "primary" : "default"}
                      onPress={() => onPress(i)}
                      key={i}
                      iconSize={size}
                      endContent={<div className="text-lg hidden sm:block">{title}</div>}
                      isIconOnly={false}
                    />
                  );
                })}
              </div>

              <AnimatePresence custom={direction} mode="popLayout">
                <motion.div
                  className="h-80 w-full overflow-auto p-2"
                  key={selectedIndex}
                  transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                  variants={variants}
                  initial="initial"
                  animate="active"
                  exit="exit"
                  custom={direction}
                >
                  {settings[selectedIndex].content}
                </motion.div>
              </AnimatePresence>
            </ModalBody>
            <ModalFooter className="pt-1">
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
