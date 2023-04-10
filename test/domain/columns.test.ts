import { describe, it } from "vitest";
import { aCard, defaultKanbang, emptyCards,anyId } from "./fixture";
import { ColumnDescription } from "../../src/domain/types";
import Cards from "../../src/domain/cards";
import Columns from '../../src/domain/columns'

describe ('Columns',()=>{
  
  it('returns a deep copy of data',()=>{
    const columns = new Columns(defaultKanbang)

    const result:Array<ColumnDescription> = columns.data()
    
    expect(result).not.toBe(defaultKanbang)
    expect(result).toEqual(defaultKanbang)
    expect(result[0].content).toEqual(defaultKanbang[0].content)
    expect(result[0].content).not.toBe(defaultKanbang[0].content)
  })

  it('defaults to default kanbang',()=>{
    const columns = new Columns()

    const expected = defaultKanbang.map((column) =>{
      return {
        ...column, 
        id: expect.any(String)
      }
    })
    
    const result:Array<ColumnDescription> = columns.data()
    expect(result).toEqual(expected)
  })

  it('can move cards forward',()=>{
    const cards= new Cards().add(aCard)
    const origin:string = 'origin'
    const destination:string = 'destination'
    const initial:Array<ColumnDescription>=[
      {id: anyId(), name: origin ,content:cards},
      {id: anyId(), name: destination,content:emptyCards}
    ]
    const columns = new Columns(initial)

    const result = columns.move(origin,aCard.id)
    
    const destinationColumn = result.getColumnByName(destination);
    expect(destinationColumn.content.data()).toEqual([aCard])
  })

  it('can update changes in columns',()=>{
    const cards= new Cards().add(aCard)
    const target:string = 'target'
    const initial:Array<ColumnDescription>=[
      {id: anyId(), name: target,content:new Cards()}
    ]
    const columns = new Columns(initial)
   
    const result = columns.update(target,cards)
   
    const destinationColumn: ColumnDescription = result.getColumnByName(target)
    expect(destinationColumn.content.data()).toEqual(cards.data())
  })
})