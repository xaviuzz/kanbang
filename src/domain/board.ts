import uuid from 'uuid-random'
import Column, { NullColumn } from './column'
import { BoardDescription } from './types'
import { ColumnDescription } from './types'

const DEFAULT: BoardDescription = [
  { id: uuid(), name: 'to-do', content: [] },
  { id: uuid(), name: 'doing', content: [] },
  { id: uuid(), name: 'done', content: [] }
]

export default class Board {
  protected readonly columns: Array<Column> = []

  constructor(data: BoardDescription = DEFAULT) {
    this.columns = data.map((description:ColumnDescription)=>{
      return new Column(description)
    })
  }

  public getColumn(name:string):Column{
    let result = new NullColumn()
    const found = this.columns.find((column:Column)=>column.isCalled(name))
    if (found) result = found
    return result 
  }

  public addCardTo(columnName:string){
    this.getColumn(columnName).addCard()
  }

  public getColumnsDescription():Array<ColumnDescription>{
    return this.columns.map((column:Column)=>{
      return column.toDescription()
    })
  }


}