import 'phosphor-icons'

import Alpine from 'alpinejs'
import { feedback } from './stores/feedback'
import { passwordGenerator } from './components/passwordGenerator'
import { passwordManager } from './components/passwordManager'
import persist from '@alpinejs/persist'

// Register Alpine plugins
Alpine.plugin(persist)

// Register Alpine stores
Alpine.store('feedback', feedback)

// Register Alpine components
Alpine.data('passwordGenerator', passwordGenerator)
Alpine.data('passwordManager', passwordManager)

// Extend the Window interface to include Alpine
declare global {
  interface Window {
    Alpine: typeof Alpine
  }
}

// Expose Alpine globally to avoid TypeScript errors and for console access
window.Alpine = Alpine

// Start Alpine.js
Alpine.start()
