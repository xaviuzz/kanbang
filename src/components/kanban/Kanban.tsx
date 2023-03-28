import React from 'react'
import Column from './column/Column'
import './kanban.css'

const Kanban:React.FC = ()=>{
  const columns:Array<string>=['to-do','doing','done']
  return <span className='kanban'>
    {columns.map((name) =>(
      <Column name={name}/>
    ))}
  </span>
}

export default Kanban