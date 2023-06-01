import { expect, test } from '@playwright/test'
import Kanbang from './page/kanbang'


test.describe('in a Kanbang', () => {

  test('you can move a card forward', async ({ page }) => {    
    const title='A new card'
    const kanbang = await Kanbang.go(page)
    kanbang.selectColumn('to-do')
    await kanbang.addCard(title)
    
    await kanbang
      .getCardByName(title)
      .getByRole('button',{name: 'forward'})
      .click()
    
    kanbang.selectColumn('doing')
    expect(kanbang.getCardByName(title)).toHaveText(title)
  })

  test('you can move a card backward', async ({ page }) => {    
    const title='A new card'
    const kanbang = await Kanbang.go(page)
    kanbang.selectColumn('doing')
    await kanbang.addCard(title)
    
    await kanbang
      .getCardByName(title)
      .getByRole('button',{name: 'backward'})
      .click()
    
    kanbang.selectColumn('to-do')
    expect(kanbang.getCardByName(title)).toHaveText(title)
  })

  test('you can select a card with a click', async ({ page }) => {    
    const title='A new card'
    const kanbang = await Kanbang.go(page)
    kanbang.selectColumn('to-do')
    await kanbang.addCard(title)
    
    await kanbang
      .getCardByName(title)
      .click()
    
    expect(kanbang.getCardByName(title)).toHaveClass(/selected/)
  })

})