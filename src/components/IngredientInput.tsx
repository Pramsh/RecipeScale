import { Ingredient } from "@/utils/typings"
import { Dispatch, SetStateAction } from "react"
const IngredientInput = ({ingredient, setIngredient } : {ingredient: Ingredient, setIngredient: Dispatch<SetStateAction<Ingredient | null>> }) => {
    return (
    <div>
        <label htmlFor="input" className="block mb-2">
            Name:
        </label>
          <input
            className="border mb-5"
            type="text"
            id="name"
            value={ingredient?.name ?? ""}
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
            onChange={(e) => setIngredient && setIngredient((prev) => ({ ...prev, name: e.target.value }))}
          />
        <label htmlFor="input" className="block mb-2">
            Quantity:
        </label>
          <input
            className="border"
            type="number"
            id="value"
            value={ingredient?.value ?? ""}
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
            onChange={(e) => setIngredient && setIngredient((prev) => ({ ...prev, value: e.target.value && e.target.value.trim() !== "" ? parseInt(e.target.value) : 0 }))}
          />
    </div>
  )
}

export default IngredientInput
