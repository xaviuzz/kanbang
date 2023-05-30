import { describe, it, vi } from 'vitest'
import { ColumnDescription } from '../../src/domain/types'
import { aCard, anyId, emptyCards } from '../domain/fixture'
import Cards from '../../src/domain/cards'
import Kanban from '../../src/app/kanban'

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
    const cards: Cards = new Cards([aCard])
    const columns = [
      { id: 'any id', name: 'column', content: cards.data() }
    ]
    const persisted: string = JSON.stringify(columns)
    spy.mockReturnValue(persisted)
    const restored: Kanban = new Kanban()
    const column: ColumnDescription = restored.getColumnByName('column')
    expect(column.content.data()).toEqual(cards.data())
  })

  it('persist on moving cards', () => {
    const spy = vi.spyOn(localStorage, 'setItem')
    const kanbang: Array<ColumnDescription> = [
      { id: anyId(), name: 'to-do', content: new Cards([aCard]) },
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
    const update = new Cards([aCard])
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