import { cn, Input, } from "@heroui/react";
import { AnimatedIconButton, AnimatedIconButtonProps } from "../animatedButton";
import { LogoutIcon } from "../icon/log-out";
import { DeleteIcon } from "../icon/delete";

export default function Account() {
  const buttons: AnimatedIconButtonProps[] = [
    { icon: <LogoutIcon />, endContent: 'Logout' },
    { icon: <DeleteIcon />, endContent: 'Delete Profile' },
    { icon: <DeleteIcon />, endContent: 'Delete all chats' }
  ]

  const defaultProps: Partial<AnimatedIconButtonProps> = {
    isIconOnly: false,
    className: "align-center flex justify-start",
    iconSize: 23
  }

  return (
    <div>
      <Input placeholder="Name" labelPlacement='outside-left' label='Username' />
      {buttons.map((button) => <AnimatedIconButton {...defaultProps} {...button}  endContent={<div className='text-lg' >{button.endContent}</div>} className={cn(defaultProps.className, button.className)} />)}
    </div>
  );
}

