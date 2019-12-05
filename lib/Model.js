const Validator = require('./Validator');
const uuid = require('uuid/v4');
const { mkdirp, 
  writeJSON,
  readJSON,
  readDirectoryJSON,
  updateJSON,
  deleteFile
} = require('../lib/fs-functions');

module.exports = class Model {
  constructor(modelType, schema){
    this.modelType = modelType;
    mkdirp(`./${modelType}`);
    this.filePath = `./${modelType}`;
    this.schema = schema;
    this.ids = [];
  }

  create(obj){
    const id = uuid();
    this.ids.push(id);
    writeJSON(`${this.filePath}/${id}`, obj);
  }

  async findById(id){
    return await readJSON(`${this.filePath}/${id}`);
  }

  async find(){
    return await readDirectoryJSON(this.filePath);
  }
};

// mkdirp - make a directory and all parent directories
// writeJSON - write an object to a file
// readJSON - read an object from a file
// readDirectoryJSON - read all files in a directory as objects
// updateJSON - update a files JSON
// deleteFile - delete a file

// create - mkdirp/writeJSON
// findById - readJSON
// find - readDirectoryJSON
// findByIdAndUpdate - 
// findByIdAndDelete - 

