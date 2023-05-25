import { expect, test } from '@playwright/test'
import Kanbang from './page/kanbang'


test.describe('in a Kanbang', () => {

  test('you can add a card', async ({ page }) => {    
    const title='A new card'
    const kanbang = await Kanbang.go(page)
    kanbang.selectColumn('to-do')>
    
    await kanbang.addCard(title)

    expect(kanbang.getCardByName(title)).toHaveText(title)
  })

  test('you cant an empty title card', async ({ page }) => {    
    const title=''
    const kanbang = await Kanbang.go(page)
    kanbang.selectColumn('to-do')>
    
    await kanbang.addCard(title)

    expect(kanbang.getCardByName(title)).toBeHidden()
  })

})
