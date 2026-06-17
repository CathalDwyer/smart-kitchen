import IngredientInput from "./IngredientInput";
import PantryChecklist from "./PantryChecklist";
import DietaryDropdown from "./DietaryDropdown";
import TimeSelector from "./TimeSelector";

export default function InputPanel({ formState, setFormState }) {
  const addIngredient = (item) =>
    setFormState((prev) => ({ ...prev, ingredients: [...prev.ingredients, item] }));

  const removeIngredient = (item) =>
    setFormState((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((i) => i !== item),
    }));

  const togglePantryItem = (item) =>
    setFormState((prev) => ({
      ...prev,
      pantrySelected: prev.pantrySelected.includes(item)
        ? prev.pantrySelected.filter((i) => i !== item)
        : [...prev.pantrySelected, item],
    }));

  const setDietary = (value) =>
    setFormState((prev) => ({ ...prev, dietary: value }));

  const setTime = (value) =>
    setFormState((prev) => ({ ...prev, timeLimit: value }));

  return (
    <div className="space-y-6">
      <IngredientInput
        ingredients={formState.ingredients}
        onAdd={addIngredient}
        onRemove={removeIngredient}
      />
      <PantryChecklist selected={formState.pantrySelected} onToggle={togglePantryItem} />
      <DietaryDropdown value={formState.dietary} onChange={setDietary} />
      <TimeSelector value={formState.timeLimit} onChange={setTime} />
    </div>
  );
}