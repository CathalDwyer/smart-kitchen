import { GoogleGenerativeAI } from "@google/generative-ai";
import { RECIPE_SCHEMA_EXAMPLE, DIETARY_OPTIONS } from "../constants/schema";
import { safeParseJSON, validateRecipeSchema } from "./schemaValidator";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error(
    "[SmartKitchen] VITE_GEMINI_API_KEY is not set. " +
    "Copy .env.example to .env and add your key from https://aistudio.google.com/app/apikey"
  );
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

const SYSTEM_INSTRUCTION = `
You are a professional chef and culinary AI assistant. Your only job is to analyse
a list of available ingredients and return a recipe as a strictly formatted JSON object.

CRITICAL RULES:
1. You must ALWAYS return valid JSON and NOTHING ELSE. No prose, no markdown, no explanation.
2. Your response must exactly match this schema — every field is required:

${JSON.stringify(RECIPE_SCHEMA_EXAMPLE, null, 2)}

3. THE POISON PILL RULE: If the user provides items that are clearly not food ingredients
   (e.g. batteries, car keys, old socks, random words), you must return the schema with:
   - "isValidRecipeRequest": false
   - All other fields set to null, 0, or empty arrays as appropriate for their type
   - Do NOT attempt to invent a recipe from non-food items

4. DIETARY RESTRICTIONS: Respect all dietary restrictions passed in the prompt exactly.
   Never include ingredients that violate the specified dietary restriction.

5. missingIngredientsToBuy should only list items genuinely needed but NOT in the user's list.

6. The "difficulty" field must be exactly one of: "Easy", "Medium", or "Hard".

7. macroNutrients must be realistic number estimates. All values must be numbers, not strings.
`.trim();

function buildUserPrompt(ingredients, dietaryId, timeLimitMinutes) {
  const ingredientList = ingredients.join(", ");

  const dietary = DIETARY_OPTIONS.find((d) => d.id === dietaryId);
  const dietaryNote = dietary
    ? dietary.geminiDirective
    : "No dietary restrictions apply.";

  const timeNote =
    timeLimitMinutes >= 999
      ? "There is no time limit — suggest any recipe regardless of complexity."
      : `The total prep and cook time must be under ${timeLimitMinutes} minutes.`;

  return `
Available ingredients: ${ingredientList}

Dietary requirement: ${dietaryNote}
Time constraint: ${timeNote}

Return a recipe JSON object following the schema exactly.
`.trim();
}

export async function generateRecipe(ingredients, dietaryId, timeLimitMinutes) {
  if (!genAI) {
    throw new Error(
      "Gemini API key is missing. Please add VITE_GEMINI_API_KEY to your .env file."
    );
  }

  if (!ingredients || ingredients.length === 0) {
    throw new Error("Please add at least one ingredient before generating.");
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: SYSTEM_INSTRUCTION,
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.7,
      maxOutputTokens: 2048,
    },
  });

  const prompt = buildUserPrompt(ingredients, dietaryId, timeLimitMinutes);

  let rawText;
  try {
    const result = await model.generateContent(prompt);
    rawText = result.response.text();
  } catch (err) {
    if (err.message?.includes("429")) {
      throw new Error("Rate limit reached. Please wait a moment and try again.");
    }
    if (err.message?.includes("API_KEY_INVALID")) {
      throw new Error("Invalid API key. Check your VITE_GEMINI_API_KEY value.");
    }
    throw new Error(`Gemini API error: ${err.message}`);
  }

  const { parsed, error: parseError } = safeParseJSON(rawText);
  if (parseError) {
    throw new Error(parseError);
  }

  const validation = validateRecipeSchema(parsed);

  if (validation.poisonPill) {
    return { data: null, raw: rawText, poisonPill: true };
  }

  if (!validation.valid) {
    throw new Error(`Schema validation failed:\n${validation.errors.join("\n")}`);
  }

  return { data: validation.data, raw: rawText, poisonPill: false };
}