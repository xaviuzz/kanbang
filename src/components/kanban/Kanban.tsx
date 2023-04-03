import React, { useState } from 'react'
import Column from './column/Column'
import './kanban.css'
import Cards from '../../domain/cards'
import { CardDescription } from '../../domain/types'
type ColumnDescription ={
  id: string,
  name: string,
  content: Cards
}

const Kanban:React.FC = ()=>{
  const content:Array<ColumnDescription>=[
    {id: '1', name: 'to-do',content:new Cards()},
    {id: '2', name: 'doing',content:new Cards()},
    {id: '3', name: 'done',content:new Cards()}
  ]

  const[columns,setColumns]=useState<Array<ColumnDescription>>(content)

  const move =(from:string , id:string)=>{
    console.log(`moving from ${from} the card ${id}`)
    
    const theCard:CardDescription = retrieveCard(from,id)
    const indexTo:number = getColumnPosition(from)+1

    if(indexTo < columns.length) {
      setColumns(addCardToColumn(indexTo,theCard))
    }
  }

  const addCardToColumn=(indexTo:number,card:CardDescription)=>{
    const newContent:Array<ColumnDescription>= [...columns]
    newContent[indexTo].content = newContent[indexTo].content.add(card)
    newContent[indexTo].name = 'XXXX'
    return newContent
  }

  const getColumnPosition=(name:string):number=>{
    const theColumn:ColumnDescription = getColumnByName(name)
    return columns.indexOf(theColumn)
  }

  const getColumnByName=(name:string):ColumnDescription=>{
    const found = columns.find((column)=>{return column.name == name})
    if (!found) throw Error
    return found as ColumnDescription
  }

  const retrieveCard=(from:string,card:string):CardDescription=>{
    const fromColumn:ColumnDescription = getColumnByName(from)
    const theCard:CardDescription = fromColumn.content.retrieve(card)
    return theCard
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