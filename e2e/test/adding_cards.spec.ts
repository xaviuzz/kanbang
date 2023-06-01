import { expect, test } from '@playwright/test'
import Kanbang from './page/kanbang'


test.describe('in a Kanbang', () => {

  test('you can add a card', async ({ page }) => {
    const title = 'A new card'
    const columnName = 'to-do'
    const kanbang = await Kanbang.go(page)

    await kanbang.addCardToColumn(title, columnName)

    expect(kanbang.getCardInColumn(title, columnName)).toHaveText(title)
  })

  test('you cant add an empty title card', async ({ page }) => {
    const title = ''
    const columnName = 'to-do'
    const kanbang = await Kanbang.go(page)

    await kanbang.addCardToColumn(title, columnName)

    expect(kanbang.getCardInColumn(title, columnName)).toBeHidden()
  })

  test('you cant stop editing with esc', async ({ page }) => {
    const title = 'A new card'
    const columnName = 'to-do'
    const kanbang = await Kanbang.go(page)

    await kanbang.addAndEsc(title, columnName)

    expect(kanbang.getCardInColumn(title, columnName)).toBeHidden()
  })
})
