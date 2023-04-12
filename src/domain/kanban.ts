import Cards from "./cards";
import Columns from "./columns";
import { CardDescription, ColumnDescription, Movement } from "./types";

export default class Kanban extends Columns {
  private static readonly KEY = 'my-kanban'
  constructor(data?: Array<ColumnDescription>) {
    const theData = data || Kanban.recover()
    super(theData)
    this.persist()
  }

  public move(from: string, cardId: string, destination: Movement = 'forward'): Columns {
    const result = super.move(from, cardId, destination)
    this.persist()
    return new Kanban(result.data())
  }

  public update(from: string, content: Cards): Columns {
    const result = super.update(from, content)
    this.persist()
    return new Kanban(result.data())
  }

  private static recover(): Array<ColumnDescription> | undefined {
    const persisted: string = localStorage.getItem(Kanban.KEY) || ''
    try {
      const parsed = JSON.parse(persisted)
      const hidrated: Array<ColumnDescription> = parsed.map((element: any) => {
        return { ...element, content: new Cards(element.content as Array<CardDescription>) }
      })
      return hidrated
    } catch (error) {
      return undefined
    }
  }

  private persist() {
    const flat: Array<object> = this.data().map((column: ColumnDescription) => {
      return { ...column, content: column.content.data() }
    })
    const serialized: string = JSON.stringify(flat)
    localStorage.setItem(Kanban.KEY, serialized)
  }

}