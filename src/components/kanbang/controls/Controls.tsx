import { useRef } from "react"
import { FaFileUpload, FaSave } from "react-icons/fa"
import Kanban from "../../../domain/kanban"
import './controls.css'
import { useKanban } from "../../../context/kanban"


const Controls:React.FC =()=>{
  const fileUpload=useRef(null)
  const {kanban,load} = useKanban()

  
  const dump=()=>{
    const serialized:string = `data:text/json;chatset=utf-8,${
      kanban.serialize()
    }`
    
    const link:HTMLAnchorElement = document.createElement("a");
    link.href = serialized;
    link.download = "my-kanban.json";
    link.click();
  }

  const ship=()=>{
    if(!fileUpload.current) return
    const input :HTMLElement = fileUpload.current 
    input.click()
  }

  const askForFile=(event:any)=> {
    var reader = new FileReader();
    reader.onload = reLoad;
    reader.readAsText(event.target.files[0]);
  }

  const reLoad=(event:any)=>{
    const loaded:string = event.target.result
    const recovered:Kanban = Kanban.recoverFrom(loaded)
    load(recovered)
  }

  return ( 
    <div className="controls">
      <button aria-label="export" onClick={dump} >
        <FaSave/>
      </button>
      <button aria-label="import" onClick={ship}>
        <FaFileUpload/>
      </button>
      <input
        ref={fileUpload}
        onChange={askForFile}
        id="file"
        type="file"
        style={{display:'none'}}
      />
    </div>
  )
}

export default Controls