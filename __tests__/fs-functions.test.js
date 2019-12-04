const fs = require('fs').promises;
const { mkdirp, 
  writeJSON,
  readJSON,
  readDirectoryJSON,
  updateJSON,
  deleteFile
} = require('../lib/fs-functions');

jest.mock('fs', () => ({
  promises: {
    mkdir: jest.fn(() => Promise.resolve()),
    writeFile: jest.fn(() => Promise.resolve()),
    readFile: jest.fn(() => Promise.resolve(JSON.stringify({ name: 'Rover' }))),
    readdir: jest.fn(() => Promise.resolve(['./cool', './sure'])),
    unlink: jest.fn(() => Promise.resolve())
  }
}));

describe('mkdirp', () => {
  it('should make a directory and all parent directories', () => { return mkdirp('./test/file/rad')
    .then(() => {
      expect(fs.mkdir).toHaveBeenLastCalledWith('./test/file/rad', { recursive: true });
    });
  });
});

describe('writeJSON', () => {
  const dog = {
    name: 'Rover',
    age: 200
  };

  it('should write an object to a file', () => {
    return writeJSON('./test/file/rad', dog)
      .then(() => {
        expect(fs.writeFile).toHaveBeenLastCalledWith('./test/file/rad', JSON.stringify(dog));
      });
  });
});

describe('readJSON', () => {
  it('should read an object from a file', () => {
    return readJSON('./test/my-dog')
      .then(dog => {
        expect(fs.readFile).toHaveBeenLastCalledWith('./test/my-dog', 'utf8');
        expect(dog).toEqual({ name: 'Rover' });
      });
  });
});

describe('readDirectoryJSON', () => {
  it('should read all files in a directory as objects', () => {
    return readDirectoryJSON('./cool')
      .then(fileContents => {
        expect(fs.readdir).toHaveBeenLastCalledWith('./cool');
        expect(fileContents).toEqual([{ name: 'Rover' }, { name: 'Rover' }]);
      });
  });
});

describe('updateJSON', () => {
  it('should update a file\'s JSON', () => {
    return updateJSON('./cool/my-dog', { age: 6 })
      .then(updatedObj => {
        expect(updatedObj).toEqual({ name: 'Rover', age: 6 });
      });
  });
  it('should update a file\'s JSON with multiple parameters', () => {
    return updateJSON('./cool/my-dog', { age: 6, hairy: 'very' })
      .then(updatedObj => {
        expect(updatedObj).toEqual({ name: 'Rover', age: 6, hairy: 'very' });
      });
  });
});

describe('deleteFile', () => {
  it('should delete a file', () => {
    return deleteFile('./cool')
      .then(() => {
        expect(fs.unlink).toHaveBeenLastCalledWith('./cool');
      });
  });
});
