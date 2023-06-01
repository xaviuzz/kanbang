import { expect, test } from '@playwright/test'
import Kanbang from './page/kanbang'

test.describe('in a Kanbang', () => {

  test('you can delete a card', async ({ page }) => {
    const column = 'to-do'
    const title = 'A new card'
    const kanbang = await Kanbang.go(page)
    await kanbang.addCardToColumn(title, column)
    
    await kanbang.deleteCard(title)
    
    expect(kanbang.getCardInColumn(title, column)).toBeHidden()
  })

})