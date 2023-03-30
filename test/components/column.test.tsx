import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { act } from "react-dom/test-utils"
import Column from '../../src/components/kanban/column/Column'

describe("Column", () => {
  it("has a Title with its name", async () => {
    SUT.render()
    expect(SUT.title()).toHaveTextContent(SUT.NAME)
  })

  it("has a icon to add a card", async () => {
    SUT.render()
    expect(SUT.countCards()).toEqual(0)
    await SUT.addCard()
    expect(SUT.countCards()).toEqual(1)
  })
})

class SUT {
  public static readonly NAME:string = 'aName'
  
  public static render() {
    render(<Column name={this.NAME}/>)
  }

  public static title(){
    return screen.getByRole('heading')
  }

  public static countCards():number{
    return screen.queryAllByRole('card').length || 0
  }

  public static async addCard(){
    const addCTA = screen.getByText('+')
    fireEvent.click(addCTA)
    await this.typeOnPrompt('a card')
  }
  
  private static async typeOnPrompt(literal:string){
    await act(async ()=>{
      const prompt = screen.queryByRole('textbox')
      await userEvent.type(prompt!,`${literal}{enter}`)
    })
  }
}