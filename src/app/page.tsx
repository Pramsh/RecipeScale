'use client'
import { useState } from "react"
import { Ingredient } from "@/utils/typings"
import IngredientInput from "@/components/IngredientInput"
import IngredientList from "@/components/IngredientList"
import IngredientNewList from "@/components/IngredientNewList"

export default function Home() {
  const [ ingredients, setIngredients ] = useState<Ingredient[]>([])
  const [ newIngredients, setNewIngredients ] = useState<Ingredient[]>([])
  const [ newIngredient, setNewIngredient ] = useState<Ingredient | null>(null)
  const [variable, setVariable] = useState<Ingredient | null>(null)
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [ openList, setOpenList ] = useState<boolean>(true)
  const [ numberOfPeople, setNumberOfPeople ] = useState<number>(1)

  const calcPerc = (total:number, available:number) => {
    const res = 100 * available / total
    return res
  } 

  const definePerc = (percentage: number, value: number) => {
    return value / 100 * percentage
  }
  
  const calcolateRelation = () : void => {
    
    if(variable){
      const ing = ingredients.find((ing: Ingredient) => ing.name === variable.name)
      if(!ing || ing.value! < variable.value!) return
 
      
      const percentage = calcPerc(ing.value!, variable.value!)
  
      setNewIngredients(
       ingredients.map((ing) =>  ({...ing, value: definePerc(percentage,ing.value!)}))
      )
      setOpenList(false)
    }

  }
  
  const removeEmptyItems = () => {
    if(ingredients.length > 0){
      setIngredients(ingredients.filter((ing) => ing.name!.trim() !== "" && ing.value !== null))
    }
  }

  const removeItem = (index: number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  }


  const addItem = () => {
    if (newIngredient) {
      setOpenList(true)
      if (editIndex !== null) {
        removeEmptyItems()
        const updatedIngredients = [...ingredients];
        updatedIngredients[editIndex] = newIngredient;
        setIngredients(updatedIngredients);
        setEditIndex(null);
      } else {
        setIngredients([...ingredients, newIngredient]);
      }
      setNewIngredient(null);
    }
      
  }


  const cancelEdit = () => {
    setNewIngredient(null);
    setEditIndex(null);
  };

  return (
//devo far si che si popoli l'oggetto con il numero di persone corrette    
    <div>  
      <form
      className="flex flex-wrap w-full justify-evenly p-1 md:p-2"
        onSubmit={(e) => {
          e.preventDefault();
          calcolateRelation()
        }}
      >    
      {
         openList ? (
          <IngredientList
            ingredients={ingredients}
            newIngredients={newIngredients}
            setEditIndex={setEditIndex}
            setNewIngredients={setNewIngredients}
            setNewIngredient={setNewIngredient}
            removeItem={removeItem}
            numberOfPeople={numberOfPeople}
            setNumberOfPeople={setNumberOfPeople}
          />
        )
        :
        <div onClick={()=> setOpenList(true)} className="fixed top-0 left-2 font-extrabold cursor-pointer">{"->"}</div>
      }
        <div
          className="border p-2 w-2/4"
        >
          <h2 className="text-3xl mb-3">Add Ingredient</h2>
        <IngredientInput
          ingredient={newIngredient!}
          setIngredient={setNewIngredient}
        ></IngredientInput>
         
          <div className="flex justify-center items-center">
            <button
              style={{
                padding: '10px 15px',
                fontSize: '16px',
                border: 'none',
                backgroundColor: 'green',
                color: '#fff',
                borderRadius: '5px',
                cursor: 'pointer',
                marginRight: '2px',
                marginTop: '1rem',
                marginBottom: '0.5rem'
              }}
              onClick={(e) => {
                e.preventDefault(); // Prevent form from refreshing the page
                addItem()
              }}
            >
              {editIndex !== null ? 'Update' : "Add Ingredient"}
              </button>

            {editIndex !== null && (
              <button
                style={{
                  padding: '10px 15px',
                  fontSize: '16px',
                  backgroundColor: '#f00',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginLeft: '2px',
                  marginTop: '1rem',
                  marginBottom: '0.5rem'
                }}
                onClick={(e) => {
                  e.preventDefault(); // Prevent form from refreshing the page
                  cancelEdit();
                }}
              >
                Cancel
              </button>
            ) }
          </div>
          
       <div className="w-full">
          <div
            className="pb-5"
            style={{margin: '0 auto'}}
            >
          <h2 className="text-3xl mb-3">Variable</h2>
          <IngredientInput
            ingredient={variable!}
            setIngredient={setVariable}
          ></IngredientInput>
          </div>
      </div>     
       {
        !editIndex &&
          <button
            onClick={((e) => {
              e.preventDefault()
              calcolateRelation()
            })}
            style={{
              padding: '10px 15px',
              fontSize: '16px',
              border: 'none',
              backgroundColor: 'green',
              color: '#fff',
              borderRadius: '5px',
              cursor: 'pointer',
            }}>Calcolate Relation</button>
         }
        </div>

      
      {
        newIngredients.length > 0 && !openList && (
          <IngredientNewList
            numberOfPeople={numberOfPeople}
            newIngredients={newIngredients}
          />
        )    
      }
      {
        newIngredients.length > 0 && openList && (
          <div onClick={()=> setOpenList(false)} className="fixed top-0 right-2 font-extrabold cursor-pointer">{"<-"}</div>
        )
      }


     
      </form>

      
    </div>
  );
}
