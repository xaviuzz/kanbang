import { expect, test } from '@playwright/test'


test.describe('in a Kanbang', () => {

  test('you can add a card', async ({ page }) => {    
    await page.goto('http://localhost:4000')
    
    await expect(false).toBeFalsy()
  })

})
