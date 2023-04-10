import React, { useState } from 'react'
import Cards from '../../domain/cards'
import Columns from '../../domain/columns'
import Column from './column/Column'
import './kanban.css'


const Kanban: React.FC = () => {
  const [columns, setColumns] = useState<Columns>(new Columns())

  const changeIn = (target: string, content: Cards): void => {
    const newColumns = columns.update(target, content)
    setColumns(newColumns)
  }

  const move = (from: string, id: string): void => {
    const newColumns = columns.move(from, id)
    setColumns(newColumns)
  }

  return <span className='kanban'>
    {columns.data().map((column) => (
      <Column
        key={column.id}
        name={column.name}
        content={column.content}
        onMove={(id: string) => { move(column.name, id) }}
        onChange={(content: Cards) => { changeIn(column.name, content) }}
      />
    ))}
  </span>
}

export default Kanban