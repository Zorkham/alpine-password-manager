const { defineConfig } = require('cypress')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const {
  addCucumberPreprocessorPlugin
} = require('@badeball/cypress-cucumber-preprocessor')

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [
          require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin(
            config
          )
        ]
      })
      on('file:preprocessor', bundler)
      await addCucumberPreprocessorPlugin(on, config)
      return config
    },
    specPattern: 'cypress/e2e/features/**/*.feature',
    stepDefinitions: 'cypress/e2e/features/**/*.js',
    supportFile: 'cypress/support/e2e.js'
  }
})
