import { Select, SelectItem, Textarea } from "@heroui/react";
import { useTheme } from "@heroui/use-theme";
import { useChatStore } from "../../store/chatStore";

const languages = [
  "Auto",
  "English",
  "French",
  "Spanish",
  "German",
  "Italian",
  "Japanese",
  "Chinese",
];

export default function General() {
  const { theme, setTheme } = useTheme();
  const { models } = useChatStore();

  return (
    <div>
      <Select
        selectedKeys={[theme]}
        onChange={(e) => setTheme(e.target.value)}
        label="Theme"
        labelPlacement="outside-left"
      >
        <SelectItem key="light">Light</SelectItem>
        <SelectItem key="dark">Dark</SelectItem>
      </Select>
      <Select label="Language" labelPlacement="outside-left" defaultSelectedKeys={["Auto"]}>
        {languages.map((lang) => (
          <SelectItem key={lang}>{lang}</SelectItem>
        ))}
      </Select>
      <Select label="Default Model" labelPlacement="outside-left" defaultSelectedKeys={["gpt-4"]}>
        {models.map(({ id, name }) => (
          <SelectItem key={id}>{name}</SelectItem>
        ))}
      </Select>
      <Textarea
        label="System Prompt"
        placeholder="your system prompt here"
        labelPlacement="outside"
      />
    </div>
  );
}
