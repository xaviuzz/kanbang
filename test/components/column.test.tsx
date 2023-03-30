import { fireEvent, render, screen } from "@testing-library/react"
import React from "react"
import Column from '../../src/components/kanban/column/Column'

describe("Hello", () => {
  it("has a Title with its name", async () => {
    SUT.render()
    expect(SUT.title()).toHaveTextContent(SUT.NAME)
  })

  it("has a icon to add a card", async () => {
    SUT.render()
    expect(SUT.countCards()).toEqual(0)
    SUT.addCard()
    expect(SUT.countCards()).toEqual(1)
  })
})

class SUT {
  static readonly NAME:string = 'aName'
  static render() {
    render(<Column name={this.NAME}/>)
  }

  static title(){
    return screen.getByRole('heading')
  }

  static countCards():number{
    return screen.queryAllByRole('card').length || 0
  }

  static addCard(){
    const addCTA = screen.getByText('+')
    fireEvent.click(addCTA)
  }
}