import Board from './board/Board'
import Controls from './controls/Controls'
import {WithKanban} from '../../context/kanban'
import './kanbang.css'
import React from 'react'

const Kanbang: React.FC = () => {
  
  return (
    <div className="kanbang">
      <WithKanban>
        <header>
          <h1>Kanbang</h1>
          <Controls/>
        </header>
        <Board />
      </WithKanban>
    </div>
  )
}

export default Kanbang