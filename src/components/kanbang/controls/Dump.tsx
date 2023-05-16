import { FaSave } from "react-icons/fa"
import { useKanban } from "../../../context/kanban"


const Dump:React.FC =()=>{
  const {kanban} = useKanban()

  
  const dump=()=>{
    const serialized:string = `data:text/json;chatset=utf-8,${
      kanban.serialize()
    }`
    
    const link:HTMLAnchorElement = document.createElement("a");
    link.href = serialized;
    link.download = "my-kanban.json";
    link.click();
  }

  return ( 
    
      <button aria-label="export" onClick={dump} >
        <FaSave/>
      </button>
      
  )
}

export default Dump