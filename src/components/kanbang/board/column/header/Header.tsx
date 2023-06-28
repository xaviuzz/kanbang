import { FaPlus } from 'react-icons/fa'
import './header.css'
import React from 'react'

interface headerProps {
  name: string,
  onClick: () => void
}

const Header: React.FC<headerProps> = ({ name, onClick }) => {
  return (
    <div className='column-header' role='menubar'>
      <div className='column-title'>{name}</div>
      <button 
        onClick={onClick} 
        aria-label='add card' 
        role='menuitem' 
        title='Add card'>
        <FaPlus role='none'/>
      </button>
    </div>
  )
}

export default Header