import Board from './board/Board'
import {WithKanban} from '../../context/kanban'
import './kanbang.css'
import React from 'react'
import Banner from './banner/Banner'

const Kanbang: React.FC = () => {
  
  return (
    <div className="kanbang">
      <WithKanban>
        <Banner/>
        <Board />
      </WithKanban>
    </div>
  )
}

export default Kanbang