'use client'
import { useEffect, useState } from "react"
import { Ingredient } from "@/utils/typings"


interface IngredientNewListProps {
    newIngredients: Ingredient[]
    numberOfPeople: number //initial number of people
}

const IngredientNewList = ({numberOfPeople, newIngredients}: IngredientNewListProps) => {
    const [multipliedIngredients, setMultipliedIngredients] = useState(newIngredients)
    const [people, setPeople] = useState<number>()

    useEffect(() => {
        if(people){
            setMultipliedIngredients( newIngredients.map(ingredient => (
                { 
                    ...ingredient,
                    value: ingredient.value! * people
                }
            )))
        }
    }, [people])

        
const handlePeopleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPeople(Number(event.target.value));
    };
    
  return (
    <div className="w-1/5 widthTransitionRight relative">
        <h2 className="md:text-3xl font-extrabold mb-5">Result</h2>
        {
            multipliedIngredients.map((ing, index) => (
                <div 
                    className="mb-1 cursor-default"      
                    key={"ing-"+index}
                >
                    <p>{ing.name}</p>
                    <p>- {ing.value && ing.value / 100}</p>
                </div>
            ))
        }
        <div className="absolute bottom-[15%] w-5/6">
            <input
            type="range"
            min="1"
            max="10"
            value={people || numberOfPeople}
            onChange={handlePeopleChange}
            className="w-full"
            />
            <span className="ms-3">{people || numberOfPeople}</span>
        </div>
  </div>
  )
}

export default IngredientNewList
