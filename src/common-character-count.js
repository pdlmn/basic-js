const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given two strings, find the number of common characters between them.
 *
 * @param {String} s1
 * @param {String} s2
 * @return {Number}
 *
 * @example
 * For s1 = "aabcc" and s2 = "adcaa", the output should be 3
 * Strings have 3 common characters - 2 "a"s and 1 "c".
 */
function getCommonCharacterCount(s1, s2) {
  const countLetters = str => str.split('').reduce((acc, cur) => {
    acc[cur]
      ? acc[cur] += 1
      : acc[cur] = 1
    return acc
  }
  , {})
  const l1 = countLetters(s1)
  const l2 = countLetters(s2)

  let common = 0
  for (let letter of Object.keys(l1)) {
    if (l1[letter] && l2[letter]) {
      common += Math.min(l1[letter], l2[letter])
    }
  }
  return common
}

module.exports = {
  getCommonCharacterCount
};
