import React from 'react'
import { useKanban } from '../../../context/kanban'
import './board.css'
import Column from './column/Column'


const Board: React.FC = () => {
  const {kanban} = useKanban()

  return <span className='board lattice' role='main' aria-label='Kanban'>
    {kanban.data().map((column) => (
      <Column
        key={column.id}
        name={column.name}
      />
    ))}
  </span>
}

export default Board