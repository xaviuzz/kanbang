import React, { useState } from 'react'
import { Movement } from '../../../../../domain/types'
import './card.css'
import { FaAngleLeft, FaAngleRight, FaCross } from 'react-icons/fa'
import NewCard from './newCard/NewCard'

type cardProps = {
  id: string,
  title: string,
  onMove: (id: string, direction: Movement) => void,
  onChange: (id: string, title: string) => void
  onDelete: (id: string) => void
}

const Card: React.FC<cardProps> = ({ id, title, onMove, onChange, onDelete }) => {
  const [heading, setHeading] = useState<string>(title)

  const doRename = (value: string): void => {
    if (value == '') {
      onDelete(id)
      return
    }
    setHeading(value)
    onChange(id, value)
  }

  const moveForward = (): void => {
    onMove(id, 'forward')
  }

  const moveBackward = (): void => {
    onMove(id, 'backward')
  }

  const noTitle = (): boolean => {
    return heading.trim() == ''
  }

  if (noTitle()) {
    return (
      <NewCard onSubmit={doRename} />
    )
  } else {
    return (
      <div role='card' className='card'>
        <div className='card-moving'>
          <button onClick={moveBackward} aria-label='backward'>
            <FaAngleLeft />
          </button>
        </div>
        <div className='card-content'>
          <h2>{heading}</h2>
        </div>
        <div className='card-moving'>
          <button onClick={moveForward} aria-label='forward'>
            <FaAngleRight />
          </button>
        </div>
        <div className='card-delete'>
          <button onClick={(e)=>onDelete(id)} aria-label='delete'>
            <FaCross />
          </button>
        </div>
      </div>
    )
  }
}

export default Card