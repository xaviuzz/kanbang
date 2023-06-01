import uuid from 'uuid-random'
import { CardDescription } from './types'
export default class Card{
  id: string
  title: string

  public static from(description:CardDescription):Card{
    const result = new Card()
    result.id = description.id
    result.title = description.title
    return result
  }
  
  constructor(){
    this.id = uuid()
    this.title =''
  }


}