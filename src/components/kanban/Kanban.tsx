import React, { useState } from 'react'
import Column from './column/Column'
import './kanban.css'
import Cards from '../../domain/cards'
import { CardDescription } from '../../domain/types'
type ColumnDescription ={
  name: string,
  content: Cards
}

const Kanban:React.FC = ()=>{
  const content:Array<ColumnDescription>=[
    {name: 'to-do',content:new Cards()},
    {name: 'doing',content:new Cards()},
    {name: 'done',content:new Cards()}
  ]

  const[columns,setColumns]=useState<Array<ColumnDescription>>(content)

  const move =(from:string , id:string)=>{
    console.log(`moving from ${from} the card ${id}`)
    const found = columns.find((column)=>{return column.name == from})
    if (!found) return
    const fromColumn:ColumnDescription = found as ColumnDescription
    const indexFrom:number = columns.indexOf(fromColumn!)
    const theCard:CardDescription = fromColumn.content.retrieve(id)
    const indexTo:number = indexFrom+1
    if(indexTo > columns.length-1) return
    const newContent:Array<ColumnDescription>= Array.from(columns)
    newContent[indexTo].content = newContent[indexTo].content.add(theCard)
    setColumns(newContent)
  }

  const changeIn = (target:string,content:Cards)=>{
    const theColumn = columns.find((column)=>{return column.name == target})
    const indexFrom:number = columns.indexOf(theColumn!)
    const newContent:Array<ColumnDescription>= Array.from(columns)
    newContent[indexFrom].content = content
    setColumns(newContent)
  }

  return <span className='kanban'>
    {columns.map((column) =>(
      <Column  
        key={column.name}
        name={column.name}
        content={column.content}
        onMove={(id:string)=>{move(column.name,id)}}
        onChange={(content:Cards)=>{changeIn(column.name,content)}}
      />
    ))}
  </span>
}

export default Kanban