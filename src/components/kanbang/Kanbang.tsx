import { useState } from "react"
import { Movement } from "../../domain/types"
import Cards from "../../domain/cards"
import Kanban from "../../domain/kanban"
import Board from "./board/Board"
import Controls from "./controls/Controls"
import {WithKanban} from "../../context/kanban"
import './kanbang.css'

const Kanbang: React.FC = () => {
  
return (
    <div className="kanbang">
      <WithKanban>
        <Controls/>
        <Board />
      </WithKanban>
    </div>
  )
}

export default Kanbang