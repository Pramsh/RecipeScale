'use client'
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

const HowManyPeople = ({numberOfPeople, setNumberOfPeople} : { numberOfPeople:number, setNumberOfPeople:Dispatch<SetStateAction<number>>}) => {
        
    const [ toggleOpen, setToggleOpen ] = useState<boolean>(false)
    const toggleDiv = useRef<HTMLDivElement>(null)

    const handleClickOutside = (event: MouseEvent) => {
        if (toggleDiv.current && !toggleDiv.current.contains(event.target as Node)) {
          setToggleOpen(false)
        }
      };

    useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
    }, []);


  return (
    <>
    {
        !toggleOpen ? <div onClick={()=> {setToggleOpen(true)}} className="toggleTrasformRight fixed bottom-[15%] left-[0] bg-white p-2 rounded text-xs font-bold transform rotate-90">N. of people</div>
            :
            <div ref={toggleDiv} className={`absolute toggleTrasformLeft bottom-[15%] w-5/6 bg-white p-2 rounded}`}>
            <label>For how many people?</label>
                <input
                type="number"
                min="1"
                max="10"
                value={numberOfPeople || 1}
                onChange={(event)=> {
                    setNumberOfPeople(Number(event.target.value))
                }}
                className="w-full border mt-2"
                />
            </div>
        }
    
    </>
  )
}

export default HowManyPeople
