import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "smart-kitchen-recipe-history";

/**
 * useRecipeCache — manages the "Digital Recipe Box" in localStorage.
 *
 * Each cached entry: { id, timestamp, formInputs, recipeData }
 *
 * Exposes:
 *   history — array of cached recipes, newest first
 *   save(formInputs, recipeData) — persist a new entry
 *   load(id) — returns a single cached entry by id
 *   clear() — wipes all history
 */
export function useRecipeCache() {
  const [history, setHistory] = useState([]);

  // Load existing history on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setHistory(JSON.parse(raw));
      }
    } catch (err) {
      console.error("Failed to load recipe history from localStorage:", err);
      setHistory([]);
    }
  }, []);

  const persist = useCallback((nextHistory) => {
    setHistory(nextHistory);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextHistory));
    } catch (err) {
      console.error("Failed to save recipe history to localStorage:", err);
    }
  }, []);

  const save = useCallback(
    (formInputs, recipeData) => {
      const entry = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        formInputs,
        recipeData,
      };
      setHistory((prev) => {
        const next = [entry, ...prev];
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch (err) {
          console.error("Failed to save recipe history to localStorage:", err);
        }
        return next;
      });
      return entry;
    },
    []
  );

  const load = useCallback(
    (id) => {
      return history.find((entry) => entry.id === id) || null;
    },
    [history]
  );

  const clear = useCallback(() => {
    persist([]);
  }, [persist]);

  return { history, save, load, clear };
}