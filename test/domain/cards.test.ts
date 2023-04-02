import { describe, it } from "vitest";
import Cards from '../../src/domain/cards'
import { CardDescription } from "../../src/domain/types";

describe('Cards',()=>{

  it('contains card descriptions data',()=>{
    const cards=new Cards()
    const result:Array<CardDescription> = cards.data()
    expect(result).toEqual([])
  })

  it('can add a new card',()=>{
    const validUUID = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    const original=new Cards()
    const mutated:Cards = original.addNew()
    const result:Array<CardDescription> = mutated.data()
    expect(result[0].title).toEqual('')
    expect(result[0].id).toMatch(validUUID)
    expect(mutated).not.toBe(original)
  })

  it('can remove a card',()=>{
    const aCard:CardDescription={id:'an Id',title:'a card'}
    const anotherCard:CardDescription={id:'another Id',title:'another card'}
    const data:Array<CardDescription>=[aCard,anotherCard]
    const original=new Cards(data)
    const mutated:Cards = original.remove(aCard.id)
    const result:Array<CardDescription> = mutated.data()
    expect(result).toEqual([anotherCard])
    expect(mutated).not.toBe(original)
  })

  it('can retrieve a card',()=>{
    const aCard:CardDescription={id:'an Id',title:'a card'}
    const anotherCard:CardDescription={id:'another Id',title:'another card'}
    const data:Array<CardDescription>=[aCard,anotherCard]
    const original=new Cards(data)
    const retrieved:CardDescription = original.retrieve(aCard.id)
    expect(retrieved).toEqual(aCard)
  })

  it('can add a card',()=>{
    const aCard:CardDescription={id:'an Id',title:'a card'}
    const anotherCard:CardDescription={id:'another Id',title:'another card'}
    const original=new Cards([aCard])
    const mutated:Cards = original.add(anotherCard)
    expect(mutated.data()).toEqual([aCard,anotherCard])
    expect(mutated).not.toBe(original)
  })

})