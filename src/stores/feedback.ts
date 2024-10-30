export const feedback = {
  message: '',
  type: '',

  // Set feedback message and type
  setFeedback(message: string, type: string) {
    this.message = message
    this.type = type === 'error' ? 'feedback-error' : 'feedback-success'

    setTimeout(() => {
      this.message = ''
      this.type = ''
    }, 3000)
  }
}
