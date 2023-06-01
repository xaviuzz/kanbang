import { expect, test } from '@playwright/test'
import Kanbang from './page/kanbang'

test.describe('in a Kanbang', () => {

  test('you can import data', async ({ page }) => {
    const kanbang = await Kanbang.go(page)
    
    await kanbang.import('./test/fixture/kanbang.json')
    
    expect(kanbang.getCardInColumn('Import witness', 'to-do')).toBeVisible()
  })

  test('you can export your data', async ({ page }) => {
    const kanbang = await Kanbang.go(page)
    const columnName = 'to-do'
    const witness = 'Export witness'
    await kanbang.addCardToColumn(witness, columnName)
    
    const downloaded = await kanbang.export()
    
    expect(downloaded).toContain(witness)
  })
})
