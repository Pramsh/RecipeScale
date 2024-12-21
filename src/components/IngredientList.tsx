import { Ingredient } from "@/utils/typings"
import { Dispatch, SetStateAction } from "react";
import HowManyPeople from "./HowManyPeople";

interface IngredientListProps {
    ingredients: Ingredient[]
    newIngredients: Ingredient[]
    setNewIngredients: Dispatch<SetStateAction<Ingredient[]>>
    setEditIndex: Dispatch<SetStateAction<number | null>>
    setNewIngredient: Dispatch<SetStateAction<Ingredient | null>>
    removeItem: (index: number) => void
    numberOfPeople: number
    setNumberOfPeople: Dispatch<SetStateAction<number>>
}

const IngredientList = ({
    numberOfPeople,
    setNumberOfPeople,
    ingredients,
    newIngredients,
    setEditIndex,
    setNewIngredient,
    removeItem
 }: IngredientListProps) => {
  return (
   <>
    <div className={`w-1/5 relative ${newIngredients.length > 0 && "widthTransitionLeft"}`}>
    <h2 className="md:text-3xl font-extrabold	 text-bold mb-5">Ingredient List</h2>
    {
        ingredients.map((ing, index) => (
            <div 
            className="mb-1 cursor-pointer"      
            key={"ing-"+index}
            onClick={() => {
                setEditIndex(index);
                setNewIngredient(ing);
            }}>
            <div className="flex justify-between">
                <div>
                <p>{ing.name}</p>
                <p>- {ing.value && ing.value / 100}</p>
                </div>
                <p style={{ cursor: 'pointer', color: 'red' }} onClick={() => removeItem(index)}>X</p>
            </div>
            </div>
        ))
    }
    <HowManyPeople
        numberOfPeople={numberOfPeople}
        setNumberOfPeople={setNumberOfPeople}
    />
    </div>
   </>
  )
}

export default IngredientList
