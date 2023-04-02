import React, { useState } from 'react'
import Card from './card/Card'
import './column.css'
import uuid from 'uuid-random'
interface ColumnProps {
  name:string
}

type CardDescription ={
  id: string,
  title: string
}

const Column:React.FC<ColumnProps> = ({name})=>{
  const[cards,setCards] = useState<Array<CardDescription>>([])

  const addCard =()=>{
    const newCards =Array.from(cards) 
    newCards.push({
      id: uuid(),
      title: ''
    })

    setCards(newCards)
  }

  return (
    <div role='column' className='column'>
      <div className='column-header'>
        <h1>{name}</h1>
        <button  onClick={addCard}>+</button>
      </div>
      <span>
        {cards.map((card) =>(
          <Card key={card.id} title={card.title}/>
        ))}
      </span>
    </div>
  )
}

export default Column