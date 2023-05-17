import Cards from './cards'
import Columns from './columns'
import { CardDescription, ColumnDescription, Movement } from './types'

export default class Kanban extends Columns {
  private static readonly KEY = 'my-kanban'
  constructor(data?: Array<ColumnDescription>) {
    const theData = data || Kanban.recover()
    super(theData)
    this.persist()
  }

  public move(from: string, cardId: string, destination: Movement = 'forward'): Kanban {
    const result = super.move(from, cardId, destination)
    this.persist()
    return new Kanban(result.data())
  }

  public update(from: string, content: Cards): Kanban {
    const result = super.update(from, content)
    this.persist()
    return new Kanban(result.data())
  }

  private static recover(): Array<ColumnDescription> | undefined {
    const persisted: string = localStorage.getItem(Kanban.KEY) || ''
    return this.hidrate(persisted)
  }

  private static hidrate(serialized:string):Array<ColumnDescription>|undefined{
    try {
      const parsed = JSON.parse(serialized)
      const hidrated: Array<ColumnDescription> = 
        parsed.map((element: { content: CardDescription[] }) => {
          return { 
            ...element, 
            content: new Cards(element.content as Array<CardDescription>) 
          }
        })
      return hidrated
    } catch (error) {
      return undefined
    }
  }

  public static recoverFrom(serialized:string):Kanban{
    const hidrated= this.hidrate(serialized)
    return new Kanban(hidrated)
  }

  private persist() {
    const serialized: string = this.serialize()
    localStorage.setItem(Kanban.KEY, serialized)
  }


  public serialize() {
    const flat: Array<object> = this.data().map((column: ColumnDescription) => {
      return { ...column, content: column.content.data() }
    })
    const serialized: string = JSON.stringify(flat)
    return serialized
  }
}