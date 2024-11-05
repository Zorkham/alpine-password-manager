import Alpine from 'alpinejs'
import { passwordManager } from '../src/components/passwordManager'

// Mock Alpine.$persist
Alpine.$persist = (value: any) => value

jest.mock('alpinejs', () => ({
  store: jest.fn().mockReturnValue({
    setFeedback: jest.fn()
  })
}))

describe('passwordManager', () => {
  let passwordManagerInstance: ReturnType<typeof passwordManager>

  beforeEach(() => {
    passwordManagerInstance = passwordManager()
  })

  it('should initialize with default passwords', () => {
    expect(passwordManagerInstance.passwords).toHaveLength(2)
    expect(passwordManagerInstance.passwords[0].name).toBe('My First Password')
    expect(passwordManagerInstance.passwords[1].name).toBe('My Second Password')
  })

  it('should store a new password successfully', () => {
    passwordManagerInstance.newPasswordName = 'New Password'
    passwordManagerInstance.storePassword('newPassword123')

    expect(passwordManagerInstance.passwords).toHaveLength(3)
    expect(passwordManagerInstance.passwords[2].name).toBe('New Password')
    expect(passwordManagerInstance.passwords[2].password).toBe('newPassword123')
    expect(passwordManagerInstance.passwords[2].show).toBe(false)

    const feedbackInstance: any = Alpine.store('feedback')
    expect(feedbackInstance.setFeedback).toHaveBeenCalledWith(
      'Password stored successfully!',
      'success'
    )
  })

  it('should not store a password without a name', () => {
    passwordManagerInstance.newPasswordName = ''
    passwordManagerInstance.storePassword('newPassword123')

    expect(passwordManagerInstance.passwords).toHaveLength(2)
    const feedbackInstance: any = Alpine.store('feedback')
    expect(feedbackInstance.setFeedback).toHaveBeenCalledWith(
      'Please enter a password name.',
      'error'
    )
  })

  it('should not store a password with an existing name', () => {
    passwordManagerInstance.newPasswordName = 'My First Password'
    passwordManagerInstance.storePassword('newPassword123')

    expect(passwordManagerInstance.passwords).toHaveLength(2)

    const feedbackInstance: any = Alpine.store('feedback')
    expect(feedbackInstance.setFeedback).toHaveBeenCalledWith(
      'Password name already exists!',
      'error'
    )
  })

  it('should delete a password successfully', () => {
    passwordManagerInstance.deletePassword(0)

    expect(passwordManagerInstance.passwords).toHaveLength(1)
    expect(passwordManagerInstance.passwords[0].name).toBe('My Second Password')

    const feedbackInstance: any = Alpine.store('feedback')
    expect(feedbackInstance.setFeedback).toHaveBeenCalledWith(
      'Password deleted successfully!',
      'success'
    )
  })
})
