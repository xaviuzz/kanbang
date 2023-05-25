import { expect, test } from '@playwright/test'
import Kanbang from './page/kanbang'

test.describe('in a Kanbang', () => {
  test('you can import data', async ({ page }) => {
    const kanbang = await Kanbang.go(page)
    await kanbang.import('./test/fixture/kanbang.json')
    kanbang.selectColumn('to-do')
    expect(kanbang.getCardByName('Import witness')).toBeVisible()
  })

  test('you can export your data', async ({ page }) => {
    const kanbang = await Kanbang.go(page)
    kanbang.selectColumn('to-do')
    const witness = 'Export witness'
    await kanbang.addCard(witness)
    const downloaded= await kanbang.export()
    expect(downloaded).toContain(witness)
  })
})
