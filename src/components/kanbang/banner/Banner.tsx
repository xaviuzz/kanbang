import React from 'react'
import Controls from './controls/Controls'
import { useKanban } from '../../../context/kanban'

const Banner:React.FC=()=>{
  const {name} = useKanban()
  return (
    <header>
      <h1>{name}</h1>
      <Controls/>
    </header>
  )
}

export default Banner