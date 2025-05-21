import { FC, ReactNode, useState, } from "react";
import { Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, Button } from "@heroui/react";
import { SettingsIcon } from "../icon/settings2";
import General from "./general";
import { FlaskIcon } from "../icon/flask";
import Experimental from "./experimental";
import { AnimatedIconButton } from "../animatedButton";

type SettingsProps = { onOpenChange: () => void; isOpen: boolean };

type setting = {
  icon: ReactNode;
  title: string;
  content: ReactNode;
}

const settings: setting[] = [
  { icon: <SettingsIcon />, title: "General", content: <General /> },
  { icon: <FlaskIcon />, title: "Experimental", content: <Experimental /> },
]

export const Settings: FC<SettingsProps> = ({ onOpenChange, isOpen }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const size = 15
  return (
    <Modal backdrop='blur' size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (<>
          <ModalHeader >
            Settings
          </ModalHeader>
          <ModalBody className="flex w-full flex-row gap-2">
            <div className='flex flex-col gap-2'>
              {settings.map(({ icon, title }, i) => {
                return (
                  <AnimatedIconButton
                    icon={icon}
                    variant={i === selectedIndex ? 'solid' : 'light'}
                    className='align-center justify-start flex'
                    size='sm'
                    color={i === selectedIndex ? 'primary' : 'default'}
                    onPress={() => setSelectedIndex(i)}
                    key={i}
                    iconSize={size}
                    endContent={<div className='text-lg'>{title}</div>}
                    isIconOnly={false}
                  />
                )
              })}
            </div>

            <div className='w-full p-1'>
              {settings[selectedIndex].content}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant='solid' color='primary'>Save</Button>
            <Button variant='flat' color='danger' onPress={onClose}>Close</Button>
          </ModalFooter>
        </>)}
      </ModalContent>
    </Modal>
  );
};

