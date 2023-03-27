
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
    const firstColumn = screen.getAllByRole('column')[0]
    const name = firstColumn.getAttribute('data-name')
    expect(name).toBe('to-do')
  })

  it.skip("second is called doing", async () => {
    SUT.render()
    const secondColumn = screen.getAllByRole('column')[1]
    const name = secondColumn.getAttribute('data-name')
    expect(name).toBe('doing')
  })
})

class SUT {
  static render() {
    render(<Kanban/>)
  }
}