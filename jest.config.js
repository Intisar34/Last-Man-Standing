module.exports = {
    preset: '@react-native-community/jest-preset',
    testEnvironment: 'node',
    testMatch: [
        "**/_test_/**/*.js",
        "**/?(*.)+(spec|test).js",
    ], 
    transform: {
      "^.+\\.jsx?$": "babel-jest",  
      "^.+\\.tsx?$": "babel-jest",  
    },
    transformIgnorePatterns: [
      "/node_modules/(?!@react-native|some-other-package-to-transform)/", 
    ],
  };