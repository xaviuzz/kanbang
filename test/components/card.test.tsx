
import { render, screen,fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import Card from "../../src/components/kanban/column/card/Card"
import {act} from 'react-dom/test-utils'
import {vi} from 'vitest'

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
    SUT.render()
    SUT.moveForward()
    expect(SUT.onMove).toBeCalledWith(SUT.id)
  })
})

class SUT {
  static readonly title:string='a title'
  static readonly onMove = vi.fn()
  static readonly id = 'an id' 

  static render() {
    render(<Card 
      title={SUT.title} 
      id={SUT.id} 
      onMove={SUT.onMove}
    />)
  }

  static renderWithoutTitle() {
    render(<Card 
      title='' 
      id={SUT.id} 
      onMove={SUT.onMove}
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