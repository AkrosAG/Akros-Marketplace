// jest.config.js (javascript file)
module.exports = {
  preset: 'jest-preset-angular',
  testPathIgnorePatterns: ['<rootDir>/cypress/', '<rootDir>/webcomponents/', ".js"],
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
