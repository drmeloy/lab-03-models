// mkdirp - make a directory and all parent directories
// writeJSON - write an object to a file
// readJSON - read an object from a file
// readDirectoryJSON - read all files in a directory as objects
// updateJSON - update a files JSON
// deleteFile - delete a file

const fs = require('fs').promises;
const { mkdirp, writeJSON } = require('../lib/fs-functions');

jest.mock('fs', () => ({
  promises: {
    mkdir: jest.fn(() => Promise.resolve()),
    writeFile: jest.fn(() => Promise.resolve())
  }
}));

describe('mkdirp', () => {
  it('should make a directory and all parent directories', () => { return mkdirp('./test/file/rad')
    .then(() => {
      expect(fs.mkdir).toHaveBeenLastCalledWith('./test/file/rad', { recursive: true });
    });
  });

  it('should specify if file already exists', () => {

  });
});

describe('writeJSON', () => {
  const dog = {
    name: 'Rover',
    age: 200
  };

  it('should write an object to a file', () => {
    return writeJSON(dog, './test/file/rad')
      .then(() => {
        expect(fs.writeFile).toHaveBeenLastCalledWith(dog, './test/file/rad');
      });
  });

  if('should throw error if file does not exist', () => {
    
  })
});
