
import { render, screen } from "@testing-library/react"
import React from "react"
import Hello from "../../src/components/hello/Hello"


describe("Hello", () => {
  it("says hello", async () => {
    const literal = "HELLO"
    SUT.render()

    const greet = screen.getByText(literal)
    expect(greet).toBeInTheDocument()
  })
})

class SUT {
  static render() {
    render(<Hello/>)
  }
}
