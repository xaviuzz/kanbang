import { useRef } from 'react'
import { FaFileUpload } from 'react-icons/fa'
import Kanban from '../../../../app/kanban'
import { useKanban } from '../../../../context/kanban'
import React from 'react'


const Ship:React.FC =()=>{
  const fileUpload=useRef(null)
  const {load} = useKanban()

  const ship=()=>{
    if(!fileUpload.current) return
    const input :HTMLElement = fileUpload.current 
    input.click()
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const askForFile=(event:any)=> {
    const reader = new FileReader()
    reader.onload = reLoad
    reader.readAsText(event.target.files[0])
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const reLoad=(event:any)=>{
    const loaded:string = event.target.result
    const recovered:Kanban = Kanban.recoverFrom(loaded)
    load(recovered)
  }

  return (
    <>
      <button 
        aria-label="import" 
        onClick={ship} 
        role='menuitem' 
        title='Import'>
        <FaFileUpload aria-label='A document being uploaded'/>
      </button>
      <input
        ref={fileUpload}
        onChange={askForFile}
        id="file"
        type="file"
        style={{display:'none'}}
      />
    </> 
  )
}

export default Ship