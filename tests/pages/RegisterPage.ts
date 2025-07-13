import { Locator, Page, expect } from '@playwright/test'
import { Eligibility } from '../constants/Eligibility'
import { JobSeekingStatus } from '../constants/JobSeekingStatus'
import { RoleLevel } from '../constants/RoleLevel'
import { selectFromDropdownByText } from '../utils/dropdownUtils'
import { getEligibilityArrowDownCount } from '../utils/eligibilityMap'
import log from '../utils/logger'

export class RegisterPage {
  readonly page: Page

  readonly selanjutnyaButton: Locator
  readonly daftarButton: Locator
  readonly signUpWithEmailJobSeekerMenteeButton: Locator
  readonly fullNameInput: Locator
  readonly jobSeekingStatusInput: Locator
  readonly whatsappInput: Locator
  readonly emailInput: Locator
  readonly campusInput: Locator
  readonly eligibilityInput: Locator
  readonly skipNowForUploadCVButton: Locator
  readonly companyNameInput: Locator
  readonly roleLevelInput: Locator
  readonly roleNameInput: Locator
  readonly startDateInput: Locator
  readonly currentlyWorkingCheckbox: Locator
  readonly passwordInput: Locator
  readonly eyeIconPassword: Locator
  readonly passwordConfirmationInput: Locator
  readonly eyeIconPasswordConfirmation: Locator
  readonly checkPrivacyPolicy: Locator
  readonly finishButton: Locator
  readonly completeDataSuccessText: Locator
  readonly welcomeDeallsText: Locator

  constructor(page: Page) {
    this.page = page

    // Define all locators here
    this.selanjutnyaButton = this.page.getByRole('button', { name: 'Selanjutnya' })
    this.daftarButton = this.page.locator('#dealls-navbar-register-btn')
    this.signUpWithEmailJobSeekerMenteeButton = this.page.locator('a:has-text("Sign Up With Email")').first()
    this.fullNameInput = this.page.locator('#fullName')
    this.jobSeekingStatusInput = this.page.locator('.ant-select-selector').first()
    this.whatsappInput = this.page.locator('#whatsapp')
    this.emailInput = this.page.locator('#email')
    this.campusInput = this.page.locator('#campus')
    this.eligibilityInput = this.page.locator('#eligibility')
    this.skipNowForUploadCVButton = this.page.getByRole('button', { name: /Skip for now/ })
    this.companyNameInput = this.page.locator('#companyName')
    this.roleLevelInput = this.page.locator('#roleLevel')
    this.roleNameInput = this.page.locator('#roleName')
    this.startDateInput = this.page.locator('#startDate')
    this.currentlyWorkingCheckbox = this.page.locator('label.ant-checkbox-wrapper:has(input[type="checkbox"])')
    this.passwordInput = this.page.locator('#password')
    this.eyeIconPassword = this.page.locator('.ant-input-affix-wrapper:has(#password) .ant-input-password-icon')
    this.passwordConfirmationInput = this.page.locator('#passwordConfirmation')
    this.eyeIconPasswordConfirmation = this.page.locator(
      '.ant-input-affix-wrapper:has(#passwordConfirmation) .ant-input-password-icon'
    )
    this.checkPrivacyPolicy = this.page.locator('#checkPrivacyPolicy')
    this.finishButton = this.page.locator('#dealls-onboarding-finish')
    this.completeDataSuccessText = this.page.getByText('Complete data success!')
    this.welcomeDeallsText = this.page.getByRole('heading', { name: /Welcome to Dealls!/ })
  }

  get nextButton() {
    return this.selanjutnyaButton
  }

  async clickEnterInKeyboard() {
    await this.page.keyboard.press('Enter')
  }

  async goto(url: string) {
    await this.page.goto(url)
  }

  async clickDaftarButton() {
    await this.daftarButton.click()
  }

  async clickSignUpWithEmailJobSeekerMenteeButton() {
    await this.signUpWithEmailJobSeekerMenteeButton.click()
  }

  async fillFullName(fullName: string) {
    log.info(`📝 Input Full Name: ${fullName}`)
    await expect(this.fullNameInput).toBeVisible()
    await this.fullNameInput.fill(fullName)
    await this.nextButton.click()
  }

  async selectJobSeekingStatus(status: JobSeekingStatus) {
    await this.jobSeekingStatusInput.click()
    await this.page.getByText(status).click()
  }

  async register(whatsapp: string, email: string, campus: string, option: Eligibility) {
    log.info(`📝 Input Whatsapp: ${whatsapp}`)
    await expect(this.whatsappInput).toBeVisible()
    await this.whatsappInput.fill(whatsapp)

    log.info(`📧 Input Email: ${email}`)
    await expect(this.emailInput).toBeVisible()
    await this.emailInput.fill(email)

    await expect(this.page.locator('#campus')).toBeVisible()
    log.info(`📧 Input Campus: ${campus}`)
    await this.campusInput.fill(campus)
    await this.clickEnterInKeyboard()

    await this.eligibilityInput.click()

    const downPresses = getEligibilityArrowDownCount(option)
    if (downPresses === undefined) {
      throw new Error(`Unsupported Eligibility: ${option}`)
    }

    for (let i = 0; i < downPresses; i++) {
      await this.page.keyboard.press('ArrowDown')
    }
    await this.clickEnterInKeyboard()

    const selectedText = await this.page
      .locator('.ant-select')
      .filter({ has: this.eligibilityInput })
      .locator('.ant-select-selection-item')
      .textContent()

    log.info(`📝 Selected text: ${selectedText?.trim()}`)
    log.info(`✅ Option chosen: ${option.trim()}`)
    expect(selectedText?.trim()).toBe(option.trim())

    await this.nextButton.click()
  }

  async clickSkipNowForUploadCVButton() {
    await this.skipNowForUploadCVButton.click()
    await this.nextButton.click()
  }

  async currentAndPastExperience(company: string, level: RoleLevel, role: string, startDate: string) {
    await expect(this.companyNameInput).toBeVisible()
    await this.companyNameInput.fill(company)
    await this.clickEnterInKeyboard()

    await selectFromDropdownByText(this.page, this.roleLevelInput, level)

    const selectedLevel = await this.page
      .locator('.ant-select')
      .filter({ has: this.roleLevelInput })
      .locator('.ant-select-selection-item')
      .textContent()
    expect(selectedLevel?.trim()).toBe(level)

    await this.page.locator('.ant-select').filter({ has: this.roleNameInput }).click()
    await this.page.keyboard.type(role, { delay: 100 })
    await this.clickEnterInKeyboard()

    await expect(this.startDateInput).toBeVisible()
    await this.startDateInput.fill(startDate)
    await this.currentlyWorkingCheckbox.click()

    await this.nextButton.click()
  }

  async skipForSpezialization() {
    await expect(this.nextButton).toBeVisible({ timeout: 10_000 })
    await expect(this.nextButton).toBeEnabled({ timeout: 10_000 })

    await this.nextButton.click({ force: true })
  }

  async setPassword(password: string) {
    await expect(this.passwordInput).toBeVisible({ timeout: 20_000 })
    await this.passwordInput.fill(password)
    await this.eyeIconPassword.click()

    await expect(this.passwordConfirmationInput).toBeVisible()
    await this.passwordConfirmationInput.fill(password)
    await this.eyeIconPasswordConfirmation.click()

    await this.checkPrivacyPolicy.check()
    await this.finishButton.click()

    await expect(this.completeDataSuccessText).toBeVisible({ timeout: 10000 })
  }

  async assertRegistered() {
    await this.page.waitForLoadState('networkidle')
    await expect(this.welcomeDeallsText).toBeVisible({ timeout: 10000 })
    await expect(this.page).toHaveURL(/welcome=true/)
  }
}
