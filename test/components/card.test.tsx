import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { act } from 'react-dom/test-utils'
import { vi } from 'vitest'
import Card from "../../src/components/kanbang/board/column/card/Card"

describe("Card", () => {
  it("display its title", async () => {
    SUT.render()

    const result = await SUT.getTitle()
    expect(result).toEqual(SUT.title)
  })

  it("prompts a title if no title", async () => {
    const aTitle: string = 'A title'
    SUT.renderWithoutTitle()

    await SUT.typeOnPrompt(aTitle)

    const result = await SUT.getTitle()
    expect(result).toEqual(aTitle)
  })

  it("signals to be moved forward", async () => {
    vi.restoreAllMocks()
    SUT.render()

    SUT.moveForward()

    expect(SUT.onMove).toBeCalledWith(SUT.id,'forward')
  })

  it("signals to be moved backward", async () => {
    vi.restoreAllMocks()
    SUT.render()

    SUT.moveBackward()

    expect(SUT.onMove).toBeCalledWith(SUT.id,'backward')
  })

  it("signals changes", async () => {
    const newTitle: string = 'new title'
    vi.restoreAllMocks()
    SUT.renderWithoutTitle()

    await SUT.typeOnPrompt(newTitle)

    expect(SUT.onChange).toBeCalledWith(expect.any(String), newTitle)
  })
})

class SUT {
  public static readonly title: string = 'a title'
  public static readonly onMove = vi.fn()
  public static readonly onChange = vi.fn()
  public static readonly id = 'an id'

  public static render() {
    this.doRender(SUT.title)
  }

  public static renderWithoutTitle() {
    this.doRender('')
  }
  
  public static async getTitle() {
    const title = await screen.findByRole('heading')
    return title.textContent
  }

  public static async typeOnPrompt(literal: string) {
    await act(async () => {
      const prompt = screen.queryByRole('textbox')
      await userEvent.type(prompt!, `${literal}{enter}`)
    })
  }

  public static async moveForward() {
    fireEvent.click(screen.getByRole('button',{name: 'forward'}))
  }

  public static async moveBackward() {
    fireEvent.click(screen.getByRole('button',{name: 'backward'}))
  }

  private static doRender(title: string) {
    render(<Card
      title={title}
      id={SUT.id}
      onMove={SUT.onMove}
      onChange={SUT.onChange}
    />)
  }

}