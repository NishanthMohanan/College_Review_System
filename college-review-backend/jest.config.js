export default {
  testEnvironment: "node",
  transform: {}, 
  roots: ["<rootDir>/src/tests"],
  testMatch: ["**/src/tests/**/*.test.js"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  verbose: true,
};

