export const RECIPE_SCHEMA_EXAMPLE = {
  recipeTitle: "String — name of the recipe",
  prepTimeMinutes: 30,
  difficulty: "Easy | Medium | Hard",
  macroNutrients: {
    calories: 450,
    proteinGrams: 32,
    carbsGrams: 12,
    fatsGrams: 22,
  },
  utilizedIngredients: ["ingredient from the user's list that is used"],
  missingIngredientsToBuy: ["ingredient needed that the user doesn't have"],
  cookingSteps: [
    {
      stepNumber: 1,
      instruction: "String describing the cooking step clearly.",
      estimatedDurationMinutes: 5,
    },
  ],
  isValidRecipeRequest: true,
};

export const SCHEMA_FIELD_TYPES = {
  recipeTitle: "string",
  prepTimeMinutes: "number",
  difficulty: "string",
  macroNutrients: "object",
  utilizedIngredients: "array",
  missingIngredientsToBuy: "array",
  cookingSteps: "array",
  isValidRecipeRequest: "boolean",
};

export const MACRO_FIELD_TYPES = {
  calories: "number",
  proteinGrams: "number",
  carbsGrams: "number",
  fatsGrams: "number",
};

export const STEP_FIELD_TYPES = {
  stepNumber: "number",
  instruction: "string",
  estimatedDurationMinutes: "number",
};

export const VALID_DIFFICULTIES = ["Easy", "Medium", "Hard"];

export const DIETARY_OPTIONS = [
  {
    id: "none",
    displayName: "No Restrictions",
    geminiDirective: "No dietary restrictions apply.",
  },
  {
    id: "vegan",
    displayName: "Vegan",
    geminiDirective: "Strictly plant-based. No meat, dairy, eggs, or animal byproducts.",
  },
  {
    id: "vegetarian",
    displayName: "Vegetarian",
    geminiDirective: "No meat or fish. Dairy and eggs are permissible.",
  },
  {
    id: "gluten-free",
    displayName: "Gluten-Free",
    geminiDirective: "Strictly no wheat, barley, rye, or gluten-containing ingredients.",
  },
  {
    id: "dairy-free",
    displayName: "Dairy-Free",
    geminiDirective: "No milk, butter, cheese, cream, or dairy derivatives.",
  },
  {
    id: "keto",
    displayName: "Keto (Ketogenic)",
    geminiDirective: "High fat, moderate protein, ultra-low carbohydrate profile.",
  },
];

export const PANTRY_STAPLES = [
  "Salt",
  "Black Pepper",
  "Olive Oil",
  "Vegetable Oil",
  "Garlic Powder",
  "Onion Powder",
  "Butter",
  "Sugar",
  "Flour",
  "Soy Sauce",
  "Vinegar",
];

export const DIFFICULTY_LEVELS = [
  {
    id: "easy",
    displayName: "Easy",
    geminiDirective: "Requires minimal prep, basic kitchen tools, and straightforward techniques.",
  },
  {
    id: "medium",
    displayName: "Medium",
    geminiDirective: "May require multi-tasking, moderate prep, or basic stove/oven control.",
  },
  {
    id: "hard",
    displayName: "Hard / Advanced",
    geminiDirective: "Requires precision timing, complex techniques, or advanced culinary skills.",
  },
];

export const TIME_OPTIONS = [
  { id: "under-15", displayName: "Under 15 Minutes", maxMinutes: 15 },
  { id: "under-30", displayName: "Under 30 Minutes", maxMinutes: 30 },
  { id: "under-45", displayName: "Under 45 Minutes", maxMinutes: 45 },
  { id: "no-limit", displayName: "No Limit", maxMinutes: 999 },
];