import ReactMarkdown from "react-markdown";
import { Copy, Check, Loader2 } from "lucide-react";
import { useState } from "react";

interface Props {
  response: string;
  loading: boolean;
}

export default function ResponsePanel({ response, loading }: Props) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-border bg-card p-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Analyzing your code...</p>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-dashed border-border bg-card p-12">
        <p className="text-sm text-muted-foreground">
          AI response will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="relative rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          AI Response
        </span>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="prose prose-sm dark:prose-invert max-w-none p-4 font-body">
        <ReactMarkdown>{response}</ReactMarkdown>
      </div>
    </div>
  );
}
