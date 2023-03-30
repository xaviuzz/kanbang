import React, { useState } from 'react'
import './card.css'

type cardProps = {
  title: string
}

const Card: React.FC<cardProps> = ({ title }) => {
  const [heading, setHeading] = useState<string>(title)

  const submitOnEnter = (key: string, value: string): void => {
    if (key === "Enter") setHeading(value)
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
      <div role='card' className='card'>{heading}</div>
    )
  }
}

export default Card