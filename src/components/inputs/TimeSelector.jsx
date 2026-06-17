import { TIME_OPTIONS } from "../../constants/schema";

export default function TimeSelector({ value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-stone-300 mb-2">
        Time & Complexity
      </label>
      <div className="flex gap-2">
        {TIME_OPTIONS.map((opt) => {
          const isActive = value === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              className={`flex-1 px-3 py-2 rounded-lg text-sm border transition-colors ${
                isActive
                  ? "bg-amber-600 border-amber-600 text-stone-950 font-medium"
                  : "bg-stone-900 border-stone-700 text-stone-300 hover:border-stone-500"
              }`}
            >
              {opt.displayName}
            </button>
          );
        })}
      </div>
    </div>
  );
}