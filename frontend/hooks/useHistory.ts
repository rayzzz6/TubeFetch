"use client";

import { useCallback, useEffect, useState } from "react";
import { addHistoryEntry, clearHistory, getHistory, removeHistoryEntry } from "@/lib/history";
import { HistoryEntry } from "@/lib/types";

export function useHistory() {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    setEntries(getHistory());
  }, []);

  const record = useCallback((entry: HistoryEntry) => {
    setEntries(addHistoryEntry(entry));
  }, []);

  const remove = useCallback((id: string) => {
    setEntries(removeHistoryEntry(id));
  }, []);

  const clear = useCallback(() => {
    clearHistory();
    setEntries([]);
  }, []);

  return { entries, record, remove, clear };
}
