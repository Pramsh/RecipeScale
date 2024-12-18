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
  const [ openList, setOpenList ] = useState<boolean>(true)
  
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
    
    <div>  
      <form
      className="flex flex-wrap w-full justify-evenly"
        onSubmit={(e) => {
          e.preventDefault();
          calcolateRelation()
        }}
      >    
      {
         openList ? (
      <div className={`w-1/5 ${newIngredients.length > 0 && "widthTransitionLeft"}`}>
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
      </div>
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
          <div
            className="w-1/5 widthTransitionRight"
          >
            <h2 className="md:text-3xl font-extrabold mb-5">Result</h2>
          {
            newIngredients.map((ing, index) => (
              <div 
                className="mb-1 cursor-default"      
                key={"ing-"+index}
              >
                <p>{ing.name}</p>
                <p>- {ing.value && ing.value / 100}</p>
              </div>
            ))
          }
          
          </div>
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
