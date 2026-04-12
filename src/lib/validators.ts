/**
 * Input Validation Utilities
 */

import { PATTERNS } from "./constants";

export function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email.trim()) {
    return { valid: false, error: "Email is required" };
  }
  if (!PATTERNS.EMAIL.test(email)) {
    return { valid: false, error: "Invalid email format" };
  }
  return { valid: true };
}

export function validatePassword(password: string): { valid: boolean; error?: string } {
  if (!password) {
    return { valid: false, error: "Password is required" };
  }
  if (password.length < 8) {
    return { valid: false, error: "Password must be at least 8 characters" };
  }
  if (!PATTERNS.PASSWORD.test(password)) {
    return {
      valid: false,
      error: "Password must contain letters and numbers",
    };
  }
  return { valid: true };
}

export function validateCode(code: string, maxLength = 100_000): { valid: boolean; error?: string } {
  if (!code.trim()) {
    return { valid: false, error: "Code cannot be empty" };
  }
  if (code.length > maxLength) {
    return {
      valid: false,
      error: `Code exceeds maximum length of ${maxLength} characters`,
    };
  }
  return { valid: true };
}

export function validatePrompt(prompt: string): { valid: boolean; error?: string } {
  if (!prompt.trim()) {
    return { valid: false, error: "Prompt cannot be empty" };
  }
  if (prompt.length < 3) {
    return { valid: false, error: "Prompt must be at least 3 characters" };
  }
  if (prompt.length > 5000) {
    return { valid: false, error: "Prompt is too long (max 5000 characters)" };
  }
  return { valid: true };
}

export function validateFileSize(size: number, maxSize = 5 * 1024 * 1024): { valid: boolean; error?: string } {
  if (size > maxSize) {
    return {
      valid: false,
      error: `File is too large (max ${maxSize / 1024 / 1024}MB)`,
    };
  }
  return { valid: true };
}

export function validateFileType(filename: string, allowed = ["py", "js", "cpp", "c", "txt"]): { valid: boolean; error?: string } {
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  if (!allowed.includes(ext)) {
    return { valid: false, error: `Unsupported file type. Allowed: ${allowed.join(", ")}` };
  }
  return { valid: true };
}

export function validateUsername(username: string): { valid: boolean; error?: string } {
  if (!username.trim()) {
    return { valid: false, error: "Username is required" };
  }
  if (username.length < 3) {
    return { valid: false, error: "Username must be at least 3 characters" };
  }
  if (username.length > 20) {
    return { valid: false, error: "Username must be less than 20 characters" };
  }
  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    return { valid: false, error: "Username can only contain letters, numbers, hyphens, and underscores" };
  }
  return { valid: true };
}

export function validateProjectTitle(title: string): { valid: boolean; error?: string } {
  if (!title.trim()) {
    return { valid: false, error: "Project title is required" };
  }
  if (title.length > 100) {
    return { valid: false, error: "Title must be less than 100 characters" };
  }
  return { valid: true };
}

/**
 * Code Formatting and Beautification
 */

export function formatCode(code: string, language: string): string {
  // Basic formatting - can be extended with actual beautifiers
  switch (language) {
    case "python":
      return formatPython(code);
    case "javascript":
    case "jsx":
    case "typescript":
    case "tsx":
      return formatJavaScript(code);
    case "cpp":
    case "c":
      return formatC(code);
    default:
      return code;
  }
}

function formatPython(code: string): string {
  // Basic Python formatting
  let lines = code.split("\n");
  let indentation = 0;

  return lines
    .map((line) => {
      const trimmed = line.trim();

      if (!trimmed) return "";

      if (trimmed.endsWith(":")) {
        const formatted = "  ".repeat(indentation) + trimmed;
        indentation++;
        return formatted;
      }

      if (trimmed.startsWith("elif ") || trimmed.startsWith("else") || trimmed.startsWith("except") || trimmed.startsWith("finally")) {
        indentation = Math.max(0, indentation - 1);
      }

      return "  ".repeat(indentation) + trimmed;
    })
    .join("\n");
}

function formatJavaScript(code: string): string {
  // Basic JavaScript formatting
  let formatted = code;

  // Add space after keywords
  formatted = formatted.replace(/\b(if|for|while|function|switch|catch)\(/g, "$1 (");

  // Add spaces around operators
  formatted = formatted.replace(/(\w{1})==(\w{1})/g, "$1 == $2");
  formatted = formatted.replace(/(\w{1})===(\w{1})/g, "$1 === $2");

  return formatted;
}

function formatC(code: string): string {
  // Basic C formatting
  let formatted = code;

  // Add space after keywords
  formatted = formatted.replace(/\b(if|for|while|switch|catch)\(/g, "$1 (");

  // Add spaces around operators
  formatted = formatted.replace(/([a-zA-Z0-9])\{/g, "$1 {");

  return formatted;
}

/**
 * Code Analysis Utilities
 */

export function extractFunctions(code: string, language: string): string[] {
  const functions: string[] = [];

  if (language === "python") {
    const pythonFunctions = code.match(/def\s+(\w+)\s*\(/g) || [];
    pythonFunctions.forEach((match) => {
      functions.push(match.replace(/def\s+(\w+)\s*\(/, "$1"));
    });
  } else if (["javascript", "typescript", "jsx", "tsx"].includes(language)) {
    const jsFunctions = code.match(/(?:function|const|let|var)\s+(\w+)\s*(?:\(|=)/g) || [];
    jsFunctions.forEach((match) => {
      const funcName = match.match(/(\w+)\s*(?:\(|=)$/)?.[1];
      if (funcName) functions.push(funcName);
    });
  }

  return functions;
}

export function getLineCount(code: string): number {
  return code.split("\n").length;
}

export function getCharacterCount(code: string): number {
  return code.length;
}

export function estimateComplexity(code: string): "simple" | "moderate" | "complex" {
  const nestLevel = Math.max(
    ...(code.match(/[{[]/g) || []).map((_, i, arr) => {
      let count = 0;
      for (let j = 0; j <= i; j++) {
        if (arr[j] === "{" || arr[j] === "[") count++;
        if (arr[j] === "}" || arr[j] === "]") count--;
      }
      return count;
    }),
    0
  );

  if (nestLevel <= 2) return "simple";
  if (nestLevel <= 5) return "moderate";
  return "complex";
}

export function highlightSyntax(code: string, language: string): string {
  // This is a placeholder - use a real syntax highlighter like Prism or highlight.js
  return code;
}
