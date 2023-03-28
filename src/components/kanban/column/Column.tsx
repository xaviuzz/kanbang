import React from 'react'

interface ColumnProps {
  name:string
}

const Column:React.FC<ColumnProps> = ({name})=>{
  return <div role='column'><h1>{name}</h1></div>
}

export default Column