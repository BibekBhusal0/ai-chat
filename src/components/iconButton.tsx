import { Button, ButtonProps } from "@heroui/react";
import { Icon } from "@iconify/react";
import { forwardRef, ReactNode } from "react";
import { AnimatedIconButton } from "./animatedButton";

interface IconButtonProps extends ButtonProps {
  icon: string | ReactNode;
  iconSize?: number;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, iconSize, ...props }, ref) => {
    if (typeof icon === "string")
      return (
        <Button {...props} ref={ref}>
          <Icon icon={icon} width={iconSize} height={iconSize} />
        </Button>
      );
    return <AnimatedIconButton isIconOnly {...{ icon, iconSize }} {...props} ref={ref} />;
  }
);

IconButton.displayName = "IconButton";
