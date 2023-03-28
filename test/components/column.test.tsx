import { render, screen } from "@testing-library/react"
import React from "react"
import Column from '../../src/components/kanban/column/Column'


describe("Hello", () => {
  it("has a Title with its name", async () => {
    SUT.render()
    expect(SUT.title()).toHaveTextContent(SUT.NAME)
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
}