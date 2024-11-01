import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('I am on the password generator page', () => {
  cy.visit('http://localhost:3000')
  cy.get('body').then(($body) => {
    if ($body.find('[data-cy="generated-password"]').length) {
      cy.log('Product items are loaded')
    } else {
      cy.log('No product items found')
    }
  })
})

When('I change the length slider', () => {
  cy.get('[data-cy="slider-length"]').invoke('val', 16).trigger('input')
})

Then('I should see a generated password', () => {
  cy.get('[data-cy="generated-password"]').should(($input) => {
    expect($input.val()).to.not.be.empty
  })
})

When('I click the "Copy to Clipboard" button', () => {
  cy.get('[data-cy="copy-to-clipboard-button"]').click()
})

Then('I should see a success message {string}', (message) => {
  cy.get('[data-cy="feedback-message"]')
    .should('be.visible')
    .and('contain.text', message)
})

When('I check the "Include Uppercase" option', () => {
  cy.get('[data-cy="checkbox-uppercase"]').check().should('be.checked')
})

When('I check the "Include Digits" option', () => {
  cy.get('[data-cy="checkbox-numbers"]').check().should('be.checked')
})

When('I check the "Include Symbols" option', () => {
  cy.get('[data-cy="checkbox-symbols"]').check().should('be.checked')
})

When('I uncheck the "Include Uppercase" option', () => {
  cy.get('[data-cy="checkbox-uppercase"]').uncheck().should('not.be.checked')
})

When('I uncheck the "Include Digits" option', () => {
  cy.get('[data-cy="checkbox-numbers"]').uncheck().should('not.be.checked')
})

When('I uncheck the "Include Symbols" option', () => {
  cy.get('[data-cy="checkbox-symbols"]').uncheck().should('not.be.checked')
})

Then(
  'I should see a generated password containing only lowercase letters',
  () => {
    cy.get('[data-cy="generated-password"]').should(($input) => {
      expect($input.val()).to.match(/^[a-z]+$/)
    })
  }
)

Then(
  'I should see a generated password containing uppercase letters, digits, and symbols',
  () => {
    cy.get('[data-cy="generated-password"]').should(($input) => {
      expect($input.val()).to.match(/^[A-Za-z0-9!@#$%^&*()_+[\]{}|;:,.<>?]+$/)
    })
  }
)
