import { test } from '@playwright/test'
import { Eligibility } from '../constants/Eligibility'
import { JobSeekingStatus } from '../constants/JobSeekingStatus'
import { RoleLevel } from '../constants/RoleLevel'
import { RegisterPage } from '../pages/RegisterPage'
import { generateUniqueEmail, generateUniqueFullName, generateUniqueWhatsApp } from '../utils/dataGenerator'

test.describe('Register Page', { tag: ['@register', '@smoke', '@regression', '@critical'] }, () => {
  test('Register new Job-Seeker / Mentee', async ({ page }) => {
    const registerPage = new RegisterPage(page)

    const fullName = generateUniqueFullName()
    const whatsapp = generateUniqueWhatsApp()
    const email = generateUniqueEmail()
    const password = process.env.USER_PASSWORD_REGISTRATION || ''
    const campus = process.env.USER_CAMPUS_REGISTRATION || ''
    const company = process.env.USER_COMPANY_REGISTRATION || ''
    const role = process.env.USER_ROLE_REGISTRATION || ''
    const startDate = process.env.USER_START_DATE_REGISTRATION || ''

    await registerPage.goto('/mentoring')
    await registerPage.clickDaftarButton()
    await registerPage.clickSignUpWithEmailJobSeekerMenteeButton()
    await registerPage.fillFullName(fullName)
    await registerPage.selectJobSeekingStatus(JobSeekingStatus.ACTIVELY_LOOKING)
    await registerPage.register(whatsapp, email, campus, Eligibility.FRESHGRAD)
    await registerPage.clickSkipNowForUploadCVButton()
    await registerPage.currentAndPastExperience(company, RoleLevel.INTERN, role, startDate)
    await registerPage.skipForSpezialization()
    await registerPage.setPassword(password)
    await registerPage.assertRegistered()
  })
})
