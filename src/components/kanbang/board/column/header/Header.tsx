import { FaPlus } from 'react-icons/fa'
import './header.css'
import React from 'react'

interface headerProps {
  name: string,
  onClick: () => void
}

const Header: React.FC<headerProps> = ({ name, onClick }) => {
  return (
    <div className='column-header'>
      <h1>{name}</h1>
      <button onClick={onClick} aria-label='add card'>
        <FaPlus />
      </button>
    </div>
  )
}

export default Header