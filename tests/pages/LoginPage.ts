import { Locator, Page, expect } from '@playwright/test'

export class LoginPage {
  readonly page: Page

  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly loginButton: Locator
  readonly signInButton: Locator

  constructor(page: Page) {
    this.page = page

    // Define all locators here
    this.usernameInput = page.locator('#basic_email')
    this.passwordInput = page.locator('#basic_password')
    this.loginButton = page.locator('#dealls-navbar-login-btn')
    this.signInButton = page.getByRole('button', { name: 'Sign In', exact: true })
  }

  async goto(url: string) {
    await this.page.goto(url)
  }

  async login(email: string, password: string) {
    await this.loginButton.click()
    await this.usernameInput.fill(email)
    await this.passwordInput.fill(password)
    await this.signInButton.click()
  }

  async assertLoggedIn(expectedName: string) {
    await this.page.waitForURL('**/mentoring')

    const greetingRegex = new RegExp(`Hi, ${expectedName}!`)
    await expect(this.page.getByText(greetingRegex)).toBeVisible()
  }
}
