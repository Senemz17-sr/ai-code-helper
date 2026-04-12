import type { AIMode, Language, AIResponse, AIError } from "@/types/ai";

/**
 * OpenAI Service
 * Handles all AI API calls and integrations
 */

interface OpenAIConfig {
  apiKey: string;
  baseURL?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

class OpenAIService {
  private apiKey: string;
  private baseURL: string;
  private model: string;
  private temperature: number;
  private maxTokens: number;

  constructor(config: OpenAIConfig) {
    this.apiKey = config.apiKey;
    this.baseURL = config.baseURL || "https://api.openai.com/v1";
    this.model = config.model || "gpt-3.5-turbo";
    this.temperature = config.temperature || 0.7;
    this.maxTokens = config.maxTokens || 2048;
  }

  /**
   * Generate code from description
   */
  async generateCode(
    prompt: string,
    language: Language,
    context?: string
  ): Promise<AIResponse> {
    const systemPrompt = `You are an expert code generator. Generate clean, production-ready ${language} code that follows best practices and conventions. Include comments for complex logic.`;

    const userPrompt = `
Language: ${language}
Task: ${prompt}
${context ? `Context/Requirements:\n${context}` : ""}

Generate the code:`;

    return this.callOpenAI(systemPrompt, userPrompt, language);
  }

  /**
   * Debug code and find issues
   */
  async debugCode(
    code: string,
    language: Language,
    description?: string
  ): Promise<AIResponse> {
    const systemPrompt = `You are an expert debugger. Analyze the provided ${language} code for bugs, issues, and problems. List each issue with:
1. Location (line number if possible)
2. Description
3. Fix/Solution
4. Code example of the fix`;

    const userPrompt = `
Language: ${language}
${description ? `User Description: ${description}` : ""}

Code to debug:
\`\`\`${language}
${code}
\`\`\`

Please analyze and list all issues:`;

    return this.callOpenAI(systemPrompt, userPrompt, language, code);
  }

  /**
   * Explain code line by line
   */
  async explainCode(code: string, language: Language): Promise<AIResponse> {
    const systemPrompt = `You are an expert code explainer. Provide a clear, detailed explanation of the code. Break it down:
1. Overall purpose
2. Key components
3. Line-by-line or section-by-section explanation
4. Any important algorithms or patterns used`;

    const userPrompt = `
Language: ${language}

Please explain this code:
\`\`\`${language}
${code}
\`\`\`

Provide a comprehensive explanation:`;

    return this.callOpenAI(systemPrompt, userPrompt, language, code);
  }

  /**
   * Optimize code for performance
   */
  async optimizeCode(code: string, language: Language): Promise<AIResponse> {
    const systemPrompt = `You are a performance optimization expert. Analyze ${language} code and suggest optimizations for:
1. Time complexity improvement
2. Space complexity reduction
3. Better algorithms or data structures
4. Code readability and maintainability
5. Memory usage

Provide the optimized code and explain the improvements.`;

    const userPrompt = `
Language: ${language}

Please optimize this code:
\`\`\`${language}
${code}
\`\`\`

Provide optimized version with explanations:`;

    return this.callOpenAI(systemPrompt, userPrompt, language, code);
  }

  /**
   * Refactor code for better structure
   */
  async refactorCode(code: string, language: Language): Promise<AIResponse> {
    const systemPrompt = `You are a clean code expert and software architect. Refactor ${language} code following:
1. SOLID principles
2. Design patterns where applicable
3. Naming conventions
4. Code organization
5. Separation of concerns
6. DRY (Don't Repeat Yourself)

Provide refactored code with explanations of improvements.`;

    const userPrompt = `
Language: ${language}

Please refactor this code:
\`\`\`${language}
${code}
\`\`\`

Provide refactored version with improvements:`;

    return this.callOpenAI(systemPrompt, userPrompt, language, code);
  }

  /**
   * Analyze code for issues
   */
  async analyzeCode(code: string, language: Language): Promise<{
    issues: AIError[];
    summary: string;
    suggestions: string[];
  }> {
    const systemPrompt = `You are an expert code analyzer. Analyze code for:
1. Bugs and logic errors
2. Performance issues
3. Security vulnerabilities
4. Best practice violations
5. Code quality issues

Format response as JSON:
{
  "issues": [{"line": number, "column": number, "message": string, "severity": "error|warning|info", "suggestion": string}],
  "summary": "brief overview",
  "suggestions": ["suggestion1", "suggestion2"]
}`;

    const userPrompt = `
Language: ${language}

Analyze this code:
\`\`\`${language}
${code}
\`\`\``;

    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: this.temperature,
          max_tokens: this.maxTokens,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "OpenAI API error");
      }

      const content = data.choices[0].message.content;
      const parsed = JSON.parse(content);

      return parsed;
    } catch (error) {
      console.error("Code analysis error:", error);
      throw error;
    }
  }

  /**
   * Internal method to call OpenAI API
   */
  private async callOpenAI(
    systemPrompt: string,
    userPrompt: string,
    language: Language,
    originalCode?: string
  ): Promise<AIResponse> {
    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: this.temperature,
          max_tokens: this.maxTokens,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "OpenAI API error");
      }

      const content = data.choices[0].message.content;

      // Parse response to extract code if present
      const codeMatch = content.match(/```(\w*)\n([\s\S]*?)```/);
      const code = codeMatch ? codeMatch[2].trim() : undefined;
      const explanation = content.replace(/```[\s\S]*?```/g, "").trim();

      return {
        id: data.id,
        code: code || "",
        explanation,
        metadata: {
          model: this.model as any,
          temperature: this.temperature,
          tokens: {
            prompt: data.usage.prompt_tokens,
            completion: data.usage.completion_tokens,
            total: data.usage.total_tokens,
          },
        },
      };
    } catch (error) {
      console.error("OpenAI API error:", error);
      throw error;
    }
  }

  /**
   * Validate API key
   */
  async validateAPIKey(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/models`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Get usage information
   */
  async getUsage(): Promise<any> {
    // This endpoint may not be publicly available
    // Usually requires backend to track usage
    try {
      const response = await fetch(`${this.baseURL}/usage`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      });
      return await response.json();
    } catch {
      return null;
    }
  }
}

// Export singleton instance initialization function
export function initializeOpenAI(apiKey: string, config?: Partial<OpenAIConfig>) {
  return new OpenAIService({
    apiKey,
    ...config,
  });
}

export default OpenAIService;
