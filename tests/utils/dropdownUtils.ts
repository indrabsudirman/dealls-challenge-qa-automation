import { Locator, Page } from '@playwright/test'

/**
 * Select option in Ant Design searchable dropdown
 * by clicking the input, typing search text (optional),
 * then pressing ArrowDown multiple times and Enter.
 *
 * @param page Playwright Page instance
 * @param inputLocator Locator for the dropdown input (e.g. this.roleLevelInput)
 * @param optionText The option text you expect to select (for validation)
 * @param downPresses How many times to press ArrowDown
 */
export async function selectFromDropdownWithArrowDown(
  page: Page,
  inputLocator: Locator,
  optionText: string,
  downPresses: number
) {
  await inputLocator.click()

  for (let i = 0; i < downPresses; i++) {
    await page.keyboard.press('ArrowDown')
  }

  await page.keyboard.press('Enter')

  const selectedText = await page
    .locator('.ant-select')
    .filter({ has: inputLocator })
    .locator('.ant-select-selection-item')
    .textContent()

  if (!selectedText?.trim().includes(optionText.trim())) {
    throw new Error(`Expected to select "${optionText}", but got "${selectedText?.trim()}"`)
  }
}

/**
 * Select option in Ant Design dropdown by visible text.
 *
 * @param page Playwright Page instance
 * @param dropdownInput Locator for the dropdown input/button
 * @param optionText Visible text of the option you want to select
 */
export async function selectFromDropdownByText(page: Page, dropdownInput: Locator, optionText: string) {
  await dropdownInput.click()

  await page.waitForTimeout(300)

  await page.getByText(optionText, { exact: true }).click()
}
