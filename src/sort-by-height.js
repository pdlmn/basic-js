const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given an array with heights, sort them except if the value is -1.
 *
 * @param {Array} arr
 * @return {Array}
 *
 * @example
 * arr = [-1, 150, 190, 170, -1, -1, 160, 180]
 *
 * The result should be [-1, 150, 160, 170, -1, -1, 180, 190]
 */
function sortByHeight(arr) {
  const noNegatives = arr.filter(n => n !== -1).sort((a, b) => a - b)
  let j = 0
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === -1) {
      continue
    } else {
      arr[i] = noNegatives[j++]
    }
  }
  return arr
}

sortByHeight([4, 2, 9, 11, 2, 16])

module.exports = {
  sortByHeight
};
