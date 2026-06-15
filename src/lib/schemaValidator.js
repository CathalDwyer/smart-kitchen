import {
  SCHEMA_FIELD_TYPES,
  MACRO_FIELD_TYPES,
  STEP_FIELD_TYPES,
  VALID_DIFFICULTIES,
} from "../constants/schema";

export function validateRecipeSchema(parsed) {
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return {
      valid: false,
      poisonPill: false,
      errors: ["Response is not a JSON object."],
      data: null,
    };
  }

  if (parsed.isValidRecipeRequest === false) {
    return {
      valid: false,
      poisonPill: true,
      errors: ["Non-food ingredients detected."],
      data: null,
    };
  }

  const errors = [];

  for (const [field, expectedType] of Object.entries(SCHEMA_FIELD_TYPES)) {
    if (!(field in parsed)) {
      errors.push(`Missing required field: "${field}"`);
      continue;
    }
    const value = parsed[field];
    const actualType = Array.isArray(value) ? "array" : typeof value;
    if (actualType !== expectedType) {
      errors.push(`Field "${field}" should be ${expectedType}, got ${actualType}`);
    }
  }

  if (parsed.macroNutrients && typeof parsed.macroNutrients === "object") {
    for (const [field, expectedType] of Object.entries(MACRO_FIELD_TYPES)) {
      if (!(field in parsed.macroNutrients)) {
        errors.push(`Missing macroNutrients field: "${field}"`);
      } else if (typeof parsed.macroNutrients[field] !== expectedType) {
        errors.push(`macroNutrients.${field} should be ${expectedType}`);
      }
    }
  }

  if (Array.isArray(parsed.cookingSteps)) {
    if (parsed.cookingSteps.length === 0) {
      errors.push("cookingSteps array must not be empty.");
    }
    parsed.cookingSteps.forEach((step, index) => {
      for (const [field, expectedType] of Object.entries(STEP_FIELD_TYPES)) {
        if (!(field in step)) {
          errors.push(`cookingSteps[${index}] missing field: "${field}"`);
        } else if (typeof step[field] !== expectedType) {
          errors.push(`cookingSteps[${index}].${field} should be ${expectedType}`);
        }
      }
    });
  }

  if (parsed.difficulty && !VALID_DIFFICULTIES.includes(parsed.difficulty)) {
    errors.push(`difficulty must be one of: ${VALID_DIFFICULTIES.join(", ")}`);
  }

  if (errors.length > 0) {
    return { valid: false, poisonPill: false, errors, data: null };
  }

  return { valid: true, poisonPill: false, errors: [], data: parsed };
}

export function safeParseJSON(rawText) {
  try {
    const cleaned = rawText
      .trim()
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();
    return { parsed: JSON.parse(cleaned), error: null };
  } catch (err) {
    return { parsed: null, error: `Failed to parse JSON response: ${err.message}` };
  }
}