const fs = require('fs').promises;
const Model = require('../lib/Model');
const Schema = require('../lib/Schema');
const { writeJSON,
  mkdirp,
  readJSON
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

jest.mock('../lib/fs-functions', () => ({
  mkdirp: jest.fn(),
  writeJSON: jest.fn(),
  readJSON: jest.fn()
}));

jest.mock('uuid/v4', () => () => 'foo');

const MODEL_NAME = 'Dog';
const Dog = new Model(MODEL_NAME, dogSchema);

describe('Model', () => {
  it('should create a new type when instantiated with a type name and schema', () => {
    expect(mkdirp).toHaveBeenLastCalledWith(`./${MODEL_NAME}`);
  });

  it('should create a new type instance when model type uses create method', () => {
    Dog.create({ name: 'spot', age: 5, weight: '20 lbs' });
    expect(writeJSON).toHaveBeenLastCalledWith(`./${MODEL_NAME}/foo`, { name: 'spot', age: 5, weight: '20 lbs' });
  });

  it('should find a dog by its id', async() => {
    await Dog.findById('foo');
    expect(readJSON).toHaveBeenLastCalledWith(`./${MODEL_NAME}/foo`);
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
