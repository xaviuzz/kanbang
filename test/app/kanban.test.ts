import { describe, it, vi } from 'vitest'
import { CardDescription, ColumnDescription } from '../../src/domain/types'
import { aCard, anyId, emptyCards } from './fixture'
import Kanban from '../../src/app/kanban'
import Column from '../../src/domain/column'

describe('the kanban', () => {
  
  it('persists', () => {
    vi.spyOn(localStorage, 'setItem')
    const name = 'my-kanban'
    new Kanban(name,[])
    expect(localStorage.setItem)
      .toHaveBeenCalledWith(name, '[]')
  })

  it('restores its state when persisted', () => {
    const spy = vi.spyOn(localStorage, 'getItem')
    const cards: Array<CardDescription> = [aCard]
    const columns = [
      { id: 'any id', name: 'column', content: cards }
    ]
    const persisted: string = JSON.stringify(columns)
    spy.mockReturnValue(persisted)
    const restored: Kanban = new Kanban()
    const column: Column = restored.getColumn('column')
    expect(column.getCards()).toEqual(cards)
  })

  it('persist on moving cards', () => {
    const spy = vi.spyOn(localStorage, 'setItem')
    const kanbang: Array<ColumnDescription> = [
      { id: anyId(), name: 'to-do', content: [aCard] },
      { id: anyId(), name: 'doing', content: emptyCards },
      { id: anyId(), name: 'done', content: emptyCards }
    ]
    const aKanban: Kanban = new Kanban('a name',kanbang)
    spy.mockReset()
    aKanban.move('to-do', aCard.id)

    expect(spy).toHaveBeenCalled()
  })

  it('persist on update column', () => {
    const spy = vi.spyOn(localStorage, 'setItem')
    const update = [aCard]
    const kanbang: Array<ColumnDescription> = [
      { id: anyId(), name: 'to-do', content: emptyCards },
      { id: anyId(), name: 'doing', content: emptyCards },
      { id: anyId(), name: 'done', content: emptyCards }
    ]
    const aKanban: Kanban = new Kanban('a name',kanbang)
    spy.mockReset()
    aKanban.update('to-do', update)

    expect(spy).toHaveBeenCalled()
  })
})