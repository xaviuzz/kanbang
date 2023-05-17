import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { vi } from 'vitest'
import Card from '../../src/components/kanbang/board/column/card/Card'

describe('Card', () => {
  it('display its title', async () => {
    SUT.render()

    const result = await SUT.getTitle()
    expect(result).toEqual(SUT.title)
  })

  it('prompts a title if no title', async () => {
    const aTitle = 'A title'
    SUT.renderWithoutTitle()

    await SUT.typeOnPrompt(aTitle)

    const result = await SUT.getTitle()
    expect(result).toEqual(aTitle)
  })

  it('submits on losing focus', async () => {
    const aTitle = 'A title'
    SUT.renderWithoutTitle()
    const noEnter = false

    await SUT.typeOnPrompt(aTitle, noEnter)
    await SUT.focusAway()

    const result = await SUT.getTitle()
    expect(result).toEqual(aTitle)
  })

  it('signals to be moved forward', async () => {
    vi.restoreAllMocks()
    SUT.render()

    SUT.moveForward()

    expect(SUT.onMove).toBeCalledWith('forward')
  })

  it('signals to be moved backward', async () => {
    vi.restoreAllMocks()
    SUT.render()

    SUT.moveBackward()

    expect(SUT.onMove).toBeCalledWith( 'backward')
  })

  it('signals to be removed', async () => {
    vi.restoreAllMocks()
    SUT.render()

    SUT.delete()

    expect(SUT.onDelete).toBeCalled()
  })

  it('signals changes', async () => {
    const newTitle = 'new title'
    vi.restoreAllMocks()
    SUT.renderWithoutTitle()

    await SUT.typeOnPrompt(newTitle)

    expect(SUT.onChange).toBeCalledWith(newTitle)
  })
})

class SUT {
  public static readonly title: string = 'a title'
  public static readonly onMove = vi.fn()
  public static readonly onChange = vi.fn()
  public static readonly onDelete = vi.fn()
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

  public static async typeOnPrompt(literal: string, submit = true) {
    await act(async () => {
      let characters: string = literal
      const prompt = screen.getByRole('textbox')
      if (submit) characters = `${literal}{enter}`
      await userEvent.type(prompt, characters)
    })
  }

  public static async focusAway() {
    fireEvent.blur(screen.getByRole('textbox'))
  }

  public static async moveForward() {
    fireEvent.click(screen.getByRole('button', { name: 'forward' }))
  }

  public static async moveBackward() {
    fireEvent.click(screen.getByRole('button', { name: 'backward' }))
  }

  public static async delete() {
    fireEvent.click(screen.getByRole('button', { name: 'delete' }))
  }

  private static doRender(title: string) {
    render(<Card
      title={title}
      id={SUT.id}
      onMove={SUT.onMove}
      onChange={SUT.onChange}
      onDelete={SUT.onDelete}
    />)
  }

}