/** @type {import("jest").Config} */
module.exports = {
  rootDir: __dirname,

  testEnvironment: "node",

  testMatch: [
    "<rootDir>/__tests__/**/*.test.js"
  ],

  collectCoverageFrom: [
    "<rootDir>/src/**/*.js",
    "!<rootDir>/src/server.js"
  ],

  coverageDirectory: "<rootDir>/coverage",

  coverageReporters: [
    "text",
    "text-summary",
    "lcov",
    "html"
  ],

  clearMocks: true,

  verbose: true,

  passWithNoTests: false,

  testTimeout: 10000
};