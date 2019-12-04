const { isNumber,
  isString,
  isBoolean,
  isArray,
  isObject,
  isFunction,
  castToNumber,
  castToString,
  castToBoolean,
  castToArray } = require('./lib/types.js');

console.log(isNumber(3));
console.log(isString('3'));
console.log(isBoolean(false));
console.log(isArray([]));
console.log(isObject({}));
console.log(isFunction(() => {}));

console.log(castToNumber('4'));
console.log(castToString(4));
console.log(castToBoolean('4'));
console.log(castToArray('4', 4, [], {}));
