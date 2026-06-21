import { useState } from "react";

function formatTimestamp(ts) {
  const date = new Date(ts);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function HistorySidebar({ history, onSelect, onClear, activeId }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-lg">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <span className="text-sm font-medium text-stone-300">
          📖 Recipe History {history.length > 0 && `(${history.length})`}
        </span>
        <span className="text-stone-500 text-xs">{isOpen ? "▲ Collapse" : "▼ Expand"}</span>
      </button>

      {isOpen && (
        <div className="border-t border-stone-800 p-3 space-y-2">
          {history.length === 0 && (
            <p className="text-xs text-stone-500 px-2 py-3 text-center">
              No saved recipes yet. Generate one to start your collection!
            </p>
          )}

          {history.map((entry) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => onSelect(entry.id)}
              className={`w-full text-left p-3 rounded-md border transition-colors ${
                activeId === entry.id
                  ? "bg-amber-600/15 border-amber-700"
                  : "bg-stone-950 border-stone-800 hover:border-stone-600"
              }`}
            >
              <div className="flex justify-between items-start gap-2">
                <span className="text-sm text-stone-200 line-clamp-1">
                  {entry.recipeData.recipeTitle}
                </span>
                <span className="flex-shrink-0 text-xs px-1.5 py-0.5 rounded bg-stone-800 text-stone-400">
                  cached
                </span>
              </div>
              <span className="text-xs text-stone-500">
                {formatTimestamp(entry.timestamp)}
              </span>
            </button>
          ))}

          {history.length > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="w-full text-xs text-red-400 hover:text-red-300 pt-2"
            >
              Clear all history
            </button>
          )}
        </div>
      )}
    </div>
  );
}