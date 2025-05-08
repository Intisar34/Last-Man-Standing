module.exports = {
    preset: 'react-native',  
    transform: {
      "^.+\\.jsx?$": "babel-jest",  
      "^.+\\.tsx?$": "babel-jest",  
    },
    transformIgnorePatterns: [
      "/node_modules/(?!@react-native|some-other-package-to-transform)/", 
    ],
  };