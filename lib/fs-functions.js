const fs = require('fs').promises;

const mkdirp = (fileTree) => {
  return fs.mkdir(fileTree, { recursive: true });
};

const writeJSON = (location, obj) => {
  const strigifiedObj = JSON.stringify(obj);
  return fs.writeFile(location, strigifiedObj);
};

const readJSON = async(location) => {
  const fileContents = await fs.readFile(location, 'utf8');
  return JSON.parse(fileContents);
};

const readDirectoryJSON = async(directory) => {
  const files = await fs.readdir(directory);
  return Promise.all(files.map(file => readJSON(file)));
};

module.exports = { 
  mkdirp,
  writeJSON,
  readJSON,
  readDirectoryJSON
};
