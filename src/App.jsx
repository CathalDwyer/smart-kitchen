import { useState } from "react";
import InputPanel from "./components/inputs/InputPanel";
import { useGemini } from "./hooks/useGemini";
import { TIME_OPTIONS } from "./constants/schema";
import DashboardSkeleton from "./components/ui/DashboardSkeleton";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import Toast from "./components/ui/Toast";

const initialFormState = {
  ingredients: [],
  pantrySelected: [],
  dietary: "none",
  timeLimit: "under-30",
};

function App() {
  const [formState, setFormState] = useState(initialFormState);
  const { status, data, error, generate, reset } = useGemini();

  const handleGenerate = () => {
    const allIngredients = [...formState.ingredients, ...formState.pantrySelected];
    const timeOpt = TIME_OPTIONS.find((t) => t.id === formState.timeLimit);
    generate(allIngredients, formState.dietary, timeOpt?.maxMinutes ?? 999);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 p-8">
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
          <ErrorBoundary onRetry={reset}>
            {(() => {
              throw new Error(error);
            })()}
          </ErrorBoundary>
        )}

        {status === "success" && (
          <pre className="text-xs text-stone-300 bg-stone-900 p-3 rounded-lg overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
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