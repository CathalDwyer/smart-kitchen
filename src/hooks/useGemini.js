import { useState, useCallback } from "react";
import { generateRecipe } from "../lib/geminiClient";

export function useGemini() {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const generate = useCallback(async (ingredients, dietaryId, timeLimitMinutes) => {
    setStatus("loading");
    setError(null);
    setData(null);

    try {
      const result = await generateRecipe(ingredients, dietaryId, timeLimitMinutes);

      if (result.poisonPill) {
        setStatus("invalid");
        return;
      }

      setData(result.data);
      setStatus("success");
    } catch (err) {
      setError(err.message || "Something went wrong generating your recipe.");
      setStatus("error");
    }
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setData(null);
    setError(null);
  }, []);

  return { status, data, error, generate, reset };
}