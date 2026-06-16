import { DIETARY_OPTIONS } from "../../constants/schema";

export default function DietaryDropdown({ value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-stone-300 mb-2">
        Dietary Restrictions
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 outline-none focus:border-amber-500"
      >
        {DIETARY_OPTIONS.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.displayName}
          </option>
        ))}
      </select>
    </div>
  );
}