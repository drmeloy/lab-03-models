const fs = require('fs').promises;

const mkdirp = (fileTree) => {
  return fs.mkdir(fileTree, { recursive: true });
};

const writeJSON = (obj, location) => {
  
  return fs.writeFile(obj, location);
};

module.exports = { 
  mkdirp,
  writeJSON
};
