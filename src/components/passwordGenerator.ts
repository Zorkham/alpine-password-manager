import Alpine from 'alpinejs'

export const passwordGenerator = () => ({
  length: Alpine.$persist(12) as unknown as number,
  includeUppercase: Alpine.$persist(true) as unknown as boolean,
  includeDigits: Alpine.$persist(true) as unknown as boolean,
  includeSymbols: Alpine.$persist(true) as unknown as boolean,
  includeAmbiguous: Alpine.$persist(true) as unknown as boolean,
  password: '',

  // Initialize by generating a password automatically on page load
  init() {
    this.generatePassword()
  },

  // Generate a random password based on selected options
  generatePassword() {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const digit = '0123456789'
    const symbol = '!@#$%^&*()_+[]{}|;:,.<>?'
    const ambiguous = '1Il|O0Z2'

    // Build the character set based on user preferences
    let chars = lowercase
    if (this.includeUppercase) chars += uppercase
    if (this.includeDigits) chars += digit
    if (this.includeSymbols) chars += symbol
    if (!this.includeAmbiguous) {
      chars = chars
        .split('')
        .filter((char) => !ambiguous.includes(char))
        .join('')
    }

    // Create the password by randomly picking characters from the set
    let generatedPassword = ''
    for (let i = 0; i < this.length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length)
      generatedPassword += chars[randomIndex]
    }
    this.password = generatedPassword
  },

  // Get the strength of the password
  getPasswordStrength(password: string) {
    const hasLower = /[a-z]/.test(password)
    const hasUpper = /[A-Z]/.test(password)
    const hasDigit = /\d/.test(password)
    const hasSymbol = /[!@#$%^&*()_+[\]{}|;:,.<>?]/.test(password)

    const criteriaMet = [hasLower, hasUpper, hasDigit, hasSymbol].filter(
      Boolean
    ).length

    if (password.length >= 18 && criteriaMet > 3) return 'Very Strong'
    if (password.length >= 14 && criteriaMet > 2) return 'Strong'
    if (password.length >= 10 && criteriaMet > 1) return 'Moderate'
    if (password.length >= 6 && criteriaMet > 0) return 'Weak'
    return 'Very Weak'
  },

  // Copy the password to the clipboard
  copyToClipboard(password: string) {
    navigator.clipboard
      .writeText(password)
      .then(() => {
        const feedbackInstance: any = Alpine.store('feedback')
        feedbackInstance.setFeedback('Password copied to clipboard!', 'success')
      })
      .catch(() => {
        const feedbackInstance: any = Alpine.store('feedback')
        feedbackInstance.setFeedback('Failed to copy password.', 'error')
      })
  }
})
