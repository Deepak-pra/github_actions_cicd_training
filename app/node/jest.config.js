/** @type {import("jest").Config} */
module.exports = {
  testEnvironment: "node",

  roots: [
    "<rootDir>/src",
    "<rootDir>/__tests__",
  ],

  testMatch: [
    "**/__tests__/**/*.test.js",
  ],

  collectCoverageFrom: [
    "src/**/*.js",
    "!src/**/*.test.js",
  ],

  coverageDirectory: "coverage",

  coverageReporters: [
    "text",
    "text-summary",
    "lcov",
    "html",
  ],

  clearMocks: true,

  verbose: true,

  passWithNoTests: false,
};