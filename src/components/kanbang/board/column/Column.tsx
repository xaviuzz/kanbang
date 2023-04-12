import React, { useState } from 'react'
import Cards from '../../../../domain/cards'
import { Movement } from '../../../../domain/types'
import Card from './card/Card'
import './column.css'

interface ColumnProps {
  name: string,
  content: Cards,
  onMove: (id: string,destination:Movement) => void
  onChange: (content: Cards) => void
}

const Column: React.FC<ColumnProps> = ({ name, content, onMove, onChange }) => {
  const [cards, setCards] = useState<Cards>(content)

  const addCard = (): void => {
    const newContent: Cards = cards.addNew()
    setCards(newContent)
    onChange(newContent)
  }

  const move = (id: string,direction:Movement): void => {
    onMove(id,direction)
  }

  const change = (id: string, title: string): void => {
    const newContent: Cards = cards.rename(id, title)
    setCards(newContent)
    onChange(newContent)
  }


  return (
    <div role='column' className='column'>
      <div className='column-header'>
        <h1>{name}</h1>
        <button onClick={addCard}>+</button>
      </div>
      <span>
        {cards.data().map((card) => (
          <Card
            key={card.id}
            title={card.title}
            id={card.id}
            onMove={move}
            onChange={change}
          />
        ))}
      </span>
    </div>
  )
}

export default Column