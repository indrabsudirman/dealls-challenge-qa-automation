export function generateUniqueFullName() {
  const timestamp = Date.now()
  const name = process.env.USER_NAME_PREFIX_REGISTRATION
  return `${name} ${timestamp}`
}

export function generateUniqueWhatsApp() {
  const randomDigits = Math.floor(10000000000 + Math.random() * 90000000000)
  return `62${randomDigits}`.substring(0, 13)
}

export function generateUniqueEmail() {
  const timestamp = Date.now()
  const email = process.env.USER_EMAIL_PREFIX_REGISTRATION
  return `${email}_${timestamp}@dealls.com`
}
