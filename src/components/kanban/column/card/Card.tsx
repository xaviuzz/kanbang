import React, { useEffect, useState } from 'react'
import './card.css'

type cardProps = {
  id: string,
  title: string,
  onMove: (id:string)=>void
  onChange: (id: string,title:string)=>void
}

const Card: React.FC<cardProps> = ({id, title, onMove, onChange }) => {
  const [heading, setHeading] = useState<string>(title)

  const submitOnEnter = (key: string, value: string): void => {
    if (key === "Enter") {
      setHeading(value)
      onChange(id,value)
    }
  }

  const moveForward=()=>{
    onMove(id)
  }
  
  if (heading.trim() == '') {
    return (
      <div role='card' className='card'>
        <input 
          type='text'
          placeholder='lorem ipsum'
          autoFocus={true}
          onKeyDown={(event) => submitOnEnter(event.key, event.currentTarget.value)}
        />
      </div>
    )
  } else {
    return (
      <div role='card' className='card'>
        <h2>{heading}</h2>
        <button onClick={moveForward}>&gt;</button>
      </div>
    )
  }
}

export default Card