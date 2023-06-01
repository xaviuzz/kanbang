import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { vi } from 'vitest'
import Column from '../../src/components/kanbang/board/column/Column'
import Kanban from '../../src/app/kanban'
import { WithKanban } from '../../src/context/kanban'
import { CardDescription } from '../../src/domain/types'
import { anyId } from '../app/fixture'
import DomainColumn from '../../src/domain/column'
vi.mock('react-router-dom', () => ({
  useLocation:() =>{return {pathname: 'tal'}} 
}))

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
    this.doRender([{ id: SUT.id, title: 'a Title' }])
  }

  public static title() {
    return screen.getByRole('menubar')
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

  private static doRender(content?: Array<CardDescription>) {
    this.mockContent(content)
    render(
      <WithKanban>
        <Column name={this.NAME} />
      </WithKanban>
    )
  }

  private static mockContent(content: Array<CardDescription>=[]): void {
    const cards:DomainColumn = new DomainColumn({id:anyId(),name:'',content})
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
          setSelectedCard: ()=>{},
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