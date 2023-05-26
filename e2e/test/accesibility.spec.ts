import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import Kanbang from './page/kanbang'

test.describe('In kanbang', () => {
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    const debugOn = false
    await Kanbang.go(page)
    const results = await new AxeBuilder({ page }).analyze()
    const violations = results.violations
    expect(violations).toHaveLength(0)
    if (debugOn) debug(violations)
  })

  const debug = (violations) => {
    console.log('\n')
    violations.map((violation) => {
      console.warn(violation.help, violation.nodes.length)
      violation.nodes.map((node)=>{
        console.log(node)
      })
    })
  }
})