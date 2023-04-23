import React, { useState } from 'react'
import { Movement } from '../../../../../domain/types'
import './card.css'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import NewCard from './new_card/NewCard'

type cardProps = {
  id: string,
  title: string,
  onMove: (id: string, direction:Movement) => void
  onChange: (id: string, title: string) => void
}

const Card: React.FC<cardProps> = ({ id, title, onMove, onChange }) => {
  const [heading, setHeading] = useState<string>(title)

  const doRename = ( value: string): void => {
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
      <NewCard onSubmit={doRename}/>
    )
  } else {
    return (
      <div role='card' className='card'>
        <button onClick={moveBackward} aria-label ='backward'>
          <FaAngleLeft/>
        </button>
        <h2>{heading}</h2>
        <button onClick={moveForward} aria-label = 'forward'>
          <FaAngleRight/>
        </button>
      </div>
    )
  }
}

export default Card