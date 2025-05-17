import React from "react";
import { Button, Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import { Icon } from "@iconify/react";

import { useChatStore } from "../../store/chatStore";
import type { AiModel } from "../../types";

interface ModelSelectorProps {
  selectedModelId: string;
  onModelChange: (modelId: string) => void;
}

export default function ModelSelector({ selectedModelId, onModelChange }: ModelSelectorProps) {
  const { models } = useChatStore();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  
  const selectedModel = models.find(model => model.id === selectedModelId);
  
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
          className="h-9 min-w-0 px-2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Icon icon={selectedModel.icon} className="mr-1" width={18} />
          {isHovered && (
            <span className="text-sm">{selectedModel.name}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="w-72 p-2">
          <h3 className="mb-2 text-sm font-medium">Select a model</h3>
          <div className="flex flex-col gap-1">
            {models.map((model) => (
              <Button
                key={model.id}
                variant="flat"
                className={`justify-start ${model.id === selectedModelId ? "bg-default-100" : ""}`}
                onPress={() => {
                  onModelChange(model.id);
                  setIsOpen(false);
                }}
              >
                <div className="flex w-full items-center">
                  <Icon icon={model.icon} className="mr-2" width={18} />
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium">{model.name}</div>
                    <div className="text-xs text-default-500">{model.description}</div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
          
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