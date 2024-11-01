import { feedback } from '../src/stores/feedback'

describe('feedback store', () => {
  jest.useFakeTimers()

  beforeEach(() => {
    feedback.message = ''
    feedback.type = ''
  })

  it('should set feedback message and type to success', () => {
    feedback.setFeedback('Operation successful', 'success')

    expect(feedback.message).toBe('Operation successful')
    expect(feedback.type).toBe('feedback-success')
  })

  it('should set feedback message and type to error', () => {
    feedback.setFeedback('Operation failed', 'error')

    expect(feedback.message).toBe('Operation failed')
    expect(feedback.type).toBe('feedback-error')
  })

  it('should clear feedback message and type after 3 seconds', () => {
    feedback.setFeedback('Operation successful', 'success')

    jest.advanceTimersByTime(3000)

    expect(feedback.message).toBe('')
    expect(feedback.type).toBe('')
  })
})
