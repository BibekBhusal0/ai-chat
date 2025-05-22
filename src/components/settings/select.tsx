import { SelectItem } from "@heroui/react";
import { Select, SelectProps } from "@heroui/react";

export function SettingSelect(props: Partial<SelectProps>) {
  return <Select
    labelPlacement="outside-left"
    children={(item: any) => <SelectItem key={item.key}>{item.label}</SelectItem>}
    {...props}
    // className = 'min-w-32'
    classNames={{
      ...props.classNames,
      label: ['min-w-32 text-md', props.classNames?.label],
      base: ['pt-2' , props.classNames?.base],
    }}
  />
}

const languages = [
  { key: "auto", label: "Auto" },
  { key: "english", label: "English" },
  { key: "french", label: "French" },
  { key: "spanish", label: "Spanish" },
  { key: "german", label: "German" },
  { key: "italian", label: "Italian" },
  { key: "japanese", label: "Japanese" },
  { key: "chinese", label: "Chinese" },
];

export function LanguageSelector(props: Partial<SelectProps>) {
  return <SettingSelect items={languages} label="Language" defaultSelectedKeys={["auto"]} {...props} />
}
