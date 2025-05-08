const path = require('path');

module.exports = () => {
  const projectName = path.basename(__dirname); // gets the current folder name
  return {
    name: projectName,
    displayName: projectName.charAt(0).toUpperCase() + projectName.slice(1)
  };
};