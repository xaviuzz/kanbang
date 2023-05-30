import { expect, test } from '@playwright/test'
import Kanbang from './page/kanbang'

test.describe('in a Kanbang', () => {
  test('the url titles a document', async ({ page }) => {
    const name = 'Witness'
    const kanbang = await Kanbang.go(page, name)
    expect(kanbang.title()).toHaveText(name)
  })
})