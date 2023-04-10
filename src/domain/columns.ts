import Cards from "./cards";
import { CardDescription, ColumnDescription } from "./types";
import uuid from 'uuid-random'

export default class Columns{
  private readonly DEFAULT:Array<ColumnDescription>=[
    {id: uuid(), name: 'to-do',content:new Cards()},
    {id: uuid(), name: 'doing',content:new Cards()},
    {id: uuid(), name: 'done',content:new Cards()}
  ]
  private readonly collection: Array<ColumnDescription>=[]

  constructor(data?:Array<ColumnDescription>){
    const toImport:Array<ColumnDescription> = data || this.DEFAULT
    toImport.forEach((column)=>{
        this.collection.push({
          ...column,
           content: column.content.clone()
        })
    })
  }

  data():Array<ColumnDescription>{
    return this.collection
  }
  
  move(from:string , id:string):Columns{
    const theCard:CardDescription = this.retrieveCard(from,id)
    
    const indexTo:number = this.getColumnPosition(from)+1
    
    if(indexTo < this.collection.length) {
      this.addCardToColumn(indexTo,theCard)
    }
    return new Columns(this.data())
  }

  update(from:string , content:Cards):Columns{
    const indexTo = this.getColumnPosition(from)
    const column = this.data()[indexTo]
    column.content = new Cards(content.data())
    return new Columns(this.data())
  }

  addCardToColumn(indexTo:number,card:CardDescription){
    const theColumn:Cards = this.collection[indexTo].content
    this.collection[indexTo].content = theColumn.add(card)
    this.collection[indexTo].id = uuid()
  }

  getColumnPosition(name:string):number{
    const theColumn:ColumnDescription = this.getColumnByName(name)
    return this.collection.indexOf(theColumn)
  }

  getColumnByName(name:string):ColumnDescription{
    const found = this.collection.find((column)=>{return column.name == name})
    if (!found) throw Error
    return found as ColumnDescription
  }

  retrieveCard(from:string,card:string):CardDescription{
    const fromColumn:ColumnDescription = this.getColumnByName(from)
    const theCard:CardDescription = fromColumn.content.retrieve(card)
    return theCard
  }
}