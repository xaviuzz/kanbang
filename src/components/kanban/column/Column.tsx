import React, { useState } from 'react'
import Card from './card/Card'
import './column.css'

interface ColumnProps {
  name:string
}

const Column:React.FC<ColumnProps> = ({name})=>{
  const[cards,setCards] = useState<Array<string>>([])

  const addCard =()=>{
    const newCards =Array.from(cards) 
    newCards.push('')
    setCards(newCards)
  }

  return (
    <div role='column' className='column'>
      <div className='column-header'>
        <h1>{name}</h1>
        <button  onClick={addCard}>+</button>
      </div>
      <span>
        {cards.map((name) =>(
          <Card key={name} title={name}/>
        ))}
      </span>
    </div>
  )
}

export default Column