import { useState } from "react";
import InputPanel from "./components/inputs/InputPanel";

const initialFormState = {
  ingredients: [],
  pantrySelected: [],
  dietary: "none",
  timeLimit: "under-30",
};

function App() {
  const [formState, setFormState] = useState(initialFormState);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-amber-400">Smart Kitchen</h1>
        
        <InputPanel formState={formState} setFormState={setFormState} />

        {/* Debug output — remove later */}
        <pre className="text-xs text-stone-500 bg-stone-900 p-3 rounded-lg">
          {JSON.stringify(formState, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default App;