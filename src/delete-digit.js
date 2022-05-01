const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
  const numbers = []
  let nStr = String(n)

  for (let i = 0; i < nStr.length; i++) {
    numbers.push(nStr.replace(nStr[i], ''))
  }

  return numbers.reduce((acc, cur) => +acc > +cur ? +acc : +cur)
}

module.exports = {
  deleteDigit
};
