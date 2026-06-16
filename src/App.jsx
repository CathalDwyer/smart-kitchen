import { useState } from "react";
import IngredientInput from "./components/inputs/IngredientInput";
import PantryChecklist from "./components/inputs/PantryChecklist";
import DietaryDropdown from "./components/inputs/DietaryDropdown";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [pantrySelected, setPantrySelected] = useState([]);
  const [dietary, setDietary] = useState("none");

  const addIngredient = (item) => setIngredients((prev) => [...prev, item]);
  const removeIngredient = (item) =>
    setIngredients((prev) => prev.filter((i) => i !== item));

  const togglePantryItem = (item) =>
    setPantrySelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-amber-400">Smart Kitchen</h1>

        <IngredientInput
          ingredients={ingredients}
          onAdd={addIngredient}
          onRemove={removeIngredient}
        />

        <PantryChecklist selected={pantrySelected} onToggle={togglePantryItem} />

        <DietaryDropdown value={dietary} onChange={setDietary} />

        {/* Debug output — remove later */}
        <pre className="text-xs text-stone-500 bg-stone-900 p-3 rounded-lg">
          {JSON.stringify({ ingredients, pantrySelected, dietary }, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default App;