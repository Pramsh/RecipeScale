import { Ingredient } from "@/utils/typings"

const IngredientInput = ({ingredient, setIngredient } : {ingredient: Ingredient, setIngredient?:any }) => {
    // const [ ingredient, setIngredienv ] = useState<Ingredient | null>(null)

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
            onChange={(e) => setIngredient && setIngredient((prev:any) => ({ ...prev, name:e.target.value}))}
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
            pattern="^[a-zA-Z0-9]*$"
          />
        <label htmlFor="input" className="block mb-2">
            Quantity:
        </label>
          <input
            className="border"
            type="number"
            id="value"
            value={ingredient?.value ?? ""}
            onChange={(e) => setIngredient && setIngredient((prev:any) => ({ ...prev, value: e.target.value && e.target.value.trim() !== "" ? parseInt(e.target.value) : ""}))}
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
          />
    </div>
  )
}

export default IngredientInput
