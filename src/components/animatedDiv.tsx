import React, { ReactNode, forwardRef, cloneElement, useRef } from "react";

interface AnimatedDivProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: ReactNode;
  iconSize?: number;
}

const AnimatedDiv = forwardRef<HTMLDivElement, AnimatedDivProps>(
  ({ icon, children, iconSize, ...props }: AnimatedDivProps, ref) => {
    const iconRef = useRef<any>(null);

    const clonedIcon = cloneElement(icon as React.ReactElement, {
      ref: iconRef,
      size: iconSize,
    });

    return (
      <div
        {...props}
        ref={ref}
        onMouseEnter={() => iconRef.current?.startAnimation()}
        onMouseLeave={() => iconRef.current?.stopAnimation()}
      >
        {clonedIcon}
        {children}
      </div>
    );
  }
);

export { AnimatedDiv };
