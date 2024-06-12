module.exports = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  moduleFileExtensions: [
    "js",
    "mjs",
    "cjs",
    "ts",
    "json",
    "node"
  ],
  collectCoverageFrom: [
    "src/**/*.{js,ts}",
  ],
  coveragePathIgnorePatterns: [
    ".index.ts",
    ".types.ts"
],
  roots: [
    "<rootDir>/src"
  ],
};
