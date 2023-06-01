import { describe, it } from 'vitest'
import Board from '../../src/domain/board'
import Column, { NullColumn } from '../../src/domain/column'
describe ('Board',()=>{

  describe('defaults o a default kanban',()=>{
    const theBoard = new Board()
    
    it('has to-do column',()=>{
      const todo:Column = theBoard.getColumn('to-do')
      expect(todo).not.toBeInstanceOf(NullColumn)
      expect(todo.isEmpty()).toBeTruthy()
    })

    it('has a doing column',()=>{
      const doing:Column = theBoard.getColumn('doing')
      expect(doing).not.toBeInstanceOf(NullColumn)
      expect(doing.isEmpty()).toBeTruthy()
    })

    it('has a done column',()=>{
      const done:Column = theBoard.getColumn('done')
      expect(done).not.toBeInstanceOf(NullColumn)
      expect(done.isEmpty()).toBeTruthy()
    })

  })

  it('can serve one of his columns',()=>{
    const theBoard = new Board()
    const done:Column = theBoard.getColumn('done')
    expect(done).not.toBeInstanceOf(NullColumn)
  })
  
  it('serves a null column if it does not exits',()=>{
    const theBoard = new Board()
    const done:Column = theBoard.getColumn('non existing column')
    expect(done).toBeInstanceOf(NullColumn)
  })

  it('can add cards to an existing column',()=>{
    const theBoard = new Board()
    theBoard.addCardTo('done')
    const done = theBoard.getColumn('done')
    expect(done.isEmpty()).toBeFalsy()
  })

})