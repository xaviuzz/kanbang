import React, { useEffect, useState } from 'react'
import { Movement } from '../../../../../domain/types'
import { FaAngleLeft, FaAngleRight, FaCross } from 'react-icons/fa'
import NewCard from './newCard/NewCard'
import './card.css'
import { useKanban } from '../../../../../context/kanban'

type cardProps = {
  id: string,
  title: string,
  onMove: (direction: Movement) => void,
  onChange: (title: string) => void
  onDelete: () => void
}

const Card: React.FC<cardProps> = ({ title, onMove, onChange, onDelete }) => {
  const [heading, setHeading] = useState<string>(title)
  const { selectedCard, setSelectedCard } = useKanban()
  const baseClass = 'card'
  const [classes, setClasses] = useState<string>(baseClass)

  useEffect(() => {
    let newClass: string = baseClass
    if (selectedCard == heading) newClass += ' selected'
    setClasses(newClass)
  }, [selectedCard])

  const doRename = (value: string): void => {
    if (value == '') {
      onDelete()
      return
    }
    setHeading(value)
    onChange(value)
  }

  const moveForward = (): void => {
    onMove('forward')
  }

  const moveBackward = (): void => {
    onMove('backward')
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
      <a
        className={classes}
        aria-label={heading}
        onClick={() => setSelectedCard(heading)}
        href='#'
      >
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
          <button onClick={onDelete} aria-label='delete'>
            <FaCross />
          </button>
        </div>
      </a>
    )
  }
}

export default Card