import RecipeHeader from "./RecipeHeader";
import MissingIngredients from "./MissingIngredients";
import CookingSteps from "./CookingSteps";

export default function RecipeDashboard({ recipe }) {
  return (
    <div className="space-y-4">
      <RecipeHeader recipe={recipe} />
      <MissingIngredients
        utilizedIngredients={recipe.utilizedIngredients}
        missingIngredientsToBuy={recipe.missingIngredientsToBuy}
      />
      <CookingSteps cookingSteps={recipe.cookingSteps} />
    </div>
  );
}