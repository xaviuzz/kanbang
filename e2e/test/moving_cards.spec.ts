import { expect, test } from '@playwright/test'
import Kanbang from './page/kanbang'


test.describe('in a Kanbang', () => {

  test('you can move a card forward', async ({ page }) => {
    const column = 'to-do'
    const title = 'A new card'
    const kanbang = await Kanbang.go(page)
    await kanbang.addCardToColumn(title, column)
    await kanbang.moveCardForward(title)

    expect(kanbang.getCardInColumn(title, 'doing')).toHaveText(title)
  })

  test('you can move a card backward', async ({ page }) => {
    const column = 'doing'
    const title = 'A new card'
    const kanbang = await Kanbang.go(page)
    await kanbang.addCardToColumn(title, column)
    
    await kanbang.moveCardBackward(title)

    expect(kanbang.getCardInColumn(title, 'to-do')).toHaveText(title)
  })

  test('you can select a card with a click', async ({ page }) => {
    const column = 'to-do'
    const title = 'A new card'
    const kanbang = await Kanbang.go(page)
    await kanbang.addCardToColumn(title, column)

    const card = kanbang.getCardInColumn(title, column)
    await card.click()

    expect(card).toHaveClass(/selected/)
  })

})