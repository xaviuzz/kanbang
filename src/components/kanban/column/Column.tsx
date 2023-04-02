import React, { useState } from 'react'
import Card from './card/Card'
import './column.css'
import Cards from '../../../domain/cards'

interface ColumnProps {
  name:string,
  content: Cards,
  onMove: (id:string)=>void
}

const Column:React.FC<ColumnProps> = ({name,content,onMove})=>{
  const[cards,setCards] = useState<Cards>(content || new Cards())

  const addCard =()=>{
    setCards(cards.addNew())
  }

  const move = (id:string)=>{
    setCards(cards.remove(id))
    onMove(id)
  }

  return (
    <div role='column' className='column'>
      <div className='column-header'>
        <h1>{name}</h1>
        <button  onClick={addCard}>+</button>
      </div>
      <span>
        {cards.data().map((card) =>(
          <Card 
            key={card.id} 
            title={card.title} 
            id={card.id}
            onMove={move}
          />
        ))}
      </span>
    </div>
  )
}

export default Column