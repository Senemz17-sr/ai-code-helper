export interface QueryRecord {
  id: string;
  code_input: string;
  language: string;
  action_type: "explain" | "fix" | "optimize";
  ai_response: string;
  timestamp: string;
}

const STORAGE_KEY = "codehelper_history";

export function getHistory(): QueryRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveQuery(query: Omit<QueryRecord, "id" | "timestamp">): QueryRecord {
  const record: QueryRecord = {
    ...query,
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
  };
  const history = getHistory();
  history.unshift(record);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 50)));
  return record;
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
}
