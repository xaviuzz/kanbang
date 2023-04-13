import { useState } from "react"
import { Movement } from "../../domain/types"
import Cards from "../../domain/cards"
import Kanban from "../../domain/kanban"
import Board from "./board/Board"
import Controls from "./controls/Controls"
import './kanbang.css'

const Kanbang: React.FC = () => {
  const [kanban,setKanban]=useState<Kanban>(new Kanban())

  const changeIn = (target: string, content: Cards): void => {
    const newKanban = kanban.update(target, content)
    setKanban(newKanban)
  }

  const move = (from: string, id: string, direction: Movement): void => {
    const newKanban = kanban.move(from, id, direction)
    setKanban(newKanban)
  }

  const load = (newKanban:Kanban):void=>{
    setKanban(newKanban)
  }

return (
    <div className="kanbang">
      <Controls kanban={kanban} onLoad={load}/>
      <Board  kanban={kanban} onUpdate={changeIn} onMove={move}/>
    </div>
  )
}

export default Kanbang