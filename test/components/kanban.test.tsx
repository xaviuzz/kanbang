
import { render, screen } from "@testing-library/react"
import React from "react"
import Kanban from '../../src/components/kanban/Kanban'


describe("Kanban", () => {
  it("has three columns", async () => {
    SUT.render()
    const columns = screen.getAllByRole('column')
    expect(columns.length).toEqual(3)
  })

  it("first is called to-do", async () => {
    SUT.render()
    const name = SUT.getNameFromColumn(1)
    expect(name).toBe('to-do')
  })

  it("second is called doing", async () => {
    SUT.render()
    const name = SUT.getNameFromColumn(2)
    expect(name).toBe('doing')
  })

  it("third is called done", async () => {
    SUT.render()
    const name = SUT.getNameFromColumn(3)
    expect(name).toBe('done')
  })

})

class SUT {

  static render() {
    render(<Kanban/>)
  }

  public static getNameFromColumn(position:number){
    const ROLE = 'column'
    const column = screen.getAllByRole(ROLE)[position - 1]
    const name = column.getElementsByTagName('h1')[0].textContent
    return name
  }
}