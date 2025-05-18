import { useRef, useEffect } from "react";
import { useTheme } from "@heroui/use-theme";
import { Button, ButtonProps, cn } from "@heroui/react";
import { Icon } from "@iconify/react";

function ThemeSwitch({ className, ...props }: ButtonProps) {
  const firstRender = useRef(true);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setTimeout(() => (firstRender.current = false), 1);
  }, []);

  if (!theme) return null;
  const startIcon = theme === "dark" ? "line-md:moon-loop" : "line-md:sunny-loop";
  const transitionIcon =
    theme === "light"
      ? "line-md:moon-to-sunny-outline-loop-transition"
      : "line-md:sunny-outline-to-moon-loop-transition";

  const handleClick = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <Button
      isIconOnly
      className={cn("text-xl", className)}
      variant="light"
      {...props}
      onPress={handleClick}
    >
      <Icon key={theme} icon={firstRender.current ? startIcon : transitionIcon} />
    </Button>
  );
}

export default ThemeSwitch;
