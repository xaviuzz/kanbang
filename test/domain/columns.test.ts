import { describe, it } from "vitest";
import Cards from "../../src/domain/cards";
import Columns from '../../src/domain/columns'
import { CardDescription, ColumnDescription } from "../../src/domain/types";

describe ('Columns',()=>{
  
  it('returns a deep copy of data',()=>{
    const defaultKanbang:Array<ColumnDescription>=[
      {id: '1', name: 'to-do',content:new Cards()},
      {id: '2', name: 'doing',content:new Cards()},
      {id: '3', name: 'done',content:new Cards()}
    ]
    const columns = new Columns(defaultKanbang)
    const result:Array<ColumnDescription> = columns.data()
    expect(result).not.toBe(defaultKanbang)
    expect(result).toEqual(defaultKanbang)
    expect(result[0].content).toEqual(defaultKanbang[0].content)
    expect(result[0].content).not.toBe(defaultKanbang[0].content)
  })

  it('defaults to default kanbang',()=>{
    const defaultKanbang:Array<ColumnDescription>=[
      {id: '1', name: 'to-do',content:new Cards()},
      {id: '2', name: 'doing',content:new Cards()},
      {id: '3', name: 'done',content:new Cards()}
    ]
    const columns = new Columns()
    expect(columns.data()).toEqual(defaultKanbang)
  })

  it('can move cards forward',()=>{
    const aCard:CardDescription={id:'an Id',title:'a card'}
    const cards= new Cards().add(aCard)
    const initial:Array<ColumnDescription>=[
      {id: '1', name: 'to-do',content:cards},
      {id: '2', name: 'doing',content:new Cards()},
      {id: '3', name: 'done',content:new Cards()}
    ]
    const columns = new Columns(initial)
    const result = columns.move('to-do',aCard.id)
    expect(result.data()[1].content.data()).toEqual([aCard])
  })

})