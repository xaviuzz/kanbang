import React, { useState } from 'react'
import Cards from '../../../../domain/cards'
import Card from './card/Card'
import './column.css'
import Header from './header/Header'
import { useKanban } from '../../../../context/kanban'

interface ColumnProps {
  name: string,
}

const Column: React.FC<ColumnProps> = ({ name}) => {
  const {move,getColumn,add,rename,remove} = useKanban()
  const [cards] = useState<Cards>(getColumn(name))

  return (
    <div role='column' className='column'>
      <Header name={name} onClick={()=>add(name)}/>
      <span>
        {cards.data().map((card) => (
          <Card
            key={card.id}
            title={card.title}
            id={card.id}
            onMove={(movement)=>move(name,card.id,movement)}
            onChange={(title:string)=>rename(name,card.id,title)}
            onDelete={()=>remove(name,card.id)}
          />
        ))}
      </span>
    </div>
  )
}

export default Column