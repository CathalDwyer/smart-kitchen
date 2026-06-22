export function generateMarkdown(recipe) {
  const {
    recipeTitle,
    prepTimeMinutes,
    difficulty,
    macroNutrients,
    utilizedIngredients,
    missingIngredientsToBuy,
    cookingSteps,
  } = recipe;

  const lines = [
    `# ${recipeTitle}`,
    ``,
    `**Prep Time:** ${prepTimeMinutes} mins | **Difficulty:** ${difficulty}`,
    ``,
    `## Nutrition`,
    `- Calories: ${macroNutrients.calories}`,
    `- Protein: ${macroNutrients.proteinGrams}g`,
    `- Carbs: ${macroNutrients.carbsGrams}g`,
    `- Fats: ${macroNutrients.fatsGrams}g`,
    ``,
    `## Ingredients You Have`,
    ...utilizedIngredients.map((i) => `- ${i}`),
  ];

  if (missingIngredientsToBuy.length > 0) {
    lines.push(``, `## Shopping List`);
    missingIngredientsToBuy.forEach((i) => lines.push(`- [ ] ${i}`));
  }

  lines.push(``, `## Steps`);
  cookingSteps.forEach((step) => {
    lines.push(
      ``,
      `### Step ${step.stepNumber} *(${step.estimatedDurationMinutes} min)*`,
      step.instruction
    );
  });

  return lines.join("\n");
}

export function downloadMarkdown(recipe) {
  const content = generateMarkdown(recipe);
  const blob = new Blob([content], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${recipe.recipeTitle.replace(/\s+/g, "-").toLowerCase()}.md`;
  a.click();
  URL.revokeObjectURL(url);
}