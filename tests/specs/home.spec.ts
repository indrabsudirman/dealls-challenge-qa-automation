import { test } from '@playwright/test'
import { HomePage } from '../pages/HomePage'

test.describe('Dealls Mentoring Page', { tag: ['@mentoring', '@smoke', '@regression', '@critical'] }, () => {
  test('should open Dealls mentoring page and check title', async ({ page, baseURL }) => {
    const homePage = new HomePage(page)

    await homePage.goto('/mentoring')
    await homePage.checkTitle()
  })
})
