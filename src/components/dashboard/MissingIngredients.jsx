import { useState } from "react";

export default function MissingIngredients({ utilizedIngredients, missingIngredientsToBuy }) {
  const [checked, setChecked] = useState({});

  const toggleItem = (item) => {
    setChecked((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-lg p-5 space-y-5">
      {missingIngredientsToBuy.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-stone-300 mb-3">
            🛒 Missing — Add to Shopping List
          </h3>
          <div className="space-y-2">
            {missingIngredientsToBuy.map((item) => (
              <label
                key={item}
                className="flex items-center gap-2 text-sm cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={!!checked[item]}
                  onChange={() => toggleItem(item)}
                  className="accent-amber-500"
                />
                <span
                  className={
                    checked[item]
                      ? "line-through text-stone-500"
                      : "text-stone-200 group-hover:text-amber-300"
                  }
                >
                  {item}
                </span>
              </label>
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