const fs = require('fs').promises;
const Model = require('../lib/Model');
const Schema = require('../lib/Schema');
const { mkdirp, 
  writeJSON,
  readJSON,
  readDirectoryJSON,
  updateJSON,
  deleteFile
} = require('../lib/fs-functions');

const dogSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  weight: {
    type: String
  }
});

jest.mock('fs', () => ({
  promises: {
    mkdir: jest.fn(() => Promise.resolve()),
    writeFile: jest.fn(() => Promise.resolve()),
    readFile: jest.fn(() => Promise.resolve(JSON.stringify({ name: 'Rover' }))),
    readdir: jest.fn(() => Promise.resolve(['./cool', './sure'])),
    unlink: jest.fn(() => Promise.resolve())
  }
}));

const Dog = new Model('Dog', dogSchema);

describe('Model', () => {
  it('should create a new type when instantiated with a type name and schema', () => {
    expect(fs.mkdir).toHaveBeenLastCalledWith('./Dog', { recursive: true });
  });

  it('should create a new type instance when model type uses create method', () => {
    Dog.create({ name: 'spot', age: 5, weight: '20 lbs' });
    expect(writeJSON).toHaveBeenCalledWith(expect.any(String), { name: 'spot', age: 5, weight: '20 lbs' });
  });
});

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
