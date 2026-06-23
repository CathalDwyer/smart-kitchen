import { useState } from "react";
import { suggestSwap } from "../../lib/geminiClient";

export default function MissingIngredients({ utilizedIngredients, missingIngredientsToBuy, recipe }) {
  const [checked, setChecked] = useState({});
  const [swaps, setSwaps] = useState({});
  const [loadingSwap, setLoadingSwap] = useState({});

  const toggleItem = (item) => {
    setChecked((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const handleSwap = async (item) => {
    setLoadingSwap((prev) => ({ ...prev, [item]: true }));
    try {
      const result = await suggestSwap(item, recipe.recipeTitle, "none");
      setSwaps((prev) => ({ ...prev, [item]: result }));
    } catch {
      setSwaps((prev) => ({ ...prev, [item]: { substitute: "No suggestion available", reason: "" } }));
    } finally {
      setLoadingSwap((prev) => ({ ...prev, [item]: false }));
    }
  };

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-lg p-5 space-y-5">
      {missingIngredientsToBuy.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-stone-300 mb-3">
            🛒 Missing — Add to Shopping List
          </h3>
          <div className="space-y-3">
            {missingIngredientsToBuy.map((item) => (
              <div key={item}>
                <label className="flex items-center gap-2 text-sm cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checked[item]}
                    onChange={() => toggleItem(item)}
                    className="accent-amber-500"
                  />
                  <span
                    className={
                      checked[item]
                        ? "line-through text-stone-500 flex-1"
                        : "text-stone-200 group-hover:text-amber-300 flex-1"
                    }
                  >
                    {item}
                  </span>
                  <button
                    onClick={() => handleSwap(item)}
                    disabled={!!loadingSwap[item]}
                    className="text-xs text-amber-400 hover:text-amber-300 border border-amber-800 px-2 py-0.5 rounded disabled:opacity-50"
                  >
                    {loadingSwap[item] ? "..." : "Swap ↔"}
                  </button>
                </label>
                {swaps[item] && (
                  <div className="ml-5 mt-1 text-xs bg-stone-800 border border-stone-700 rounded px-3 py-2">
                    <span className="text-amber-300 font-medium">{swaps[item].substitute}</span>
                    {swaps[item].reason && (
                      <span className="text-stone-400"> — {swaps[item].reason}</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {utilizedIngredients.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-stone-300 mb-3">
            ✓ You Already Have These
          </h3>
          <div className="flex flex-wrap gap-2">
            {utilizedIngredients.map((item) => (
              <span
                key={item}
                className="text-xs bg-green-600/15 text-green-300 border border-green-800 px-2 py-1 rounded-md"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}