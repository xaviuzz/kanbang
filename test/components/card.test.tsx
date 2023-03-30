
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import Card from "../../src/components/kanban/column/card/Card"
import {act} from 'react-dom/test-utils'

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
})

class SUT {
  static readonly title:string='a title'
  
  static render() {
    render(<Card title={SUT.title}/>)
  }

  static renderWithoutTitle() {
    render(<Card title=''/>)
  }

  public static async getTitle(){
    const title = await screen.findByRole('card')
    return title.textContent
  }

  public static async typeOnPrompt(literal:string){
    await act(async ()=>{
      const prompt = screen.queryByRole('textbox')
      await userEvent.type(prompt!,`${literal}{enter}`)
    })
  }

}