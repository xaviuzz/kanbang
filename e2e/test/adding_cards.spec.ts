import { expect, test } from '@playwright/test'
import Kanbang from './page/kanbang'


test.describe('in a Kanbang', () => {

  test('you can add a card', async ({ page }) => {    
    const title='A new card'
    const kanbang = await Kanbang.go(page)
    kanbang.selectColumn('to-do')
    
    await kanbang.addCard(title)

    expect(kanbang.getCardByName(title)).toHaveText(title)
  })

  test('you can move a card forward', async ({ page }) => {    
    await page.goto('http://localhost:4000')
    const column = page.getByRole('region',{name: 'to-do'})
    await column.getByRole('menuitem',{name:'add card'}).click()
    const title = 'A new card'
    await column.getByRole('textbox').type(title)
    await column.press('Enter') 
    const card = column.getByRole('link', { name: title})
    await card.getByRole('button',{name: 'forward'}).click()

    const doing = page.getByRole('region',{name: 'doing'})
    const moved = doing.getByRole('link', { name: title})
    expect(moved).toHaveText(title)
  })

})
