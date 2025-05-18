import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { chatHistory, aiModels } from "../types";
import type { ChatSession, Message, AiModel } from "../types";

interface ChatState {
  chats: ChatSession[];
  activeChatId: string | null;
  models: AiModel[];
  isLoading: boolean;

  // Actions
  setActiveChat: (id: string) => void;
  createNewChat: (modelId: string) => string;
  addMessage: (chatId: string, content: string, role: "user" | "assistant") => void;
  deleteChat: (id: string) => void;
  togglePinChat: (id: string) => void;
  updateMessage: (chatId: string, messageId: string, content: string) => void;
  simulateResponse: (chatId: string, prompt: string) => Promise<void>;
  changeModel: (chatId: string, modelId: string) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  chats: [...chatHistory],
  activeChatId: null,
  models: [...aiModels],
  isLoading: false,

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

  updateMessage: (chatId, messageId, content) => {
    set((state) => ({
      chats: state.chats.map((chat) => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: chat.messages.map((msg) => {
              if (msg.id === messageId) {
                return { ...msg, content };
              }
              return msg;
            }),
          };
        }
        return chat;
      }),
    }));
  },

  simulateResponse: async (chatId, prompt) => {
    // First add the user message
    get().addMessage(chatId, prompt, "user");

    // Set loading state
    set({ isLoading: true });

    // Find the current chat to get the model
    const chat = get().chats.find((c) => c.id === chatId);
    if (!chat) {
      set({ isLoading: false });
      return;
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate a response based on the model
    const model = get().models.find((m) => m.id === chat.modelId);
    let response = "I'm sorry, I don't understand your question.";

    if (model) {
      if (
        model.abilities.includes("image-generation") &&
        (prompt.toLowerCase().includes("image") || prompt.toLowerCase().includes("picture"))
      ) {
        response = "I've generated an image based on your request. [Image would be displayed here]";
      } else if (model.abilities.includes("reasoning")) {
        response = `Based on careful reasoning: ${prompt} is an interesting question. Let me think through this step by step and provide a comprehensive answer...`;
      } else if (model.abilities.includes("search")) {
        response = `I've searched the web and found some relevant information about "${prompt}". Here are the most helpful results...`;
      } else {
        response = `Thank you for your message about "${prompt}". I'm processing your request and will provide the best possible answer based on my training.`;
      }
    }

    // Add the assistant's response
    get().addMessage(chatId, response, "assistant");

    // Clear loading state
    set({ isLoading: false });
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
