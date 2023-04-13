import { useRef, useState } from "react"
import Cards from "../../domain/cards"
import Kanban from "../../domain/kanban"
import { Movement } from "../../domain/types"
import Board from "./board/Board"
import './kanbang.css'

const Kanbang: React.FC = () => {
  const [kanban,setKanban]=useState<Kanban>(new Kanban())
  const fileUpload=useRef(null)

  const changeIn = (target: string, content: Cards): void => {
    const newKanban = kanban.update(target, content)
    setKanban(newKanban)
  }

  const move = (from: string, id: string, direction: Movement): void => {
    const newKanban = kanban.move(from, id, direction)
    setKanban(newKanban)
  }

  const dump=()=>{
    const jsonString:string = `data:text/json;chatset=utf-8,${
      kanban.serialize()
    }`
    
    const link:HTMLAnchorElement = document.createElement("a");
    link.href = jsonString;
    link.download = "my-kanban.json";
    link.click();
  }

  const ship=()=>{
    if(!fileUpload.current) return
    const input :HTMLElement = fileUpload.current 
    input.click()
  }

  const onChange=(event:any)=> {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
  }

  const onReaderLoad=(event:any)=>{
    const loaded:string = event.target.result
    const recovered:Kanban = Kanban.recoverFrom(loaded)
    console.log(recovered)
    setKanban(recovered)
  }

return (
    <div className="kanbang">
      <button 
        aria-label="export"
        onClick={dump}
      >
      {'[ SAVE }'}
      </button>
      <button 
        aria-label="import"
        onClick={ship}
      >
      {'[ LOAD }'}
      </button>
      <input
        ref={fileUpload} 
        id="file"
        type="file"
        onChange={onChange}
        style={{display:'none'}}
      />
      <Board  kanban={kanban} onUpdate={changeIn} onMove={move}/>
    </div>
  )
}

export default Kanbang