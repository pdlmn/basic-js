const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
function encodeLine(str) {
  let result = ''
  for (let i = 0; i < str.length; i++) {
    let letterCount = 0
    while (str[i] === str[i + letterCount + 1]) {
      letterCount += 1
    }
    if (letterCount) {
      result += `${letterCount + 1}${str[i]}`
      i += letterCount
    } else {
      result += str[i]
    }
  }
  return result
}

module.exports = {
  encodeLine
};
