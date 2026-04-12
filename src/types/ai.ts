// AI-related types and interfaces

export type AIMode = "generate" | "debug" | "explain" | "optimize" | "refactor";
export type Language = "python" | "javascript" | "cpp" | "c" | "java" | "go" | "rust";
export type ModelType = "gpt-4" | "gpt-3.5-turbo" | "claude-3" | "gemini";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  code?: string;
  language?: Language;
  mode?: AIMode;
  tokens?: number;
  timestamp: Date;
  metadata?: {
    executionTime?: number;
    model?: ModelType;
    temperature?: number;
  };
}

export interface Conversation {
  id: string;
  title: string;
  description?: string;
  messages: ChatMessage[];
  language: Language;
  model: ModelType;
  isPublic: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  favorited?: boolean;
}

export interface CodeFile {
  id: string;
  name: string;
  language: Language;
  content: string;
  lineCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  files: CodeFile[];
  tags: string[];
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  collaborators?: string[];
}

export interface AIResponse {
  id: string;
  code: string;
  explanation: string;
  suggestions?: string[];
  errors?: AIError[];
  performance?: {
    timeComplexity?: string;
    spaceComplexity?: string;
    optimizationTips?: string[];
  };
  metadata?: {
    model: ModelType;
    temperature: number;
    tokens: {
      prompt: number;
      completion: number;
      total: number;
    };
  };
}

export interface AIError {
  line: number;
  column: number;
  message: string;
  severity: "error" | "warning" | "info";
  suggestion?: string;
}

export interface APIKey {
  id: string;
  name: string;
  provider: "openai" | "anthropic" | "google";
  keyHash: string;
  createdAt: Date;
  lastUsedAt?: Date;
  isActive: boolean;
}

export interface UsageStats {
  totalRequests: number;
  totalTokens: number;
  requestsByMode: Record<AIMode, number>;
  requestsByLanguage: Record<Language, number>;
  lastRequestAt?: Date;
  currentMonthUsage: {
    requests: number;
    tokens: number;
  };
}

export interface AIConfig {
  apiKey: string;
  provider: "openai" | "anthropic" | "google";
  model: ModelType;
  temperature: number;
  maxTokens: number;
  topP: number;
}

export const AI_MODE_CONFIG: Record<AIMode, {
  name: string;
  description: string;
  icon: string;
  color: string;
  systemPrompt: string;
}> = {
  generate: {
    name: "Generate Code",
    description: "Create new code from description",
    icon: "Wand2",
    color: "emerald",
    systemPrompt: "You are an expert code generator. Generate clean, production-ready code with best practices."
  },
  debug: {
    name: "Debug Code",
    description: "Find and fix bugs",
    icon: "Bug",
    color: "red",
    systemPrompt: "You are an expert debugger. Analyze code for bugs, explain them clearly, and provide fixes."
  },
  explain: {
    name: "Explain Code",
    description: "Line-by-line explanation",
    icon: "BookOpen",
    color: "blue",
    systemPrompt: "You are an expert code explainer. Provide clear, detailed line-by-line explanations."
  },
  optimize: {
    name: "Optimize Code",
    description: "Improve performance",
    icon: "Zap",
    color: "yellow",
    systemPrompt: "You are a performance expert. Optimize code for speed, memory, and readability."
  },
  refactor: {
    name: "Refactor Code",
    description: "Improve structure",
    icon: "RefreshCw",
    color: "purple",
    systemPrompt: "You are a clean code expert. Refactor code to follow best practices and design patterns."
  }
};
