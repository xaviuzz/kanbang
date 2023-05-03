import React from "react"
import Kanban from "../domain/kanban"

interface KanbanContextAPI{
  kanban: Kanban
}

const KanbanContext = React.createContext<KanbanContextAPI>({
  kanban: new Kanban()
})

interface withKanbanProps {
  children: React.ReactNode
}


const WithKanban:React.FC<withKanbanProps> =({children})=>{
  const value:KanbanContextAPI={
    kanban: new Kanban()
  }
  return <KanbanContext.Provider value={value}>{children}</KanbanContext.Provider>
}

export default WithKanban