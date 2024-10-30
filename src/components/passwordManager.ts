import Alpine from 'alpinejs'
import { Password } from '../config/password'

export const passwordManager = () => ({
  passwords: Alpine.$persist([
    {
      name: 'My First Password',
      password: 'Tn|zWq|P@pKx8MQgVN',
      show: false
    },
    {
      name: 'My Second Password',
      password: 'x&Y.Ri6p*:R2)ILx?|R0*_',
      show: true
    }
  ]) as unknown as Password[],
  maxPasswords: 3,
  newPasswordName: '',

  // Store the new password
  storePassword(password: string) {
    if (this.newPasswordName.trim() === '') {
      const feedbackInstance: any = Alpine.store('feedback')
      feedbackInstance.setFeedback('Please enter a password name.', 'error')
      return
    }

    const existingPassword = this.passwords.find(
      (item) => item.name === this.newPasswordName
    )
    if (existingPassword) {
      const feedbackInstance: any = Alpine.store('feedback')
      feedbackInstance.setFeedback('Password name already exists!', 'error')
      return
    }

    this.passwords.push({
      name: this.newPasswordName,
      password,
      show: false
    })
    this.newPasswordName = ''
    const feedbackInstance: any = Alpine.store('feedback')
    feedbackInstance.setFeedback('Password stored successfully!', 'success')
  },

  // Delete a stored password
  deletePassword(index: number) {
    this.passwords.splice(index, 1)
    const feedbackInstance: any = Alpine.store('feedback')
    feedbackInstance.setFeedback('Password deleted successfully!', 'success')
  }
})
