import { expect, test } from '@playwright/test'
import Kanbang from './page/kanbang'


test.describe('in a Kanbang', () => {

  test('"n" triggers add card on todo', async ({ page }) => {    
    await Kanbang.go(page)
    const column = page.getByRole('region',{name: 'doing'})
    await column.hover()
    await page.getByRole('main').press('n')
    expect(column.getByRole('textbox',{name: 'new card'})).toBeVisible()
  })
})
