const Validator = require('../lib/Validator');

describe('Age validator', () => {
  let validator;

  describe('when field is required', () => {
    beforeAll(() => {
      validator = new Validator('age', {
        type: Number,
        required: true
      });
    });

    it('returns the field\'s value', () => {
      const cat = {
        name: 'Meowzors',
        age: 7,
        weight: '6 lbs'
      };

      expect(validator.validate(cat)).toEqual(7);
    });

    it('returns the field\'s value cast to proper type', () => {
      const cat = {
        name: 'Meowzors',
        age: '8',
        weight: '6 lbs'
      };

      expect(validator.validate(cat)).toEqual(8);
    });

    it('returns that the field is required if no value given', () => {
      const cat = {
        name: 'Meowzors',
        weight: '6 lbs'
      };

      expect(() => validator.validate(cat)).toThrowErrorMatchingSnapshot();
    });
  });

  describe('when field is not required', () => {
    beforeAll(() => {
      validator = new Validator('age', {
        type: Number
      });
    });

    it('returns the field when given a value', () => {
      const cat = {
        name: 'Meowzors',
        age: 6,
        weight: '6 lbs'
      };

      expect(validator.validate(cat)).toEqual(6);
    });

    it('returns the field cast to proper type', () => {
      const cat = {
        name: 'Meowzors',
        age: '6',
        weight: '6 lbs'
      };

      expect(validator.validate(cat)).toEqual(6);
    });

    it('returns null when field is given no value', () => {
      const cat = {
        name: 'Meowzors',
        weight: '6 lbs'
      };

      expect(validator.validate(cat)).toBeNull();
    });

  });  
});

describe('Name validator', () => {
  let validator;

  describe('when field is required', () => {
    beforeAll(() => {
      validator = new Validator('name', {
        type: String,
        required: true
      });
    });

    it('returns the field\'s value', () => {
      const cat = {
        name: 'Meowzors',
        age: 7,
        weight: '6 lbs'
      };

      expect(validator.validate(cat)).toEqual('Meowzors');
    });

    it('returns the field\'s value cast to proper type', () => {
      const cat = {
        name: 88,
        age: 8,
        weight: '6 lbs'
      };

      expect(validator.validate(cat)).toEqual('88');
    });

    it('returns that the field is required if no value given', () => {
      const cat = {
        age: 8,
        weight: '6 lbs'
      };

      expect(() => validator.validate(cat)).toThrowErrorMatchingSnapshot();
    });
  });

  describe('when field is not required', () => {
    beforeAll(() => {
      validator = new Validator('name', {
        type: String
      });
    });

    it('returns the field when given a value', () => {
      const cat = {
        name: 'Meowzors',
        age: 6,
        weight: '6 lbs'
      };

      expect(validator.validate(cat)).toEqual('Meowzors');
    });

    it('returns the field cast to proper type', () => {
      const cat = {
        name: 88,
        age: 6,
        weight: '6 lbs'
      };

      expect(validator.validate(cat)).toEqual('88');
    });

    it('returns null when field is given no value', () => {
      const cat = {
        age: 6,
        weight: '6 lbs'
      };

      expect(validator.validate(cat)).toBeNull();
    });

  });  
});
