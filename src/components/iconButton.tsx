import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { forwardRef } from "react";
import { AnimatedIconButton, AnimatedIconButtonProps } from "./animatedButton";

export const IconButton = forwardRef<HTMLButtonElement, AnimatedIconButtonProps>(
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
