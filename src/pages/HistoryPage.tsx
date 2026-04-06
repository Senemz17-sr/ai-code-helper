import { useState, useEffect } from "react";
import { getHistory, clearHistory, type QueryRecord } from "@/lib/history";
import { Code2, Bug, Zap, Trash2, ChevronRight } from "lucide-react";
import ReactMarkdown from "react-markdown";

const actionIcons: Record<string, typeof Code2> = {
  explain: Code2,
  fix: Bug,
  optimize: Zap,
};

const actionColors: Record<string, string> = {
  explain: "bg-primary/10 text-primary",
  fix: "bg-destructive/10 text-destructive",
  optimize: "bg-accent/10 text-accent",
};

export default function HistoryPage() {
  const [history, setHistory] = useState<QueryRecord[]>([]);
  const [selected, setSelected] = useState<QueryRecord | null>(null);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleClear = () => {
    clearHistory();
    setHistory([]);
    setSelected(null);
  };

  if (selected) {
    return (
      <div className="container max-w-4xl px-4 py-8">
        <button
          onClick={() => setSelected(null)}
          className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to history
        </button>
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium ${actionColors[selected.action_type]}`}>
              {selected.action_type}
            </span>
            <span className="text-xs text-muted-foreground">
              {selected.language} · {new Date(selected.timestamp).toLocaleString()}
            </span>
          </div>
          <pre className="mb-6 overflow-x-auto rounded-lg bg-muted p-4 font-mono text-sm">
            {selected.code_input}
          </pre>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown>{selected.ai_response}</ReactMarkdown>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl px-4 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">History</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Your previous code analyses
          </p>
        </div>
        {history.length > 0 && (
          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="mt-12 flex flex-col items-center gap-2 text-center">
          <Code2 className="h-10 w-10 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">No history yet. Start analyzing code!</p>
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-2">
          {history.map((q) => {
            const Icon = actionIcons[q.action_type] ?? Code2;
            return (
              <button
                key={q.id}
                onClick={() => setSelected(q)}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:bg-secondary/50 group"
              >
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${actionColors[q.action_type]}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-mono text-sm">{q.code_input.slice(0, 80)}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {q.language} · {new Date(q.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground/40 transition-colors group-hover:text-foreground" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
