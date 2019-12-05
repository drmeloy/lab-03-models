const Model = require('../lib/Model');
const Schema = require('../lib/Schema');
const { writeJSON,
  mkdirp,
  readJSON,
  readDirectoryJSON,
  updateJSON,
  deleteFile
} = require('../lib/fs-functions');

jest.mock('../lib/fs-functions', () => ({
  mkdirp: jest.fn(),
  writeJSON: jest.fn(),
  readJSON: jest.fn(),
  readDirectoryJSON: jest.fn(),
  updateJSON: jest.fn(),
  deleteFile: jest.fn()
}));

jest.mock('uuid/v4', () => () => 'foo');

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

const MODEL_NAME = 'Dog';
const Dog = new Model(MODEL_NAME, dogSchema);
const ID = 'foo';
const ID_PATH = `./${MODEL_NAME}/foo`;

describe('Model', () => {
  it('creating new Model calls mkdirp', () => {
    expect(mkdirp).toHaveBeenLastCalledWith(`./${MODEL_NAME}`);
  });

  it('creating new file calls writeJSON', () => {
    Dog.create({ name: 'spot', age: 5, weight: '20 lbs' });
    expect(writeJSON).toHaveBeenLastCalledWith(ID_PATH, { name: 'spot', age: 5, weight: '20 lbs' });
  });

  it('findById method calls readJSON', async() => {
    await Dog.findById(ID);
    expect(readJSON).toHaveBeenLastCalledWith(ID_PATH);
  });

  it('find method calls readDirectoryJSON', () => {
    Dog.find();
    expect(readDirectoryJSON).toHaveBeenCalledTimes(1);
  });

  it('findByIdAndUpdate calls updateJSON', async() => {
    const toUpdate = { name: 'Taylor' };
    await Dog.findByIdAndUpdate(ID, toUpdate);
    expect(updateJSON).toHaveBeenLastCalledWith(ID_PATH, toUpdate);
  });

  it('findByIdAndDelete calls deleteFile', () => {
    Dog.findByIdAndDelete(ID);
    expect(deleteFile).toHaveBeenLastCalledWith(ID_PATH);
  });
});
