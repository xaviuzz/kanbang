import { render, screen } from '@testing-library/react'
import React from 'react'
import Kanbang from '../../src/components/kanbang/Kanbang'

describe('default kanbang', () => {
  it('has three columns', async () => {
    SUT.render()
  
    expect(SUT.numberOfColumns()).toEqual(3)
  })

  it('first is called to-do', async () => {
    SUT.render()
    const name = SUT.getNameFromColumn(1)
    expect(name).toBe('to-do')
  })

  it('second is called doing', async () => {
    SUT.render()
    const name = SUT.getNameFromColumn(2)
    expect(name).toBe('doing')
  })

  it('third is called done', async () => {
    SUT.render()
    const name = SUT.getNameFromColumn(3)
    expect(name).toBe('done')
  })
})

class SUT {
  public static ROLE = 'region'

  static render() {
    render(<Kanbang />)
  }

  public static getNameFromColumn(position: number) {
    const column = screen.getAllByRole(this.ROLE)[position - 1]
    const name = column.getElementsByTagName('h1')[0].textContent
    return name
  }

  public static numberOfColumns():number{
    const columns = screen.getAllByRole(this.ROLE)
    return columns.length
  }
}