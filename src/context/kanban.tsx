import React, { useState } from "react"
import Kanban from "../domain/kanban"
import Cards from "../domain/cards"
import { Movement } from "../domain/types"

interface KanbanContextAPI{
  kanban: Kanban
  move: (from:string, id:string, direction:Movement)=>void
  load: (newKanban:Kanban)=>void
  getColumn: (name:string)=>Cards
  add: (columnName: string)=>void
  rename: (columnName: string,id:string,title:string)=>void
  remove: (columnName: string,id:string)=>void
}

const KanbanContext = React.createContext<KanbanContextAPI>({
  kanban: new Kanban(),
  move: ()=>{},
  load: ()=>{},
  getColumn: ()=>{return new Cards()},
  add: ()=>{}  ,
  rename:()=>{},
  remove:()=>{}
})

interface withKanbanProps {
  children: React.ReactNode
}


const WithKanban:React.FC<withKanbanProps> =({children})=>{
  const [kanban,setKanban]=useState<Kanban>(new Kanban()) 

  const update=(target:string, content:Cards):void=>{
    setKanban(kanban.update(target,content))
  }

  const move = (from:string, id:string, direction:Movement):void=>{
    setKanban(kanban.move(from,id,direction))
  }

  const load = (newKanban:Kanban):void=>{
    setKanban(newKanban)
  }

  const getColumn = (name:string):Cards =>{
    return kanban.getColumnByName(name).content
  }

  const add=(columnName:string)=>{
    const theColumn=getColumn(columnName)
    const newContent: Cards = theColumn.addNew()
    update(columnName,newContent)
  }

  const  rename=(columnName:string, id:string, title:string)=> {
    const theColumn=getColumn(columnName)
    const newContent: Cards = theColumn.rename(id, title)
    update(columnName,newContent)      
  }

  const remove=(columnName:string,id:string)=>{
    const theColumn=getColumn(columnName)
    const newContent: Cards = theColumn.remove(id)
    update(columnName,newContent)
  }

  const value:KanbanContextAPI={
    kanban,
    move,
    load,
    getColumn,
    add,
    rename,
    remove
  }
  return <KanbanContext.Provider value={value}>{children}</KanbanContext.Provider>
}

function useKanban() {
  const context = React.useContext(KanbanContext)
  if (context === undefined) {
    throw new Error('useKanban must be used within a <WithKanban>')
  }
  return context
}

export {WithKanban ,useKanban}