import React from "react";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  cn,
  Listbox,
  ListboxItem,
} from "@heroui/react";
import { Icon } from "@iconify/react";

import { useChatStore } from "../../store/chatStore";

interface ModelSelectorProps {
  selectedModelId: string;
  onModelChange: (modelId: string) => void;
}

export default function ModelSelector({ selectedModelId, onModelChange }: ModelSelectorProps) {
  const { models } = useChatStore();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  const selectedModel = models.find((model) => model.id === selectedModelId);

  if (!selectedModel) return null;

  const getAbilityIcon = (ability: string) => {
    switch (ability) {
      case "reasoning":
        return "lucide:brain";
      case "search":
        return "lucide:search";
      case "files":
        return "lucide:file";
      case "image-generation":
        return "lucide:image";
      default:
        return "lucide:zap";
    }
  };

  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen} placement="top">
      <PopoverTrigger>
        <Button
          variant="flat"
          className="min-w-0 px-2"
          size="sm"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Icon icon={selectedModel.icon} className="-mr-2" width={18} />
          <span
            className={cn(
              "w-fit max-w-0 transform-gpu overflow-hidden transition-all duration-500",
              (isHovered || isOpen) && "max-w-44"
            )}
          >
            <span
              className={cn(
                "transform-gpu whitespace-nowrap pl-0 text-sm text-default-500 opacity-0 transition-all duration-500",
                (isHovered || isOpen) && "pl-1 opacity-100"
              )}
            >
              {(isHovered || isOpen) && <span className="text-sm">{selectedModel.name}</span>}
            </span>
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="w-72 p-2">
          <h3 className="mb-2 text-sm font-medium">Select a model</h3>
          <Listbox selectionMode="single" selectedKeys={[selectedModel.id]}>
            {models.map((model) => (
              <ListboxItem
                key={model.id}
                variant="flat"
                onPress={() => {
                  onModelChange(model.id);
                  setIsOpen(false);
                }}
                startContent={<Icon icon={model.icon} className={model.icon} width={18} />}
                description={model.description}
              >
                {model.name}
              </ListboxItem>
            ))}
          </Listbox>

          <div className="mt-3 border-t border-divider pt-2">
            <h4 className="mb-1 text-xs font-medium text-default-500">CAPABILITIES</h4>
            <div className="flex flex-wrap gap-1">
              {selectedModel.abilities.map((ability) => (
                <div
                  key={ability}
                  className="flex items-center rounded-full bg-default-100 px-2 py-1 text-xs"
                >
                  <Icon icon={getAbilityIcon(ability)} className="mr-1" width={12} />
                  {ability}
                </div>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
