import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { vi } from 'vitest'
import Column from '../../src/components/kanbang/board/column/Column'
import Cards from '../../src/domain/cards'
import Kanban from '../../src/domain/kanban'
import { WithKanban } from '../../src/context/kanban'


describe('Column', () => {
  
  beforeAll(()=>{
    SUT.mockContext()
  })

  beforeEach(()=>{
    vi.resetAllMocks()
  })

  it('has a Title with its name', async () => {
    SUT.render()
    expect(SUT.title()).toHaveTextContent(SUT.NAME)
  })

  it('has a icon to add a card', async () => {
    SUT.render()
    SUT.clickAdd()
    expect(SUT.add).toHaveBeenCalled()
  })

  it('signals card forward movement', async () => {
    SUT.renderFilled()
    SUT.moveCardForward()
    expect(SUT.move).toBeCalledWith(SUT.NAME, SUT.id, 'forward')
  })

  it('signals card backward movement', async () => {
    SUT.renderFilled()
    SUT.moveCardBackward()
    expect(SUT.move).toBeCalledWith(SUT.NAME, SUT.id, 'backward')
  })

})

class SUT {
  public static readonly NAME: string = 'aName'

  public static getColumn = vi.fn()
  public static move = vi.fn()
  public static change = vi.fn()
  public static id = 'an id'
  public static add = vi.fn()

  public static render() {
    this.doRender()
  }

  public static renderFilled() {
    this.doRender(new Cards([{ id: SUT.id, title: 'a Title' }]))
  }

  public static title() {
    return screen.getByRole('heading')
  }

  public static clickAdd() {
    const addCTA = screen.getByRole('menuitem', { name: 'add card' })
    fireEvent.click(addCTA)
  }

  public static moveCardForward() {
    const moveCTA = screen.getByRole('button', { name: 'forward' })
    fireEvent.click(moveCTA)
  }

  public static moveCardBackward() {
    const moveCTA = screen.getByRole('button', { name: 'backward' })
    fireEvent.click(moveCTA)
  }

  private static doRender(content?: Cards) {
    this.mockContent(content)
    render(
      <WithKanban>
        <Column name={this.NAME} />
      </WithKanban>
    )
  }

  private static mockContent(content?: Cards): void {
    const cards = content || new Cards()
    SUT.getColumn.mockReturnValue(cards)
  }

  public static mockContext() {
    vi.mock('../../src/context/kanban', async () => {
      const actual: object = await vi.importActual('../../src/context/kanban')
      const useKanban = () => {
        return {
          kanban: new Kanban(),
          update: SUT.change,
          move: SUT.move,
          add: SUT.add,
          remove: () => { },
          load: () => { },
          getColumn: SUT.getColumn
        }
      }

      return {
        ...actual,
        useKanban
      }
    })
  }

}