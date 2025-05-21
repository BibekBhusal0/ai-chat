import { AiModel } from "../types";

export const aiModels: AiModel[] = [
  {
    id: "gpt-4",
    name: "GPT-4",
    icon: "ri:openai-fill",
    description: "Advanced reasoning, text generation",
    abilities: ["reasoning"],
  },
  {
    id: "gemini-2.0-flash",
    name: "Gemini 2.0 Flash",
    icon: "ri:gemini-fill",
    description: "Google's flagship model",
    abilities: ["search", "files"],
  },
  {
    id: "gemini-2.5-flash",
    name: "Gemini 2.5 Flash (thinking)",
    icon: "ri:gemini-fill",
    description: "Google's latest fast model",
    abilities: ["reasoning", "files"],
  },
  {
    id: "gpt-image-gen",
    name: "GPT Image Gen",
    icon: "ri:openai-fill",
    description: "AI model for generating images",
    abilities: ["image-generation"],
  },
  {
    id: "claude-3.5-sonnet",
    name: "Claude 3.5 Sonnet",
    icon: "ri:claude-fill",
    description: "Smart model for complex problems",
    abilities: ["files"],
  },
];
