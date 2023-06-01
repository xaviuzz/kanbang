import React, { useEffect, useState } from 'react'
import Card from './card/Card'
import './column.css'
import Header from './header/Header'
import { useKanban } from '../../../../context/kanban'
import DomainColumn from '../../../../domain/column'

interface ColumnProps {
  name: string,
}

const Column: React.FC<ColumnProps> = ({ name }) => {
  const {
    move, add, rename, remove,
    getColumn, setSelectedColumn, selectedColumn
  } = useKanban()

  const [cards] = useState<DomainColumn>(getColumn(name))
  const baseClass = 'column'
  const [classes, setClasses] = useState<string>(baseClass)

  useEffect(() => {
    let newClass: string = baseClass
    if(selectedColumn==name)newClass+=' selected'
    setClasses(newClass)
  }, [selectedColumn])

  return (
    <div
      role='region'
      className={classes}
      aria-label={name}
      onMouseOver={() => setSelectedColumn(name)}
    >
      <Header name={name} onClick={() => add(name)} />
      <span>
        {cards.getCards().map((card) => (
          <Card
            key={card.id}
            title={card.title}
            id={card.id}
            onMove={(movement) => move(name, card.id, movement)}
            onChange={(title: string) => rename(name, card.id, title)}
            onDelete={() => remove(name, card.id)}
          />
        ))}
      </span>
    </div>
  )
}

export default Column