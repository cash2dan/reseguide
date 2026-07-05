import { useState, useCallback, useEffect } from "react";

const KEY = "reseguide.checks.v1";

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}

export function useChecklist() {
  const [checks, setChecks] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(checks));
    } catch {
      // storage full or blocked – app still works, just won't persist
    }
  }, [checks]);

  const toggle = useCallback((id) => {
    setChecks((c) => ({ ...c, [id]: !c[id] }));
  }, []);

  const isChecked = useCallback((id) => !!checks[id], [checks]);

  const countFor = useCallback(
    (prefix) => {
      const keys = Object.keys(checks).filter((k) => k.startsWith(prefix) && checks[k]);
      return keys.length;
    },
    [checks]
  );

  const resetAll = useCallback(() => setChecks({}), []);

  return { toggle, isChecked, countFor, resetAll };
}
