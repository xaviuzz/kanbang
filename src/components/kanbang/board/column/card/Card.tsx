import React, { useState } from 'react'
import { Movement } from '../../../../../domain/types'
import './card.css'

type cardProps = {
  id: string,
  title: string,
  onMove: (id: string, direction:Movement) => void
  onChange: (id: string, title: string) => void
}

const Card: React.FC<cardProps> = ({ id, title, onMove, onChange }) => {
  const [heading, setHeading] = useState<string>(title)

  const submitOnEnter = (key: string, value: string): void => {
    if (key != "Enter") return
    setHeading(value)
    onChange(id, value)
  }

  const moveForward = (): void => {
    onMove(id,'forward')
  }

  const moveBackward = (): void => {
    onMove(id,'backward')
  }

  const noTitle = (): boolean => {
    return heading.trim() == ''
  }

  if (noTitle()) {
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
        <button onClick={moveBackward} aria-label ='backward'>
          &lt;
        </button>
        <h2>{heading}</h2>
        <button onClick={moveForward} aria-label = 'forward'>
          &gt;
        </button>
      </div>
    )
  }
}

export default Card