'use client'
import { useEffect, useRef, useState } from "react"
import { Ingredient, NewIngredients } from "@/utils/typings"
import { Dispatch, SetStateAction } from "react"
import { log } from "node:console"

interface IngredientNewListProps {
    newIngredients: Ingredient[]
    numberOfPeople: number //initial number of people
}

//in base a quello che mi arriva da newIngredients.numberOfPeople determino il valore iniziale 
const IngredientNewList = ({numberOfPeople, newIngredients}: IngredientNewListProps) => {
    const [multipliedIngredients, setMultipliedIngredients] = useState(newIngredients)
    // const initialNumberOfPeople = useRef<number>(numberOfPeople)
    const [people, setPeople] = useState<number>()

    const getCurrentPeople = (initialNumberOfPeople: number, people: number) => {
        const currentPeople = initialNumberOfPeople + people
    }

    useEffect(() => {
        if(people){
            setMultipliedIngredients( newIngredients.map(ingredient => (
                { 
                    ...ingredient,
                    value: ingredient?.value! * people
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
