import './controls.css'
import Dump from './Dump'
import Ship from './Ship'
import React from 'react'


const Controls:React.FC =()=>{
  return ( 
    <div className="controls" role='menu' aria-label='File'>
      <Dump/>
      <Ship/>
    </div>
  )
}

export default Controls