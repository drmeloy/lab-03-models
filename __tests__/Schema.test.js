const Schema = require('../lib/Schema');

describe('Schema tests', () => {
  it('validates an object matching a schema', () => {
    const schema = new Schema({
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

    const cat = {
      name: 'Meowzors',
      age: 6,
      weight: '6 lbs'
    };

    expect(schema.validate(cat)).toEqual({
      name: 'Meowzors',
      age: 6,
      weight: '6 lbs'
    });

  });

  it('throws error on object not matching schema', () => {
    const schema = new Schema({
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

    const cat = {
      age: 'SUP?!',
      weight: 4
    };

    expect(() => schema.validate(cat)).toThrowErrorMatchingSnapshot();
  });

});
