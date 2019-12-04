const {
  isNumber,
  isString,
  isBoolean,
  isArray,
  isObject,
  isFunction,
  castToNumber,
  castToString,
  castToBoolean,
  castToArray,
  getCaster
} = require('../lib/types.js');

describe('validator module', () => {
  describe('type validation', () => {
    it('input is a number', () => {
      expect(isNumber(3)).toBeTruthy();
      expect(isNumber('hi')).toBeFalsy();
      expect(isNumber([])).toBeFalsy();
      expect(isNumber({})).toBeFalsy();
      expect(isNumber(() => {})).toBeFalsy();
      expect(isNumber(true)).toBeFalsy();
    });

    it('input is a string', () => {
      expect(isString('hi')).toBeTruthy();
      expect(isString(3)).toBeFalsy();
      expect(isString([])).toBeFalsy();
      expect(isString({})).toBeFalsy();
      expect(isString(() => {})).toBeFalsy();
      expect(isString(true)).toBeFalsy();
    });

    it('input is a boolean', () => {
      expect(isBoolean(true)).toBeTruthy();
      expect(isBoolean(false)).toBeTruthy();
      expect(isBoolean(3)).toBeFalsy();
      expect(isBoolean('3')).toBeFalsy();
      expect(isBoolean([])).toBeFalsy();
      expect(isBoolean({})).toBeFalsy();
      expect(isBoolean(() => {})).toBeFalsy();
    });

    it('input is an array', () => {
      expect(isArray([])).toBeTruthy();
      expect(isArray(true)).toBeFalsy();
      expect(isArray(false)).toBeFalsy();
      expect(isArray(3)).toBeFalsy();
      expect(isArray('3')).toBeFalsy();
      expect(isArray({})).toBeFalsy();
      expect(isArray(() => {})).toBeFalsy();
    });

    it('input is an object', () => {
      expect(isObject({})).toBeTruthy();
      expect(isObject([])).toBeFalsy();
      expect(isObject(true)).toBeFalsy();
      expect(isObject(false)).toBeFalsy();
      expect(isObject(3)).toBeFalsy();
      expect(isObject('3')).toBeFalsy();
      expect(isObject(() => {})).toBeFalsy();
    });

    it('input is a function', () => {
      expect(isFunction(() => {})).toBeTruthy();
      expect(isFunction({})).toBeFalsy();
      expect(isFunction([])).toBeFalsy();
      expect(isFunction(true)).toBeFalsy();
      expect(isFunction(false)).toBeFalsy();
      expect(isFunction(3)).toBeFalsy();
      expect(isFunction('3')).toBeFalsy();
    });
  });

  describe('casters', () => {
    it('can cast values to a number', () => {
      expect(castToNumber(3)).toEqual(3);
      expect(castToNumber('3')).toEqual(3);
      expect(castToNumber(true)).toEqual(1);
      expect(castToNumber(false)).toEqual(0);
    });

    it('throws if value is not castable to number', () => {
      expect(() => castToNumber('hi')).toThrowErrorMatchingSnapshot();
      expect(() => castToNumber({})).toThrowErrorMatchingSnapshot();
    });

    it('can cast values to a string', () => {
      expect(castToString(3)).toEqual('3');
      expect(castToString(3.33)).toEqual('3.33');
      expect(castToString(true)).toEqual('true');
      expect(castToString(false)).toEqual('false');
    });

    it('throws if value is not castable to string', () => {
      expect(() => castToString([])).toThrowErrorMatchingSnapshot();
      expect(() => castToString({})).toThrowErrorMatchingSnapshot();
    });

    it('can cast values to a boolean', () => {
      expect(castToBoolean(3)).toEqual(true);
      expect(castToBoolean(0)).toEqual(false);
      expect(castToBoolean('hi')).toEqual(true);
      expect(castToBoolean('')).toEqual(false);
      expect(castToBoolean(NaN)).toEqual(false);
      expect(castToBoolean(undefined)).toEqual(false);
      expect(castToBoolean(null)).toEqual(false);
      expect(castToBoolean([])).toEqual(true);
      expect(castToBoolean({})).toEqual(true);
    });

    it('can cast values to an array', () => {
      expect(castToArray(3)).toEqual([3]);
      expect(castToArray(3, 3)).toEqual([3, 3]);
      expect(castToArray('Jake')).toEqual(['Jake']);
      expect(castToArray('Jake', 'John')).toEqual(['Jake', 'John']);
      expect(castToArray(true)).toEqual([true]);
      expect(castToArray(true, false)).toEqual([true, false]);
      expect(castToArray([])).toEqual([[]]);
      expect(castToArray({})).toEqual([{}]);
      expect(castToArray(3, 'Jake', [], {})).toEqual([3, 'Jake', [], {}]);
    });
  });

  it('can get the right caster', () => {
    expect(getCaster(Number)).toEqual(castToNumber);
    expect(getCaster(String)).toEqual(castToString);
    expect(getCaster(Boolean)).toEqual(castToBoolean);
    expect(getCaster(Array)).toEqual(castToArray);
    expect(getCaster(Promise)).toBeNull();
  });
});
