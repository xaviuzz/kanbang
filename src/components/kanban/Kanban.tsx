import React, { useState } from 'react'
import { Movement } from '../../domain/types'
import Cards from '../../domain/cards'
import Columns from '../../domain/columns'
import Kanbang from '../../domain/kanban'
import Column from './column/Column'
import './kanban.css'


const Kanban: React.FC = () => {
  const [columns, setColumns] = useState<Columns>(new Kanbang())

  const changeIn = (target: string, content: Cards): void => {
    const newColumns = columns.update(target, content)
    setColumns(newColumns)
  }

  const move = (from: string, id: string, direction: Movement): void => {
    const newColumns = columns.move(from, id, direction)
    setColumns(newColumns)
  }

  return <span className='kanban'>
    {columns.data().map((column) => (
      <Column
        key={column.id}
        name={column.name}
        content={column.content}
        onMove={(id: string, direction: Movement) => { move(column.name, id, direction) }}
        onChange={(content: Cards) => { changeIn(column.name, content) }}
      />
    ))}
  </span>
}

export default Kanban