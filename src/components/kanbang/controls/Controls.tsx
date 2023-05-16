import './controls.css'
import Dump from "./Dump"
import Ship from "./Ship"


const Controls:React.FC =()=>{
  return ( 
    <div className="controls">
      <Dump/>
      <Ship/>
    </div>
  )
}

export default Controls