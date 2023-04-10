import Cards from "./cards";
import { CardDescription, ColumnDescription } from "./types";
import uuid from 'uuid-random'

const DEFAULT: Array<ColumnDescription> = [
  { id: uuid(), name: 'to-do', content: new Cards() },
  { id: uuid(), name: 'doing', content: new Cards() },
  { id: uuid(), name: 'done', content: new Cards() }
]

export default class Columns {
  private readonly collection: Array<ColumnDescription> = []

  constructor(data: Array<ColumnDescription> = DEFAULT) {
    data.forEach((column) => {
      this.collection.push({
        ...column,
        content: column.content.clone()
      })
    })
  }

  public data(): Array<ColumnDescription> {
    return this.collection
  }

  public move(from: string, cardId: string): Columns {
    const theCard: CardDescription = this.retrieveCard(from, cardId)
    const indexTo: number = this.getColumnPosition(from) + 1

    if (indexTo < this.collection.length) {
      this.addCardToColumn(indexTo, theCard)
    }

    return new Columns(this.data())
  }

  public update(from: string, content: Cards): Columns {
    const column: ColumnDescription = this.getColumnByName(from)
    
    column.content = new Cards(content.data())
    column.id = uuid()
    
    return new Columns(this.data())
  }
  
  public getColumnByName(name: string): ColumnDescription {
    const found = this.collection.find(column => column.name == name )
    if (!found) throw Error
    return found as ColumnDescription
  }

  private addCardToColumn(indexTo: number, card: CardDescription) {
    const theColumn: Cards = this.collection[indexTo].content
    this.collection[indexTo].content = theColumn.add(card)
    this.collection[indexTo].id = uuid()
  }

  private getColumnPosition(name: string): number {
    const theColumn: ColumnDescription = this.getColumnByName(name)
    return this.collection.indexOf(theColumn)
  }


  private retrieveCard(from: string, card: string): CardDescription {
    const fromColumn: ColumnDescription = this.getColumnByName(from)
    const theCard: CardDescription = fromColumn.content.retrieve(card)
    return theCard
  }

}