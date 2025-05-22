import { SelectItem, Textarea } from "@heroui/react";
import { useTheme } from "@heroui/use-theme";
import { useChatStore } from "../../store/chatStore";
import { LanguageSelector, SettingSelect } from "./select";

const themes = [
  { key: "light", label: "Light" },
  { key: "dark", label: "Dark" },
];

export default function General() {
  const { theme, setTheme } = useTheme();
  const { models } = useChatStore();

  return (
    <div className="space-y-2 divide-y-1 divide-divider">
      <SettingSelect
        selectedKeys={[theme]}
        onChange={(e) => setTheme(e.target.value)}
        label="Theme"
        labelPlacement="outside-left"
        items={themes}
      />
      <LanguageSelector />
      <SettingSelect label="Default Model" defaultSelectedKeys={["gpt-4"]}>
        {models.map(({ id, name }) => (
          <SelectItem key={id}>{name}</SelectItem>
        ))}
      </SettingSelect>
      <Textarea
        label="System Prompt"
        placeholder="Your system prompt here"
        labelPlacement="outside"
        classNames={{
          base: "pt-2",
          label: "text-lg",
        }}
        minRows={5}
        maxRows={5}
      />
    </div>
  );
}
