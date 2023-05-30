import { render, screen } from '@testing-library/react'
import React from 'react'
import Controls from '../../src/components/kanbang/banner/controls/Controls'

describe('Controls', () => {

  it('has a button to export data', async () => {
    SUT.render()
    expect(screen.getByRole('menuitem',{name:'export'})).toBeInTheDocument()
  })

  it('has a button to import data', async () => {
    SUT.render()
    expect(screen.getByRole('menuitem',{name:'import'})).toBeInTheDocument()
  })
})

class SUT {

  static render() {
    render(<Controls/>)
  }

  
}