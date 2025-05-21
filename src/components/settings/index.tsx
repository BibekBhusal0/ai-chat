import { FC, ReactNode, } from "react";
import { Modal, ModalBody, ModalContent, ModalHeader, Tab, Tabs } from "@heroui/react";
import { SettingsIcon } from "../icon/settings2";
import General from "./general";
import { FlaskIcon } from "../icon/flask";
import Experimental from "./experimental";
import { AnimatedDiv } from "../animatedDiv";
import { Icon } from "@iconify/react";

type SettingsProps = { onOpenChange: () => void; isOpen: boolean };

type setting = {
  icon: ReactNode;
  title: ReactNode;
  children: ReactNode;
}

const settings: setting[] = [
  { icon: <SettingsIcon />, title: "General", children: <General /> },
  { icon: <FlaskIcon />, title: "Experimental", children: <Experimental /> },
]


export const Settings: FC<SettingsProps> = ({ onOpenChange, isOpen }) => {

  const cls = 'flex items-center gap-2 size-full px-2 py-1'
  const size = 15
  return (
    <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader >
          Settings
        </ModalHeader>
        <ModalBody >
          <Tabs
            isVertical
            variant = 'light'
            classNames = {{
              panel: 'w-full',
              tab: 'p-0 m-0 relative',
              tabContent: 'p-0 m-0 size-full',

            }}
          >
            {settings.map(({ icon, title, children }) =>
              <Tab
                title={typeof icon === 'string' ? <div className={cls}>
                  <Icon width = {size} height = {size} icon={icon} />{children}</div>
                  : <AnimatedDiv iconSize = {size} className={cls} icon={icon}>{title}</AnimatedDiv>}
              >
                {children}
              </Tab>
            )}
          </Tabs>

        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

