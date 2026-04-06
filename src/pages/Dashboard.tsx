import { useState } from "react";
import { Code2, Bug, Zap } from "lucide-react";
import CodeEditor from "@/components/CodeEditor";
import ResponsePanel from "@/components/ResponsePanel";
import { saveQuery } from "@/lib/history";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const LANGUAGES = ["python", "javascript", "c", "c++"] as const;
type ActionType = "explain" | "fix" | "optimize";

const actions: { type: ActionType; label: string; icon: typeof Code2 }[] = [
  { type: "explain", label: "Explain Code", icon: Code2 },
  { type: "fix", label: "Fix Errors", icon: Bug },
  { type: "optimize", label: "Optimize Code", icon: Zap },
];

async function streamAnalysis(
  code: string,
  language: string,
  action: ActionType,
  onDelta: (text: string) => void,
  onDone: () => void,
) {
  const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-code`;
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ code, language, action }),
  });

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({ error: "Request failed" }));
    throw new Error(err.error || `Error ${resp.status}`);
  }

  if (!resp.body) throw new Error("No response body");

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let done = false;

  while (!done) {
    const { done: readerDone, value } = await reader.read();
    if (readerDone) break;
    buffer += decoder.decode(value, { stream: true });

    let newlineIndex: number;
    while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
      let line = buffer.slice(0, newlineIndex);
      buffer = buffer.slice(newlineIndex + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (line.startsWith(":") || line.trim() === "") continue;
      if (!line.startsWith("data: ")) continue;
      const jsonStr = line.slice(6).trim();
      if (jsonStr === "[DONE]") { done = true; break; }
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch {
        buffer = line + "\n" + buffer;
        break;
      }
    }
  }

  onDone();
}

export default function Dashboard() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState<string>("python");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAction = async (action: ActionType) => {
    if (!code.trim()) return;
    setLoading(true);
    setResponse("");

    let fullResponse = "";

    try {
      await streamAnalysis(
        code,
        language,
        action,
        (chunk) => {
          fullResponse += chunk;
          setResponse(fullResponse);
        },
        () => {
          setLoading(false);
          if (fullResponse) {
            saveQuery({ code_input: code, language, action_type: action, ai_response: fullResponse });
          }
        },
      );
    } catch (err: any) {
      setLoading(false);
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  return (
    <div className="container max-w-6xl px-4 py-8">
      <h1 className="font-heading text-2xl font-bold">Code Analyzer</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Paste your code, pick a language, and choose an action.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-fit rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {LANGUAGES.map((l) => (
              <option key={l} value={l}>
                {l.charAt(0).toUpperCase() + l.slice(1)}
              </option>
            ))}
          </select>

          <CodeEditor value={code} onChange={setCode} language={language} />

          <div className="flex flex-wrap gap-2">
            {actions.map(({ type, label, icon: Icon }) => (
              <button
                key={type}
                onClick={() => handleAction(type)}
                disabled={loading || !code.trim()}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary disabled:opacity-40 disabled:pointer-events-none"
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <ResponsePanel response={response} loading={loading} />
        </div>
      </div>
    </div>
  );
}
