import { useState } from "react";

export default function IngredientInput({ ingredients, onAdd, onRemove }) {
  const [value, setValue] = useState("");

  const commitChip = () => {
    const trimmed = value.trim().replace(/,$/, "");
    if (trimmed && !ingredients.includes(trimmed)) {
      onAdd(trimmed);
    }
    setValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      commitChip();
    }
    if (e.key === "Backspace" && value === "" && ingredients.length > 0) {
      onRemove(ingredients[ingredients.length - 1]);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-stone-300 mb-2">
        Fridge Inventory
      </label>
      <div className="flex flex-wrap gap-2 p-3 bg-stone-900 border border-stone-700 rounded-lg focus-within:border-amber-500">
        {ingredients.map((item) => (
          <span
            key={item}
            className="flex items-center gap-1 bg-amber-600/20 text-amber-300 text-sm px-2 py-1 rounded-md"
          >
            {item}
            <button
              type="button"
              onClick={() => onRemove(item)}
              className="hover:text-amber-100"
              aria-label={`Remove ${item}`}
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={commitChip}
          placeholder={ingredients.length === 0 ? "Type an ingredient and press Enter..." : ""}
          className="flex-1 min-w-[120px] bg-transparent outline-none text-stone-100 placeholder-stone-500 text-sm"
        />
      </div>
    </div>
  );
}