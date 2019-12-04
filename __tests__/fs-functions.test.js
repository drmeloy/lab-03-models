// mkdirp - make a directory and all parent directories
// writeJSON - write an object to a file
// readJSON - read an object from a file
// readDirectoryJSON - read all files in a directory as objects
// updateJSON - update a files JSON
// deleteFile - delete a file

const js = require('js').promises;
const { mkdirp } = require('../lib/fs-functions');

jest.mock('js', () => ({
  promises: {
    
  }
}));

describe('mkdirp', () => {
  it('should make a directory and all parent directories', () => {

  });
});
