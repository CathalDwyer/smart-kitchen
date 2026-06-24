import { useState, useEffect, useRef } from "react";
import InputPanel from "./components/inputs/InputPanel";
import { useGemini } from "./hooks/useGemini";
import { TIME_OPTIONS } from "./constants/schema";
import DashboardSkeleton from "./components/ui/DashboardSkeleton";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import Toast from "./components/ui/Toast";
import RecipeDashboard from "./components/dashboard/RecipeDashboard";
import { useRecipeCache } from "./hooks/useRecipeCache";
import HistorySidebar from "./components/sidebar/HistorySidebar";

const initialFormState = {
  ingredients: [],
  pantrySelected: [],
  dietary: "none",
  timeLimit: "under-30",
};

function App() {
  const [formState, setFormState] = useState(initialFormState);
  const { status, data, error, generate, reset } = useGemini();
  const { history, save, load, clear } = useRecipeCache();
  const lastSavedRef = useRef(null);

  const [viewedRecipe, setViewedRecipe] = useState(null);
  const [activeHistoryId, setActiveHistoryId] = useState(null);

  const handleGenerate = () => {
    const allIngredients = [...formState.ingredients, ...formState.pantrySelected];
    const timeOpt = TIME_OPTIONS.find((t) => t.id === formState.timeLimit);
    generate(allIngredients, formState.dietary, timeOpt?.maxMinutes ?? 999);
  };

  const handleSelectHistory = (id) => {
    const entry = load(id);
    if (entry) {
      setViewedRecipe(entry.recipeData);
      setActiveHistoryId(id);
    }
  };

  useEffect(() => {
    if (status === "success" && data && lastSavedRef.current !== data) {
      lastSavedRef.current = data;
      const entry = save(formState, data);
      setActiveHistoryId(entry.id);
      setViewedRecipe(null);
    }
  }, [status, data]);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 px-4 py-6 sm:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-amber-400">Smart Kitchen</h1>

        <InputPanel formState={formState} setFormState={setFormState} />

        <button
          onClick={handleGenerate}
          disabled={status === "loading"}
          className="w-full bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-stone-950 font-medium py-3 rounded-lg"
        >
          {status === "loading" ? "Generating..." : "Generate Recipe"}
        </button>

        {status === "loading" && <DashboardSkeleton />}

        {status === "error" && (
          <div className="bg-red-950/40 border border-red-800 rounded-lg p-6 text-center space-y-3">
            <p className="text-red-300 font-medium">Couldn't generate a recipe.</p>
            <p className="text-red-400 text-sm">{error}</p>
            <button
              onClick={reset}
              className="bg-red-700 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md"
            >
              Try Again
            </button>
          </div>
        )}

        {status === "success" && !viewedRecipe && (
          <ErrorBoundary key={data?.recipeTitle} onRetry={reset}>
            <RecipeDashboard recipe={data} />
          </ErrorBoundary>
        )}

        {viewedRecipe && (
          <ErrorBoundary key={activeHistoryId} onRetry={() => setViewedRecipe(null)}>
            <RecipeDashboard recipe={viewedRecipe} />
          </ErrorBoundary>
        )}

        <HistorySidebar
          history={history}
          onSelect={handleSelectHistory}
          onClear={clear}
          activeId={activeHistoryId}
        />
      </div>

      {status === "invalid" && (
        <Toast
          message="Those don't look like ingredients we can cook with! Try real food items."
          type="warning"
          onDismiss={reset}
        />
      )}
    </div>
  );
}

export default App;