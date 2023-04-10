
import { render, screen,fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import Card from "../../src/components/kanban/column/card/Card"
import {act} from 'react-dom/test-utils'
import {vi, vitest} from 'vitest'

describe("Card", () => {
  it("display its title", async () => {
    SUT.render()
    expect(await SUT.getTitle()).toEqual(SUT.title)
  })

  it("prompts a title if no title", async () => {
    SUT.renderWithoutTitle()
    const aTitle:string = 'A title'
    await SUT.typeOnPrompt(aTitle)
    expect(await SUT.getTitle()).toEqual(aTitle)
  })

  it("signals to be moved", async () => {
    vi.restoreAllMocks()
    SUT.render()
    SUT.moveForward()
    expect(SUT.onMove).toBeCalledWith(SUT.id)
  })

  it("signals changes", async () => {
    vi.restoreAllMocks()
    const newTitle:string = 'new title' 
    SUT.renderWithoutTitle()
    await SUT.typeOnPrompt(newTitle)
    expect(SUT.onChange).toBeCalledWith(expect.any(String),newTitle)
  })
})

class SUT {
  static readonly title:string='a title'
  static readonly onMove = vi.fn()
  static readonly onChange = vi.fn()
  static readonly id = 'an id' 

  static render() {
    this.doRender(SUT.title)
  }

  static renderWithoutTitle() {
    this.doRender('')
  }

  private static doRender(title:string) {
    render(<Card 
      title={title} 
      id={SUT.id} 
      onMove={SUT.onMove}
      onChange={SUT.onChange}
    />)
  }

  public static async getTitle(){
    const title = await screen.findByRole('heading')
    return title.textContent
  }

  public static async typeOnPrompt(literal:string){
    await act(async ()=>{
      const prompt = screen.queryByRole('textbox')
      await userEvent.type(prompt!,`${literal}{enter}`)
    })
  }

  public static async moveForward(){
    fireEvent.click(screen.getByRole('button'))
  }

}