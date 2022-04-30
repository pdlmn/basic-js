const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
  if (!Array.isArray(arr)) throw new Error("'arr' parameter must be an instance of the Array!")
  const newArr = [...arr]

  const double = which => (i, prevDeleted) => {
    let item
    which === 'next'
      ? i >= newArr.length - 1
        ? newArr.splice(i, 1)
        : newArr.splice(i, 1, newArr[i + 1])
      : i - 1 >= 0 && !prevDeleted
        ? newArr.splice(i, 1, newArr[i - 1])
        : newArr.splice(i, 1)
    return newArr
  }

  const discard = which => (i, prevDeleted) => {
    which === 'next'
      ? newArr.splice(i, 2)
      : i - 1 >= 0 && !prevDeleted
        ? newArr.splice(i - 1, 2)
        : newArr.splice(i, 1) 
    return newArr
  }
  
  const operations = {
    '--double-next': double('next'),
    '--double-prev': double('prev'),
    '--discard-next': discard('next'),
    '--discard-prev': discard('prev')
  }

  let deleted = []
  for (let i = 0; i < newArr.length; i++) {
    if (Object.keys(operations).includes(newArr[i])) {
      const operation = newArr[i]
      if (operation === '--discard-next') {
        deleted.push(i)
      }
      let prevDeleted = deleted.includes(i) && operation.includes('prev')
      operations[operation](i, prevDeleted)
      i--
    }
  }
  return newArr
}

module.exports = {
  transform
};
