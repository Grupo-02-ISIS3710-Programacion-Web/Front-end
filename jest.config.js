const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },

 
  transformIgnorePatterns: [
    "/node_modules/(?!(next-intl)/)"
  ],
};

module.exports = createJestConfig(customJestConfig);