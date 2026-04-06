import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { oneDark } from "@codemirror/theme-one-dark";
import { useTheme } from "@/hooks/useTheme";

const langExtensions: Record<string, () => any> = {
  python: () => python(),
  javascript: () => javascript(),
  c: () => cpp(),
  "c++": () => cpp(),
};

interface Props {
  value: string;
  onChange: (val: string) => void;
  language: string;
}

export default function CodeEditor({ value, onChange, language }: Props) {
  const { dark } = useTheme();
  const ext = langExtensions[language]?.() ?? python();

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <CodeMirror
        value={value}
        onChange={onChange}
        extensions={[ext]}
        theme={dark ? oneDark : undefined}
        height="300px"
        placeholder="Paste or type your code here..."
        className="font-mono text-sm"
      />
    </div>
  );
}
