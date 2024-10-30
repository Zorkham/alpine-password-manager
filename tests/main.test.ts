import Alpine from 'alpinejs'
import persist from '@alpinejs/persist'
import { passwordGenerator } from '../src/components/passwordGenerator'
import { passwordManager } from '../src/components/passwordManager'
import { feedback } from '../src/stores/feedback'

// Mock the components
jest.mock('../src/components/passwordGenerator')
jest.mock('../src/components/passwordManager')
jest.mock('alpinejs', () => ({
  store: jest.fn()
}))

describe('Alpine.js initialization', () => {
  beforeAll(() => {
    // Mock the Alpine.js plugin and data methods
    Alpine.plugin = jest.fn()
    Alpine.data = jest.fn()
    Alpine.start = jest.fn()
  })

  it('should register the persist plugin', () => {
    require('../src/main')
    expect(Alpine.plugin).toHaveBeenCalledWith(persist)
  })

  it('should register the passwordGenerator component', () => {
    require('../src/main')
    expect(Alpine.data).toHaveBeenCalledWith(
      'passwordGenerator',
      passwordGenerator
    )
  })

  it('should register the feedback store', () => {
    require('../src/main')
    expect(Alpine.store).toHaveBeenCalledWith('feedback', feedback)
  })

  it('should register the passwordManager component', () => {
    require('../src/main')
    expect(Alpine.data).toHaveBeenCalledWith('passwordManager', passwordManager)
  })

  it('should expose Alpine globally', () => {
    require('../src/main')
    expect(window.Alpine).toBe(Alpine)
  })

  it('should start Alpine.js', () => {
    require('../src/main')
    expect(Alpine.start).toHaveBeenCalled()
  })
})
