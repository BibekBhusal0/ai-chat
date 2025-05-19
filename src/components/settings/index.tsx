import { FC, } from "react";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";

type SettingsProps = { onOpenChange: () => void; isOpen: boolean };

export const Settings: FC<SettingsProps> = ({ onOpenChange, isOpen }) => {

  return (
    <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="">
          Settings
        </ModalHeader>
        <ModalBody className='h-80'>
          <div className="text-7xl">Settings will be here</div>

        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

