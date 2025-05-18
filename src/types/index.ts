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

export const chatHistory: ChatSession[] = [
  {
    id: "session-1",
    title: "Brainstorming App Ideas",
    date: "2025-05-14",
    messages: [
      {
        id: "msg-1",
        role: "user",
        content: "Give me some app ideas using AI",
        timestamp: "2025-05-14T10:00:00Z",
      },
      {
        id: "msg-2",
        role: "assistant",
        content:
          "Sure! Here are some app ideas using AI:\n\n1. **AI Writing Assistant** - An app that helps users write better content by suggesting improvements, fixing grammar, and offering alternative phrasings.\n\n2. **Smart Travel Planner** - Creates personalized travel itineraries based on user preferences, budget, and time constraints.\n\n3. **Habit Formation Coach** - Uses AI to analyze user behavior patterns and provide personalized strategies for building positive habits.\n\n4. **Personalized Learning Platform** - Adapts educational content to match individual learning styles and pace.\n\n5. **Health Symptom Analyzer** - Helps users understand potential causes of symptoms and suggests when to see a doctor.\n\n6. **AI Recipe Generator** - Creates recipes based on ingredients you have available and dietary preferences.\n\n7. **Financial Advisor** - Provides personalized financial advice based on spending habits and goals.\n\n8. **Voice-to-Text Meeting Assistant** - Records and transcribes meetings, highlighting action items and key decisions.\n\n9. **Personalized Fitness Coach** - Creates workout plans tailored to individual goals, equipment access, and fitness level.\n\n10. **Language Learning Companion** - Provides conversational practice and personalized lessons based on your progress.",
        timestamp: "2025-05-14T10:00:05Z",
      },
    ],
    modelId: "gpt-4",
  },
  {
    id: "session-2",
    title: "Marketing Copy Generator",
    date: "2025-05-13",
    messages: [
      {
        id: "msg-1",
        role: "user",
        content: "Write a marketing tagline for a new fitness app",
        timestamp: "2025-05-13T15:12:00Z",
      },
      {
        id: "msg-2",
        role: "assistant",
        content: '"Transform your body, one workout at a time."',
        timestamp: "2025-05-13T15:12:03Z",
      },
    ],
    modelId: "gemini-2.0-flash",
    pinned: true,
  },
  {
    id: "session-3",
    title: "Image Generation Ideas",
    date: "2025-05-01",
    messages: [
      {
        id: "msg-1",
        role: "user",
        content: "Generate an image of a futuristic city with flying cars",
        timestamp: "2025-05-01T09:30:00Z",
      },
      {
        id: "msg-2",
        role: "assistant",
        content:
          "I've created an image of a futuristic cityscape with sleek flying vehicles moving between towering skyscrapers. The city features advanced architecture with curved glass buildings, suspended gardens, and holographic advertisements. The scene is set during sunset, giving the city a warm golden glow contrasted with cool blue lighting from the buildings.",
        timestamp: "2025-05-01T09:30:10Z",
      },
    ],
    modelId: "gpt-image-gen",
  },
  {
    id: "session-4",
    title: "Complex Problem Solving",
    date: "2025-04-20",
    messages: [
      {
        id: "msg-1",
        role: "user",
        content: "Help me understand quantum computing principles",
        timestamp: "2025-04-20T14:25:00Z",
      },
      {
        id: "msg-2",
        role: "assistant",
        content:
          "Quantum computing is based on quantum bits or 'qubits' that can exist in multiple states simultaneously, unlike classical bits that are either 0 or 1. This property, called superposition, allows quantum computers to process vast amounts of information in parallel. Another key principle is entanglement, where qubits become linked and the state of one instantly affects the other, regardless of distance. These properties enable quantum computers to solve certain complex problems much faster than classical computers, particularly in areas like cryptography, optimization, and simulating quantum systems.",
        timestamp: "2025-04-20T14:25:15Z",
      },
    ],
    modelId: "claude-3.5-sonnet",
  },
];

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
