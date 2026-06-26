# Smart Kitchen Assistant

An AI-powered recipe generation web app built with React + Vite and the Google Gemini API. Users input available ingredients and dietary preferences, and the app returns a fully structured recipe with macronutrient data, step-by-step cooking instructions, and ingredient substitution suggestions.

---

## System Blueprint & Installation

### Prerequisites
- Node.js 18+
- A free Gemini API key from https://aistudio.google.com/app/apikey

### Setup

```bash
git clone https://github.com/CathalDwyer/smart-kitchen.git
cd smart-kitchen
npm install
cp .env.example .env
```

Add your Gemini API key to `.env`:

```
VITE_GEMINI_API_KEY=your_key_here
```

```bash
npm run dev
```

---

## Schema Governance

The core architectural decision of this project is treating the Gemini API as a **structured database engine** rather than a text generator. This required enforcing a strict JSON contract on every response.

### The Contract

All Gemini responses must conform to this schema, defined as the single source of truth in `src/constants/schema.js`:

```json
{
  "recipeTitle": "String",
  "prepTimeMinutes": 30,
  "difficulty": "Easy | Medium | Hard",
  "macroNutrients": {
    "calories": 450,
    "proteinGrams": 32,
    "carbsGrams": 12,
    "fatsGrams": 22
  },
  "utilizedIngredients": ["Item A"],
  "missingIngredientsToBuy": ["Item C"],
  "cookingSteps": [
    {
      "stepNumber": 1,
      "instruction": "String",
      "estimatedDurationMinutes": 5
    }
  ],
  "isValidRecipeRequest": true
}
```

### Enforcement Strategy — Belt and Suspenders

JSON conformance is enforced at two independent layers:

**Layer 1 — Native Gemini JSON Mode**

The SDK is configured with `responseMimeType: "application/json"` in `generationConfig`. This instructs the model at the API level to return only valid JSON with no prose or markdown wrapping.

**Layer 2 — System Instruction**

The system prompt explicitly embeds the full schema and states: *"You must ALWAYS return valid JSON and NOTHING ELSE."* This catches any model drift that slips past the MIME type constraint.

**Layer 3 — Client-side Validation**

`src/lib/schemaValidator.js` independently validates every parsed response against the schema contract, checking field presence, types, array structure, and enum values before any data reaches the UI. If validation fails, the error is surfaced cleanly rather than rendering broken data.

### The Poison Pill Constraint

If a user inputs non-food items, the system prompt instructs Gemini to return `"isValidRecipeRequest": false` with all other fields nulled. The validator detects this as a `poisonPill` result (distinct from a schema error), and the UI responds with a toast notification rather than an error state.

---

## Self-Correction Retrospective

### Biggest Technical Roadblock: Truncated JSON from Token Limits

The most significant issue encountered during development was Gemini returning truncated JSON responses — valid JSON that was cut off mid-string before the closing braces, causing `JSON.parse()` to throw.

The root cause was `maxOutputTokens: 2048` being insufficient for recipes with many cooking steps. A recipe with 8 steps could easily exceed this limit, producing output like:

```json
{
  "recipeTitle": "Chicken Stir-fry",
  "cookingSteps": [
    { "stepNumber": 1, "instruction": "Heat oil in a pan
```

**How it was resolved:**

1. `maxOutputTokens` was increased to `4096`, which eliminated truncation for all tested recipes.
2. `safeParseJSON()` in `schemaValidator.js` was written to strip markdown code fences before parsing, as a secondary defence against model formatting drift.
3. The schema validator catches any remaining parse failures and surfaces them as a clean error state with a retry button, rather than crashing the application.

This taught a key lesson about LLM integration: **token budgeting must account for the worst-case output size of your schema**, not just average cases.

---

## Scaling Vectors

Three features that would be prioritised to improve reliability and performance at 50,000 daily active users:

### 1. Server-Side API Proxy

Currently the Gemini API key is exposed client-side via `VITE_GEMINI_API_KEY`. At scale this would be replaced with a lightweight backend proxy (Node.js/Express or a serverless function) that holds the key server-side, applies per-user rate limiting, and validates requests before forwarding them to Gemini. This removes the key exposure risk entirely.

### 2. Redis Response Cache

At volume, many users will input identical or near-identical ingredient combinations. A Redis cache keyed on a hash of `(ingredients + dietary + timeLimit)` would serve cached recipes instantly for common combinations, dramatically reducing API costs and latency. TTL of 24 hours would balance freshness with savings.

### 3. Request Queue with Debouncing

At 50,000 DAU, Gemini rate limits become a real operational constraint. A server-side request queue (e.g. BullMQ) would absorb traffic spikes, retry failed requests with exponential backoff, and return 503s gracefully when the queue is full — rather than letting failures surface directly to users as unhandled errors.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS v4 |
| AI | Google Gemini API (`gemini-2.5-flash`) |
| SDK | `@google/generative-ai` |
| Caching | Browser `localStorage` |
| Exports | Markdown file download, Clipboard API |