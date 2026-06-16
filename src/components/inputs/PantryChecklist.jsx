import { PANTRY_STAPLES } from "../../constants/schema";

export default function PantryChecklist({ selected, onToggle }) {
  return (
    <div>
      <label className="block text-sm font-medium text-stone-300 mb-2">
        Pantry Staples
      </label>
      <div className="flex flex-wrap gap-2">
        {PANTRY_STAPLES.map((item) => {
          const isChecked = selected.includes(item);
          return (
            <label
              key={item}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm cursor-pointer border transition-colors ${
                isChecked
                  ? "bg-amber-600/20 border-amber-500 text-amber-300"
                  : "bg-stone-900 border-stone-700 text-stone-300 hover:border-stone-500"
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onToggle(item)}
                className="accent-amber-500"
              />
              {item}
            </label>
          );
        })}
      </div>
    </div>
  );
}