module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
  collectCoverage: true,
  coverageProvider: 'v8',
  coverageReporters: ['html', 'text'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{js,ts,jsx,tsx}',
    '!src/config/**/*',
    '!src/**/*.d.ts'
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
}
