import React, { useState } from "react"
import Kanban from "../domain/kanban"
import Cards from "../domain/cards"
import { Movement } from "../domain/types"

interface KanbanContextAPI{
  kanban: Kanban
  update: (target:string, content:Cards)=>void
  moveCard: (from:string, id:string, direction:Movement)=>void
  load: (newKanban:Kanban)=>void
  getColumn: (name:string)=>Cards
}

const KanbanContext = React.createContext<KanbanContextAPI>({
  kanban: new Kanban(),
  update: ()=>{},
  moveCard: ()=>{},
  load: ()=>{},
  getColumn: ()=>{return new Cards()}  
})

interface withKanbanProps {
  children: React.ReactNode
}


const WithKanban:React.FC<withKanbanProps> =({children})=>{
  const [kanban,setKanban]=useState<Kanban>(new Kanban()) 

  const update=(target:string, content:Cards):void=>{
    setKanban(kanban.update(target,content))
  }

  const moveCard = (from:string, id:string, direction:Movement):void=>{
    setKanban(kanban.move(from,id,direction))
  }

  const load = (newKanban:Kanban):void=>{
    setKanban(newKanban)
  }

  const getColumn = (name:string):Cards =>{
    return kanban.getColumnByName(name).content
  }

  const value:KanbanContextAPI={
    kanban,
    update,
    moveCard,
    load,
    getColumn
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