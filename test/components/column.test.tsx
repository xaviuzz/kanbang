import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { act } from "react-dom/test-utils"
import { vi } from 'vitest'
import Column from '../../src/components/kanban/column/Column'
import Cards from "../../src/domain/cards"

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

  it("signals card forward movement", async () => {
    vi.resetAllMocks()
    SUT.renderFilled()
    
    SUT.moveCardForward()
    
    expect(SUT.move).toBeCalledWith(SUT.id,'forward')
  })

  it("signals card backward movement", async () => {
    vi.resetAllMocks()
    SUT.renderFilled()
    
    SUT.moveCardBackward()
    
    expect(SUT.move).toBeCalledWith(SUT.id,'backward')
  })

  it("signals content changes", async () => {
    SUT.renderFilled()
    
    await SUT.addCard()
    
    expect(SUT.change).toBeCalled()
  })
})

class SUT {
  public static readonly NAME: string = 'aName'
  public static move = vi.fn()
  public static change = vi.fn()
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
    const addCTA = screen.getByText('+')
    fireEvent.click(addCTA)
    await this.typeOnPrompt('a card')
  }
  
  public static moveCardForward() {
    const moveCTA = screen.getByRole('button',{name : 'forward'})
    fireEvent.click(moveCTA)
  }

  public static moveCardBackward() {
    const moveCTA = screen.getByRole('button',{name : 'backward'})
    fireEvent.click(moveCTA)
  }
  
  private static async typeOnPrompt(literal: string) {
    await act(async () => {
      const prompt = screen.queryByRole('textbox')
      await userEvent.type(prompt!, `${literal}{enter}`)
    })
  
  }
  
  private static doRender(content?: Cards) {
    render(<Column
      name={this.NAME}
      content={content || new Cards()}
      onMove={SUT.move}
      onChange={SUT.change}
    />)
  }

}