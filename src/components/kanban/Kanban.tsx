import React, { useState } from 'react'
import Column from './column/Column'
import './kanban.css'
import Cards from '../../domain/cards'
import Columns from '../../domain/columns'


const Kanban:React.FC = ()=>{
  const[columns,setColumns]=useState<Columns>(new Columns())
  
  const changeIn = (target:string,content:Cards)=>{}
  const move =(from:string , id:string)=>{
    console.log(`moving from ${from} the card ${id}`)
    const newColumns = columns.move(from,id)
    setColumns(newColumns)
  }

  return <span className='kanban'>
    {columns.data().map((column) =>(
      <Column  
        key={column.id}
        name={column.name}
        content={column.content}
        onMove={(id:string)=>{move(column.name,id)}}
        onChange={(content:Cards)=>{changeIn(column.name,content)}}
      />
    ))}
  </span>
}

export default Kanban