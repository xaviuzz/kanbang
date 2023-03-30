import React from 'react'
import './card.css'

type cardProps={
  name:string
}

const Card:React.FC<cardProps> = ({name})=>{
  return (
    <div role='card'>{name}</div>
  )
}

export default Card