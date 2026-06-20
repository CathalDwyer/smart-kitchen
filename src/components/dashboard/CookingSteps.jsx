import { useState } from "react";

export default function CookingSteps({ cookingSteps }) {
  const [completed, setCompleted] = useState({});

  const toggleStep = (stepNumber) => {
    setCompleted((prev) => ({ ...prev, [stepNumber]: !prev[stepNumber] }));
  };

  const completedCount = Object.values(completed).filter(Boolean).length;
  const totalSteps = cookingSteps.length;
  const progressPercent = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-lg p-5 space-y-4">
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-stone-300">
            👨‍🍳 Cooking Steps
          </h3>
          <span className="text-xs text-stone-500">
            {completedCount} / {totalSteps} done
          </span>
        </div>
        <div className="h-2 bg-stone-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="space-y-2">
        {cookingSteps.map((step) => {
          const isDone = !!completed[step.stepNumber];
          return (
            <button
              key={step.stepNumber}
              type="button"
              onClick={() => toggleStep(step.stepNumber)}
              className={`w-full text-left flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                isDone
                  ? "bg-stone-800/50 border-stone-700"
                  : "bg-stone-950 border-stone-800 hover:border-amber-700"
              }`}
            >
              <div
                className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mt-0.5 ${
                  isDone
                    ? "bg-amber-600 text-stone-950"
                    : "bg-stone-800 text-stone-400"
                }`}
              >
                {isDone ? "✓" : step.stepNumber}
              </div>
              <div className="flex-1">
                <p
                  className={`text-sm ${
                    isDone ? "line-through text-stone-500" : "text-stone-200"
                  }`}
                >
                  {step.instruction}
                </p>
                <span className="text-xs text-stone-500">
                  ⏱ {step.estimatedDurationMinutes} min
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}