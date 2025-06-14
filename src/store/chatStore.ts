import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import type { ChatSession, Message, AiModel } from "../types";
import { chatHistory } from "../data/histry";
import { aiModels } from "../data/models";
import { getAnswer } from "../data/suggestions";

interface ChatState {
  chats: ChatSession[];
  activeChatId: string | null;
  models: AiModel[];

  // Actions
  setActiveChat: (id: string) => void;
  createNewChat: (modelId: string) => string;
  addMessage: (chatId: string, content: string, role: "user" | "assistant") => void;
  deleteChat: (id: string) => void;
  togglePinChat: (id: string) => void;
  simulateResponse: (chatId: string, prompt: string) => Promise<void>;
  changeModel: (chatId: string, modelId: string) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  chats: [...chatHistory],
  activeChatId: null,
  models: [...aiModels],

  setActiveChat: (id) => {
    set({ activeChatId: id });
  },

  createNewChat: (modelId) => {
    const newChatId = uuidv4();
    const newChat: ChatSession = {
      id: newChatId,
      title: "New Chat",
      date: new Date().toISOString(),
      messages: [],
      modelId,
    };
    set((state) => ({
      chats: [newChat, ...state.chats],
      activeChatId: newChatId,
    }));
    return newChatId;
  },

  addMessage: (chatId, content, role) => {
    const message: Message = {
      id: uuidv4(),
      role,
      content,
      timestamp: new Date().toISOString(),
    };

    set((state) => ({
      chats: state.chats.map((chat) => {
        if (chat.id === chatId) {
          // Update chat title if it's the first user message
          const isFirstMessage = chat.messages.length === 0 && role === "user";
          const title = isFirstMessage
            ? content.slice(0, 30) + (content.length > 30 ? "..." : "")
            : chat.title;

          return {
            ...chat,
            title,
            messages: [...chat.messages, message],
            date: new Date().toISOString(), // Update the date to current
          };
        }
        return chat;
      }),
    }));
  },

  deleteChat: (id) => {
    set((state) => {
      const newChats = state.chats.filter((chat) => chat.id !== id);
      const newActiveChatId =
        state.activeChatId === id ? newChats[0]?.id || null : state.activeChatId;

      return {
        chats: newChats,
        activeChatId: newActiveChatId,
      };
    });
  },

  togglePinChat: (id) => {
    set((state) => ({
      chats: state.chats.map((chat) => {
        if (chat.id === id) {
          return { ...chat, pinned: !chat.pinned };
        }
        return chat;
      }),
    }));
  },

  simulateResponse: async (chatId, prompt) => {
    // First add the user message
    get().addMessage(chatId, prompt, "user");

    // Find the current chat to get the model
    const chat = get().chats.find((c) => c.id === chatId);
    if (!chat) return;

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 15));

    const response = getAnswer(prompt);
    get().addMessage(chatId, response, "assistant");
  },

  changeModel: (chatId, modelId) => {
    set((state) => ({
      chats: state.chats.map((chat) => {
        if (chat.id === chatId) {
          return { ...chat, modelId: modelId };
        }
        return chat;
      }),
    }));
  },
}));
