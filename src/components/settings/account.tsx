import { cn, Input, InputProps } from "@heroui/react";
import { AnimatedIconButton, AnimatedIconButtonProps } from "../animatedButton";
import { LogoutIcon } from "../icon/log-out";
import { DeleteIcon } from "../icon/delete";
import { DownloadIcon } from "../icon/donwload";

export default function Account() {
  const buttons: AnimatedIconButtonProps[] = [
    { icon: <DownloadIcon />, endContent: "Download All Chat", variant: "solid", color: "primary" },
    { icon: <LogoutIcon />, endContent: "Log Out", variant: "solid", color: "default" },
    { icon: <DeleteIcon />, endContent: "Delete Profile" },
    { icon: <DeleteIcon />, endContent: "Delete all chats" },
  ];

  const inputs: InputProps[] = [
    { placeholder: "Name", label: "Username" },
    { placeholder: "Password", label: "Password" },
  ];

  const defaultButtonProps: Partial<AnimatedIconButtonProps> = {
    isIconOnly: false,
    className: "w-56",
    iconSize: 23,
    color: "danger",
    variant: "light",
  };

  const defaultInputProps: Partial<InputProps> = {
    labelPlacement: "outside-left",
    classNames: {
      mainWrapper: "w-full",
      label: "min-w-32 text-md",
      base: "border-b-1 border-divider pb-2",
    },
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {inputs.map((input, key) => (
        <Input
          key={key}
          {...defaultInputProps}
          {...input}
          className={cn(defaultInputProps.className, input.className)}
        />
      ))}
      {buttons.map((button, key) => (
        <AnimatedIconButton
          key={key}
          {...defaultButtonProps}
          {...button}
          endContent={<div className="text-lg">{button.endContent}</div>}
          className={cn(defaultButtonProps.className, button.className)}
        />
      ))}
    </div>
  );
}
