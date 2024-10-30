import Alpine from 'alpinejs'
import { passwordGenerator } from '../src/components/passwordGenerator'

// Mock Alpine.$persist
Alpine.$persist = (value: any) => value

jest.mock('alpinejs', () => ({
  store: jest.fn().mockReturnValue({
    setFeedback: jest.fn()
  })
}))

describe('passwordGenerator', () => {
  let passwordGeneratorInstance: ReturnType<typeof passwordGenerator>

  beforeEach(() => {
    passwordGeneratorInstance = passwordGenerator()
    passwordGeneratorInstance.init()
  })

  test('should initialize with default values', () => {
    expect(passwordGeneratorInstance.length).toBe(12)
    expect(passwordGeneratorInstance.includeUppercase).toBe(true)
    expect(passwordGeneratorInstance.includeDigits).toBe(true)
    expect(passwordGeneratorInstance.includeSymbols).toBe(true)
    expect(passwordGeneratorInstance.includeAmbiguous).toBe(true)
    expect(passwordGeneratorInstance.password).toBeDefined()
  })

  test('should generate a password of the correct length', () => {
    passwordGeneratorInstance.length = 16
    passwordGeneratorInstance.generatePassword()
    expect(passwordGeneratorInstance.password.length).toBe(16)
  })

  test('should generate a password with the correct character set', () => {
    passwordGeneratorInstance.includeUppercase = false
    passwordGeneratorInstance.includeDigits = false
    passwordGeneratorInstance.includeSymbols = false
    passwordGeneratorInstance.generatePassword()
    expect(/^[a-z]+$/.test(passwordGeneratorInstance.password)).toBe(true)
  })

  test('should exclude ambiguous characters if specified', () => {
    passwordGeneratorInstance.includeAmbiguous = false
    passwordGeneratorInstance.generatePassword()
    const ambiguous = '1Il|O0Z2'
    for (const char of passwordGeneratorInstance.password) {
      expect(ambiguous.includes(char)).toBe(false)
    }
  })

  test('should correctly assess password strength', () => {
    expect(passwordGeneratorInstance.getPasswordStrength('aB3!')).toBe(
      'Very Weak'
    )
    expect(passwordGeneratorInstance.getPasswordStrength('aB3!aB3!')).toBe(
      'Weak'
    )
    expect(passwordGeneratorInstance.getPasswordStrength('aB3!aB3!aB3!')).toBe(
      'Moderate'
    )
    expect(
      passwordGeneratorInstance.getPasswordStrength('aB3!aB3!aB3!aB3!')
    ).toBe('Strong')
    expect(
      passwordGeneratorInstance.getPasswordStrength('aB3!aB3!aB3!aB3!aB3!')
    ).toBe('Very Strong')
  })

  test('should copy password to clipboard', async () => {
    const mockWriteText = jest.fn().mockResolvedValue(undefined)
    Object.assign(navigator, {
      clipboard: {
        writeText: mockWriteText
      }
    })

    await passwordGeneratorInstance.copyToClipboard('testPassword')
    expect(mockWriteText).toHaveBeenCalledWith('testPassword')

    const feedbackInstance: any = Alpine.store('feedback')
    expect(feedbackInstance.setFeedback).toHaveBeenCalledWith(
      'Password copied to clipboard!',
      'success'
    )
  })
})
