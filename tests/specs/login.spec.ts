import { test } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'

test.describe('Login Page', { tag: ['@login', '@smoke', '@regression', '@critical'] }, () => {
  test('should login successfully and redirect to mentoring', async ({ page }) => {
    const loginPage = new LoginPage(page)

    const email = process.env.USERNAME_LOGIN || ''
    const password = process.env.PASSWORD_LOGIN || ''
    const name = process.env.USER_FIRSTNAME_LOGIN || 'Indra'

    await loginPage.goto('/mentoring')
    await loginPage.login(email, password)
    await loginPage.assertLoggedIn(name)
  })
})
