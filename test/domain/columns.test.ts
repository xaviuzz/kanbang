import { describe, it } from "vitest";
import Cards from "../../src/domain/cards";
import Columns from '../../src/domain/columns'
import { ColumnDescription } from "../../src/domain/types";

describe ('Columns',()=>{
  
  it('contains column descriptions data ',()=>{
    const columns=new Columns()
    const result:Array<ColumnDescription> = columns.data()
    expect(result).toEqual([])
  })

  it('returns a copy of data',()=>{
    const defaultKanbang:Array<ColumnDescription>=[
      {id: '1', name: 'to-do',content:new Cards()},
      {id: '2', name: 'doing',content:new Cards()},
      {id: '3', name: 'done',content:new Cards()}
    ]
    const columns=new Columns(defaultKanbang)
    const result:Array<ColumnDescription> = columns.data()
    expect(result).not.toBe(defaultKanbang)
    expect(result).toEqual(defaultKanbang)
  })

})