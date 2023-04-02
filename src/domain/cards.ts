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
    this.collection.push({
      id: uuid(),
      title: this.EMPTY
    })
    return this.clone()
  }

  public remove(toRemove:string):Cards{
    let newData: Array<CardDescription> = this.data()
    newData = newData.filter((card)=>card.id != toRemove) 
    return new Cards(newData)
  }

  private clone():Cards{
    return  new Cards(this.data())
  }
  
}