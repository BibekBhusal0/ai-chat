export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

export type ChatSession = {
  id: string;
  title: string;
  date: string;
  messages: Message[];
  modelId: string;
  pinned?: boolean;
};

export type AiModel = {
  id: string;
  name: string;
  icon: string;
  description: string;
  abilities: string[];
};
