import React from 'react'
import './column.css'

interface ColumnProps {
  name:string
}

const Column:React.FC<ColumnProps> = ({name})=>{
  return <div role='column' className='column'><h1>{name}</h1></div>
}

export default Column