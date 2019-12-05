const fs = require('fs').promises;

const mkdirp = path => fs.mkdir(path, { recursive: true });

const writeJSON = (location, obj) => {
  return fs.writeFile(location, JSON.stringify(obj));
};

const readJSON = async(location) => {
  const fileContents = await fs.readFile(location, 'utf8');
  return JSON.parse(fileContents);
};

const readDirectoryJSON = async(directory) => {
  const files = await fs.readdir(directory);
  return Promise.all(files.map(file => readJSON(`${directory}/${file}`)));
};

const updateJSON = async(location, obj) => {
  const fileContents = await readJSON(location);
  const entries = Object.entries(obj);
  for(let i = 0; i < entries.length; i++){
    fileContents[entries[i][0]] = entries[i][1];
  }
  await writeJSON(location, fileContents);
  return fileContents;
};

const deleteFile = (location) => {
  return fs.unlink(location);
};

module.exports = { 
  mkdirp,
  writeJSON,
  readJSON,
  readDirectoryJSON,
  updateJSON,
  deleteFile
};
