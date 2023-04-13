import React, { useEffect, useState } from 'react'
import Cards from '../../../domain/cards'
import Kanban from '../../../domain/kanban'
import { Movement } from '../../../domain/types'
import './board.css'
import Column from './column/Column'

type BoardProps ={
  kanban:Kanban
  onMove:(from: string, id: string, direction: Movement)=>void,
  onUpdate:(target: string, content: Cards)=>void
}

const Board: React.FC<BoardProps> = ({kanban,onMove,onUpdate}) => {
  const [columns, setColumns] = useState<Kanban>(kanban)

  useEffect(()=>{
    setColumns(kanban)
  },[kanban])

  return <span className='board'>
    {columns.data().map((column) => (
      <Column
        key={column.id}
        name={column.name}
        content={column.content}
        onMove={(id: string, direction: Movement) => { onMove(column.name, id, direction) }}
        onChange={(content: Cards) => { onUpdate(column.name, content) }}
      />
    ))}
  </span>
}

export default Board