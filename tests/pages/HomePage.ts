import { Page, expect } from '@playwright/test'

export class HomePage {
  readonly page: Page

  readonly expectedTitle: string = 'Tingkatkan Karirmu Bersama Career Mentor Terpercaya Gratis'

  constructor(page: Page) {
    this.page = page
  }

  async goto(baseURL: string) {
    await this.page.goto(baseURL)
  }

  async checkTitle() {
    await expect(this.page).toHaveTitle(this.expectedTitle)
  }
}
