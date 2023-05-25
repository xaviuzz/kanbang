import { expect, test } from '@playwright/test'
import Kanbang from './page/kanbang'

test.describe('in a Kanbang', () => {

  test('you can delete a card', async ({ page }) => {    
    const title='A new card'
    const kanbang = await Kanbang.go(page)
    kanbang.selectColumn('to-do')
    await kanbang.addCard(title)
    const card = kanbang.getCardByName(title)
    await card
      .getByRole('button',{name: 'delete'})
      .click()
    
    expect(kanbang.getCardByName(title)).toBeHidden()
  })

})