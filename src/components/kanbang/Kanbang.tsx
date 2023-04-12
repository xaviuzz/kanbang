import { useRef, useState } from "react"
import Kanban from "../../domain/kanban"
import Board from "./board/Board"
import './kanbang.css'

const Kanbang: React.FC = () => {
  const [kanban,setKanban]=useState<Kanban>(new Kanban())
  const fileUpload=useRef(null)

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
      <Board  kanban={kanban}/>
    </div>
  )
}

export default Kanbang