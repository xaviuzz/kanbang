
import Card from './card'
import { CardDescription, ColumnDescription } from './types'

export default class Column {
  private id: string
  private name: string
  private cards:Array<Card>

  constructor(description: ColumnDescription) {
    this.id = description.id
    this.name = description.name
    this.cards = description.content.map(
      (description:CardDescription)=>Card.from(description)
    )
  }

  public addCard():void{
    this.cards.push(new Card())
  }

  public toDescription():ColumnDescription{
    return {id: this.id,name:this.name,content:this.cards}
  }

  public getCards():Array<Card>{
    return this.cards
  }

  public isEmpty(): boolean { return this.cards.length == 0 }
  public isCalled(name: string): boolean { return this.name == name }

}

export class NullColumn extends Column {
  constructor(description: ColumnDescription = { id: '', name: '', content: [] }) {
    super(description)
  }
}