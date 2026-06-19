const DIFFICULTY_COLORS = {
  Easy: "bg-green-600/20 text-green-300 border-green-700",
  Medium: "bg-amber-600/20 text-amber-300 border-amber-700",
  Hard: "bg-red-600/20 text-red-300 border-red-700",
};

function MacroBar({ label, grams, calorieContribution, totalCalories, colorClass }) {
  const percent = totalCalories > 0 ? Math.round((calorieContribution / totalCalories) * 100) : 0;

  return (
    <div>
      <div className="flex justify-between text-xs text-stone-400 mb-1">
        <span>{label}</span>
        <span>{grams}g ({percent}%)</span>
      </div>
      <div className="h-2 bg-stone-800 rounded-full overflow-hidden">
        <div
          className={`h-full ${colorClass} transition-all duration-500`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export default function RecipeHeader({ recipe }) {
  const { recipeTitle, prepTimeMinutes, difficulty, macroNutrients } = recipe;
  const { calories, proteinGrams, carbsGrams, fatsGrams } = macroNutrients;

  // 4 calories per gram of protein/carbs, 9 per gram of fat
  const proteinCals = proteinGrams * 4;
  const carbsCals = carbsGrams * 4;
  const fatsCals = fatsGrams * 9;

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-lg p-5 space-y-4">
      <div>
        <h2 className="text-xl font-bold text-stone-100">{recipeTitle}</h2>
        <div className="flex items-center gap-3 mt-2 text-sm text-stone-400">
          <span>⏱ {prepTimeMinutes} min</span>
          <span
            className={`px-2 py-0.5 rounded-md text-xs border ${DIFFICULTY_COLORS[difficulty] || DIFFICULTY_COLORS.Medium}`}
          >
            {difficulty}
          </span>
          <span>🔥 {calories} cal</span>
        </div>
      </div>

      <div className="space-y-2">
        <MacroBar
          label="Protein"
          grams={proteinGrams}
          calorieContribution={proteinCals}
          totalCalories={calories}
          colorClass="bg-blue-500"
        />
        <MacroBar
          label="Carbs"
          grams={carbsGrams}
          calorieContribution={carbsCals}
          totalCalories={calories}
          colorClass="bg-amber-500"
        />
        <MacroBar
          label="Fats"
          grams={fatsGrams}
          calorieContribution={fatsCals}
          totalCalories={calories}
          colorClass="bg-rose-500"
        />
      </div>
    </div>
  );
}