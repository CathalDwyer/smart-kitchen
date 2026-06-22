import RecipeHeader from "./RecipeHeader";
import MissingIngredients from "./MissingIngredients";
import CookingSteps from "./CookingSteps";
import { useClipboard } from "../../hooks/useClipboard";
import { downloadMarkdown } from "../../lib/exportUtils";

export default function RecipeDashboard({ recipe }) {
  const { copy, copied } = useClipboard();

  const allIngredients = [
    ...recipe.utilizedIngredients,
    ...recipe.missingIngredientsToBuy,
  ].join(", ");

  return (
    <div className="space-y-4">
      <RecipeHeader recipe={recipe} />

      <div className="flex gap-3">
        <button
          onClick={() => copy(allIngredients)}
          className="flex-1 bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 text-sm py-2 rounded-lg"
        >
          {copied ? "✓ Copied!" : "📋 Copy Ingredients"}
        </button>
        <button
          onClick={() => downloadMarkdown(recipe)}
          className="flex-1 bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 text-sm py-2 rounded-lg"
        >
           Export .md
        </button>
      </div>

      <MissingIngredients
        utilizedIngredients={recipe.utilizedIngredients}
        missingIngredientsToBuy={recipe.missingIngredientsToBuy}
      />
      <CookingSteps cookingSteps={recipe.cookingSteps} />
    </div>
  );
}