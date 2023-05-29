import { expect, test } from '@playwright/test'
import Kanbang from './page/kanbang'


test.describe('in a Kanbang', () => {

  test('"n" triggers add card on todo', async ({ page }) => {    
    const kanbang = await Kanbang.go(page)
    kanbang.selectColumn('to-do')
    await page.getByRole('main').press('n')
    expect(page.getByRole('textbox',{name: 'new card'})).toBeVisible()
  })
})
