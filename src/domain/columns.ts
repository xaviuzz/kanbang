import Cards from "./cards";
import { CardDescription, ColumnDescription, Movement } from "./types";
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

  public move(from: string, cardId: string, destination:Movement = 'forward'): Columns {
    const indexTo: number = this.calculateNewIndex(from, destination);
    
    this.doMove(from, indexTo, cardId);

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
  
  private addCardToColumn(indexTo: number, card: CardDescription):void {
    const theColumn: Cards = this.collection[indexTo].content
    this.collection[indexTo].content = theColumn.add(card)
    this.collection[indexTo].id = uuid()
  }
  
  private removeCardFromColumn(from: string, card: string):void {
    const theColumn: ColumnDescription = this.getColumnByName(from)
    theColumn.content = theColumn.content.remove(card)
    theColumn.id = uuid()
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
  
  private canMoveTo(index:number):boolean{
    return index>=0 && index<this.collection.length
  }
  
  private calculateNewIndex(from: string, destination: Movement) {
    const offsets: Record<Movement, number> = {
      'forward': 1, 'backward': -1
    };
    const indexTo: number = this.getColumnPosition(from) + offsets[destination];
    return indexTo;
  }
  
  private doMove(from: string, to: number, cardId: string) {
    if (!this.canMoveTo(to)) return
  
    const theCard: CardDescription = this.retrieveCard(from, cardId);
    
    this.removeCardFromColumn(from, cardId);
    this.addCardToColumn(to, theCard);
  }
}