import React, { useRef, ReactNode, forwardRef } from 'react';
import { Button, ButtonProps, } from '@heroui/react';

interface AnimatedIconButtonProps extends ButtonProps {
  icon: ReactNode;
  iconSize?: number;
}

const AnimatedIconButton = forwardRef<HTMLButtonElement, AnimatedIconButtonProps>(({ icon, iconSize, ...props }: AnimatedIconButtonProps, ref) => {
  const iconRef = useRef<any>(null);

  const clonedIcon = React.cloneElement(icon as React.ReactElement, {
    ref: iconRef,
    size: iconSize,
  });

  return (
    <Button
      isIconOnly
      {...props}
      onMouseEnter={() => iconRef.current?.startAnimation()}
      onMouseLeave={() => iconRef.current?.stopAnimation()}
      ref={ref}
    >
      {clonedIcon}
    </Button>
  );
});

AnimatedIconButton.displayName = 'AnimatedIconButton';

export { AnimatedIconButton };

