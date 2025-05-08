module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  testMatch: [
    "**/__tests__/**/*.js",
    "**/?(*.)+(spec|test).js",
  ],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.tsx?$": "babel-jest"
  },
  transformIgnorePatterns: [
    "/node_modules/(?!@react-native|react-native|react-navigation)/",
  ],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"]
};
