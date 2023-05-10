import React, { useState } from 'react'
import Cards from '../../../../domain/cards'
import { Movement } from '../../../../domain/types'
import Card from './card/Card'
import './column.css'
import Header from './header/Header'
import { useKanban } from '../../../../context/kanban'

interface ColumnProps {
  name: string,
}

const Column: React.FC<ColumnProps> = ({ name}) => {
  const {update,moveCard,getColumn} = useKanban()
  const [cards, setCards] = useState<Cards>(getColumn(name))

  const addCard = (): void => {
    const newContent: Cards = cards.addNew()
    setCards(newContent)
    update(name,newContent)
  }

  const move = (id: string, direction: Movement): void => {
    moveCard(name,id, direction)
  }

  const change = (id: string, title: string): void => {
    const newContent: Cards = cards.rename(id, title)
    setCards(newContent)
    update(name,newContent)
  }

  const remove = (id: string): void => {
    const newContent: Cards = cards.remove(id)
    setCards(newContent)
    update(name,newContent)
  }


  return (
    <div role='column' className='column'>
      <Header name={name} onClick={addCard}/>
      <span>
        {cards.data().map((card) => (
          <Card
            key={card.id}
            title={card.title}
            id={card.id}
            onMove={move}
            onChange={change}
            onDelete={remove}
          />
        ))}
      </span>
    </div>
  )
}

export default Column