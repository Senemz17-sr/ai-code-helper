/**
 * App Constants
 */

export const APP_NAME = "CodeHelper AI";
export const APP_DESCRIPTION = "Transform your coding with AI assistance";

// Languages
export const SUPPORTED_LANGUAGES = ["python", "javascript", "cpp", "c", "java", "go", "rust"] as const;

export const LANGUAGE_ICONS: Record<string, string> = {
  python: "🐍",
  javascript: "⚡",
  cpp: "🔧",
  c: "⚙️",
  java: "☕",
  go: "🐹",
  rust: "🦀",
};

// AI Modes
export const AI_MODES = [
  { id: "generate", label: "Generate", icon: "Wand2", color: "emerald" },
  { id: "debug", label: "Debug", icon: "Bug", color: "red" },
  { id: "explain", label: "Explain", icon: "BookOpen", color: "blue" },
  { id: "optimize", label: "Optimize", icon: "Zap", color: "yellow" },
  { id: "refactor", label: "Refactor", icon: "RefreshCw", color: "purple" },
] as const;

// API Configuration
export const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001/api",
  timeout: 30000,
};

// AI Configuration
export const AI_CONFIG = {
  defaultModel: "gpt-3.5-turbo",
  temperature: 0.7,
  maxTokens: 2048,
  topP: 1,
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: "auth_token",
  USER_PREFERENCES: "user_preferences",
  CHAT_HISTORY: "chat_history",
  API_KEY: "api_key",
  THEME: "theme",
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  UNAUTHORIZED: "You need to be logged in",
  FORBIDDEN: "You don't have permission to access this",
  NOT_FOUND: "Resource not found",
  SERVER_ERROR: "Server error. Please try again later",
  NETWORK_ERROR: "Network error. Check your connection",
  VALIDATION_ERROR: "Invalid input",
  API_KEY_MISSING: "API key is required",
  API_KEY_INVALID: "Invalid API key",
  FILE_TOO_LARGE: "File is too large (max 5MB)",
  UNSUPPORTED_FILE_TYPE: "File type not supported",
};

// Success Messages
export const SUCCESS_MESSAGES = {
  CODE_GENERATED: "Code generated successfully",
  CODE_DEBUGGED: "Debug analysis complete",
  CODE_EXPLAINED: "Code explained successfully",
  CODE_OPTIMIZED: "Optimization suggestions provided",
  CODE_REFACTORED: "Code refactored successfully",
  FILE_UPLOADED: "File uploaded successfully",
  SAVED: "Saved successfully",
};

// Feature Limits
export const LIMITS = {
  FREE: {
    requestsPerMonth: 50,
    maxFileSize: 1_000_000, // 1MB
    maxCodeLength: 10_000,
  },
  PRO: {
    requestsPerMonth: null, // unlimited
    maxFileSize: 10_000_000, // 10MB
    maxCodeLength: 100_000,
  },
  ENTERPRISE: {
    requestsPerMonth: null, // unlimited
    maxFileSize: 100_000_000, // 100MB
    maxCodeLength: 1_000_000,
  },
};

// Regex Patterns
export const PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
  CODE_BLOCK: /```(\w*)\n([\s\S]*?)```/g,
  FUNCTION_DECLARATION: /function\s+\w+\s*\(|const\s+\w+\s*=\s*\(/,
};

// Animation timing (in ms)
export const ANIMATION_TIMING = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 1000,
};

// Breakpoints
export const BREAKPOINTS = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

// Color Palette
export const COLORS = {
  primary: "#10a981",
  "primary-dark": "#059669",
  secondary: "#8b5cf6",
  background: "#0f172a",
  surface: "#1e293b",
  border: "#334155",
  success: "#10b981",
  warning: "#f59e0b",
  destructive: "#ef4444",
  info: "#3b82f6",
};
