import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { act } from "react-dom/test-utils"
import Column from '../../src/components/kanban/column/Column'
import {vi}from 'vitest'
import Cards from "../../src/domain/cards"

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

  it("signals card movement", async () => {
    SUT.renderFilled()
    await SUT.moveCardForward()
    expect(SUT.move).toBeCalledWith(SUT.id)
  })
})

class SUT {
  public static readonly NAME:string = 'aName'
  public static move = vi.fn()
  public static id:string = 'an id'
  public static render() {
    render(<Column 
      name={this.NAME}
      content ={new Cards()}
      onMove = {SUT.move}
    />)
  }

  public static renderFilled() {
    render(<Column 
      name={this.NAME}
      content ={new Cards([{id: SUT.id, title:'a Title'}])}
      onMove = {SUT.move}
    />)
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
  
  public static moveCardForward(){
    const addCTA = screen.getByText('>')
    fireEvent.click(addCTA)
  }

  private static async typeOnPrompt(literal:string){
    await act(async ()=>{
      const prompt = screen.queryByRole('textbox')
      await userEvent.type(prompt!,`${literal}{enter}`)
    })
  }
}