import Board from '../domain/board'
import { CardDescription, ColumnDescription } from '../domain/types'

export default class Kanban extends Board {
  private name: string

  constructor(name = 'kanbang', data?: Array<ColumnDescription>) {
    const theData = data || Kanban.recover(name)
    super(theData)
    this.name = name
    this.persist()
  }

  public setName(name:string){
    this.name = name
  }

  public add(columnName: string): Kanban {
    super.addCardTo(columnName)
    this.persist()
    return this.clone()
  }

  public move(columnName: string, id:string): Kanban {
    
    this.persist()
    return this.clone()
  }

  public update(columnName: string, content: Array<CardDescription>): Kanban {
    
    this.persist()
    return this.clone()
  }
 
  private persist() {
    const serialized: string = this.serialize()
    localStorage.setItem(this.name, serialized)
  }


  public serialize() {
    const serialized: string = JSON.stringify(this.getColumnsDescription())
    return serialized
  }

  public title(): string {
    return this.name
  }

  private clone():Kanban{
    return new Kanban(this.name,this.getColumnsDescription())
  }

  private static recover(name: string): Array<ColumnDescription> | undefined {
    const persisted: string = localStorage.getItem(name) || ''
    return this.hidrate(persisted)
  }

  private static hidrate(serialized: string): Array<ColumnDescription> | undefined {
    try {
      const parsed = JSON.parse(serialized)
      return parsed
    } catch (error) {
      return undefined
    }
  }
}