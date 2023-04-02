import { CardDescription } from "./types";
import uuid from 'uuid-random'

export default class Cards{
  private readonly collection:Array<CardDescription>=[]
  private readonly EMPTY:string = ''

  constructor(data?:Array<CardDescription>){
    this.collection = Array.from(data || [])
  }

  public data():Array<CardDescription>{
    return Array.from(this.collection)
  }

  public addNew():Cards{
    const newCard:CardDescription={
      id: uuid(),
      title: this.EMPTY
    }
    return this.add(newCard)
  }

  public remove(toRemove:string):Cards{
    let newData: Array<CardDescription> = this.data()
    newData = newData.filter((card)=>card.id != toRemove) 
    return new Cards(newData)
  }

  public retrieve(toRetrieve:string):CardDescription{
    const nullCard:CardDescription = {id: '',title:''}
    const result:CardDescription = this.collection.find((card)=>card.id == toRetrieve) || nullCard
    return result
  }

  public add(aCard:CardDescription):Cards{
    const newData:Array<CardDescription>=this.data()
    newData.push(aCard)
    return new Cards(newData)
  }
  
}