import React, { useState } from 'react'
import Kanban from '../app/kanban'
import Cards from '../domain/cards'
import { Movement } from '../domain/types'
import { useHotkeys } from 'react-hotkeys-hook'
import { useLocation } from 'react-router-dom'

interface KanbanContextAPI {
  kanban: Kanban
  move: (from: string, id: string, direction: Movement) => void
  load: (newKanban: Kanban) => void
  getColumn: (name: string) => Cards
  add: (columnName: string) => void
  rename: (columnName: string, id: string, title: string) => void
  remove: (columnName: string, id: string) => void
  name: string,
  selectedColumn: string,
  setSelectedColumn: (columnName: string) => void,
  selectedCard: string,
  setSelectedCard:(cardName:string)=>void
}

const KanbanContext = React.createContext<KanbanContextAPI>({
  kanban: new Kanban(),
  move: () => { },
  load: () => { },
  getColumn: () => { return new Cards() },
  add: () => { },
  rename: () => { },
  remove: () => { },
  name: '',
  selectedColumn: '',
  setSelectedColumn: () => { },
  selectedCard: '',
  setSelectedCard: ()=>{}
})

interface withKanbanProps {
  children: React.ReactNode
}

const WithKanban: React.FC<withKanbanProps> = ({ children }) => {
  let fromUrl = useLocation().pathname.slice(1)
  if (fromUrl == '') fromUrl = 'kanbang'

  const [kanban, setKanban] = useState<Kanban>(new Kanban(fromUrl))
  const [selectedColumn, setSelectedColumn] = useState<string>('')
  const [selectedCard, setSelectedCard] = useState<string>('')
  useHotkeys('n', () => add(selectedColumn), { preventDefault: true })


  const move = (from: string, id: string, direction: Movement): void => {
    setKanban(kanban.move(from, id, direction))
  }

  const load = (newKanban: Kanban): void => {
    const loaded = new Kanban(name, newKanban.data())
    setKanban(loaded)
  }

  const getColumn = (name: string): Cards => {
    return kanban.getColumnByName(name).content
  }

  const add = (columnName: string) => {
    setKanban(kanban.add(columnName))
  }

  const rename = (columnName: string, id: string, title: string) => {
    setKanban(kanban.rename(columnName, id, title))
  }

  const remove = (columnName: string, id: string) => {
    setKanban(kanban.remove(columnName, id))
  }

  const name: string = kanban.title()

  const value: KanbanContextAPI = {
    kanban,
    load,
    getColumn,
    add, move, rename, remove,
    name,
    selectedColumn, setSelectedColumn,
    selectedCard,setSelectedCard
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

export { WithKanban, useKanban }