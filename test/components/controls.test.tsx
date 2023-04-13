import { render, screen } from "@testing-library/react"
import React from "react"
import Kanban from "../../src/domain/kanban"
import Controls from '../../src/components/kanbang/controls/Controls'

describe("Controls", () => {

  it("has a button to export data", async () => {
    SUT.render()
    expect(screen.getByRole('button',{name:'export'})).toBeInTheDocument()
  })

  it("has a button to import data", async () => {
    SUT.render()
    expect(screen.getByRole('button',{name:'import'})).toBeInTheDocument()
  })
})

class SUT {

  static render() {
    render(<Controls kanban={new Kanban()} onLoad={()=>{}}/>)
  }

  
}