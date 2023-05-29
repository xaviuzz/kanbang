import React from 'react'
import './newCard.css'

type newCardProps = {
  onSubmit: (title: string) => void
}

const NewCard: React.FC<newCardProps> = ({ onSubmit }) => {

  const submitOnEnter = (key: string, value: string): void => {
    if (key == 'Escape') onSubmit('')
    if (key != 'Enter') return
    onSubmit(value)
  }


  return (
    <div role='card' className='card new_card'>
      <input
        type='text'
        placeholder='Lorem ipsum'
        autoFocus={true}
        onKeyDown={(event) => submitOnEnter(event.key, event.currentTarget.value)}
        onBlur={(event) => onSubmit(event.currentTarget.value)}
      />
    </div>
  )

}

export default NewCard