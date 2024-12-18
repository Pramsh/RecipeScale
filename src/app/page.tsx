'use client'
import { useState } from "react"
import { Ingredient } from "@/utils/typings"
import IngredientInput from "@/components/IngredientInput"


export default function Home() {
  const [ ingredients, setIngredients ] = useState<Ingredient[]>([])
  const [ newIngredients, setNewIngredients ] = useState<Ingredient[]>([])
  const [ newIngredient, setNewIngredient ] = useState<Ingredient | null>(null)
  const [variable, setVariable] = useState<Ingredient | null>(null)
  const [editIndex, setEditIndex] = useState<number | null>(null);

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
      if(!ing)
        throw new Error("Ingredient is not in the list")
      
      const percentage = calcPerc(ing.value!, variable.value!)
  
      setNewIngredients(
        ingredients.map((ing) =>  ({...ing, value: definePerc(percentage,ing.value!)}))
      )
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
    
    <div className="p-2">  
      <form
      className="flex flex-wrap w-full justify-evenly"
        onSubmit={(e) => {
          e.preventDefault();
          calcolateRelation()
        }}
      >    
      <div className="w-1/5">
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
                <p>{ing.name} - {ing.value}</p>
                <p style={{ cursor: 'pointer', color: 'red' }} onClick={() => removeItem(index)}>X</p>
              </div>
            </div>
          ))
        }
      </div>
      
      <div
        className="border p-3 pb-5 w-2/4"
      >
        <h2 className="text-3xl mb-3">Add Ingredient</h2>
       <IngredientInput
        ingredient={newIngredient!}
        setIngredient={setNewIngredient}
       ></IngredientInput>
      </div>
      <div
        className="w-1/5"
      >
        <h2 className="md:text-3xl font-extrabold mb-5">Result</h2>
       {
        newIngredients.map((ing, index) => (
          <div 
            className="mb-1 cursor-default"      
            key={"ing-"+index}
          >
            <p>{ing.name} - {ing.value}</p>
          </div>
        ))
       }
       
      </div>

      <div>  
        <button
          style={{
            padding: '10px 15px',
            fontSize: '16px',
            border: 'none',
            backgroundColor: 'green',
            color: '#fff',
            borderRadius: '5px',
            cursor: 'pointer',
            margin: '2rem'
          }}
          onClick={(e) => {
            e.preventDefault(); // Prevent form from refreshing the page
            addItem()
          }}
        >
          {editIndex !== null ? 'Update Ingredient' : "Add Ingredient"}
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
              cursor: 'pointer'
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
            className="border p-3 pb-5 w-2/4"
            style={{margin: '0 auto'}}
            >
          <h2 className="text-3xl mb-3">Variable</h2>
          <IngredientInput
            ingredient={variable!}
            setIngredient={setVariable}
          ></IngredientInput>
          </div>
      </div>
      {/* <div className="w-full flex justify-center items-center"> */}

       
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
              margin: '2rem'
            }}>Calcolate Relation</button>
         }
      {/* </div> */}
     
      </form>

      
    </div>
  );
}
