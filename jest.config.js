// jest.config.js
module.exports = {
  verbose: true,
  // automock: true,
  testMatch: [
    "**/*.test.js",
    "**/*.test.jsx",
    "**/*.test.ts",
    "**/*.test.tsx"
  ],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!**/node_modules/**",
  ],
  setupFiles: ['./jest.setup.js', './dotenv.js']
};
