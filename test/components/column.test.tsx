import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { act } from "react-dom/test-utils"
import { vi } from 'vitest'
import Column from '../../src/components/kanbang/board/column/Column'
import Cards from "../../src/domain/cards"
import Kanban from "../../src/domain/kanban"
import { WithKanban } from "../../src/context/kanban"

const getColumn = vi.fn()
const move = vi.fn()
const change = vi.fn()

vi.mock("../../src/context/kanban",async ()=>{
  const actual:object = await vi.importActual("../../src/context/kanban")
  
  const useKanban= ()=>{
    return {
      kanban: new Kanban(),
      update: change,
      moveCard: move,
      load: ()=>{},
      getColumn: getColumn   
    }
  }
  
  return {
    ...actual,
    useKanban
  }})

describe("Column", () => {
  it("has a Title with its name", async () => {
    SUT.render()
    expect(SUT.title()).toHaveTextContent(SUT.NAME)
  })

  it("has a icon to add a card", async () => {
    SUT.render()
    await SUT.addCard()
    expect(SUT.countCards()).toEqual(1)
  })

  it("does not add a card without name", async () => {
    SUT.render()
    SUT.clickAdd()
    await SUT.typeOnPrompt('')
    expect(SUT.countCards()).toEqual(0)
  })

  it("signals card forward movement", async () => {
    vi.resetAllMocks()
    SUT.renderFilled()
    SUT.moveCardForward()
    expect(SUT.move).toBeCalledWith(SUT.NAME, SUT.id, 'forward')
  })

  it("signals card backward movement", async () => {
    vi.resetAllMocks()
    SUT.renderFilled()

    SUT.moveCardBackward()

    expect(SUT.move).toBeCalledWith(SUT.NAME, SUT.id, 'backward')
  })

  it("signals content changes", async () => {
    SUT.renderFilled()

    await SUT.addCard()

    expect(SUT.change).toBeCalled()
  })
})

class SUT {
  public static readonly NAME: string = 'aName'
  public static move = move
  public static change = change
  public static id: string = 'an id'

  public static render() {
    this.doRender()
  }

  public static renderFilled() {
    this.doRender(new Cards([{ id: SUT.id, title: 'a Title' }]))
  }

  public static title() {
    return screen.getByRole('heading')
  }

  public static countCards(): number {
    return screen.queryAllByRole('card').length || 0
  }

  public static async addCard() {
    this.clickAdd()
    await this.typeOnPrompt('a card')
  }

  public static clickAdd() {
    const addCTA = screen.getByRole('button', { name: 'add card' })
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

  public static async typeOnPrompt(literal: string) {
    await act(async () => {
      const prompt = screen.queryByRole('textbox')
      await userEvent.type(prompt!, `${literal}{enter}`)
    })
  }


  private static doRender(content?: Cards) {
    this.mockContent(content)
    render(
      <WithKanban>
        <Column name={this.NAME}/>
      </WithKanban>
    )
  }

  private static mockContent(content?: Cards):void{
    const cards= content || new Cards()
    getColumn.mockReturnValue(cards)
  }

}