const { NotImplementedError } = require('../extensions/index.js');

/**
 * In the popular Minesweeper game you have a board with some mines and those cells
 * that don't contain a mine have a number in it that indicates the total number of mines
 * in the neighboring cells. Starting off with some arrangement of mines
 * we want to create a Minesweeper game setup.
 *
 * @param {Array<Array>} matrix
 * @return {Array<Array>}
 *
 * @example
 * matrix = [
 *  [true, false, false],
 *  [false, true, false],
 *  [false, false, false]
 * ]
 *
 * The result should be following:
 * [
 *  [1, 2, 1],
 *  [2, 1, 1],
 *  [1, 1, 1]
 * ]
 */

function replaceWithNums(matrix) {
  const result = []
  for (let i = 0; i < matrix.length; i++) {
    const row = []
    result.push(row)
    for (let j = 0; j < matrix[i].length; j++) {
      row.push(0)
    }
  }
  return result
}

function minesweeper(matrix) {
  const result = replaceWithNums(matrix)
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === true) {
        console.log(i, j)
        if (result[i - 1] !== undefined) result[i - 1][j] += 1
        if (result[i + 1] !== undefined) result[i + 1][j] += 1

        if (result[i][j - 1] !== undefined) result[i][j - 1] += 1
        if (result[i][j + 1] !== undefined) result[i][j + 1] += 1

        if (result[i - 1] !== undefined && result[i - 1][j - 1] !== undefined) result[i - 1][j - 1] += 1
        if (result[i - 1] !== undefined && result[i - 1][j + 1] !== undefined) result[i - 1][j + 1] += 1
        if (result[i + 1] !== undefined && result[i + 1][j - 1] !== undefined) result[i + 1][j - 1] += 1
        if (result[i + 1] !== undefined && result[i + 1][j + 1] !== undefined) result[i + 1][j + 1] += 1
      }
    }
  } 
  return result
}

const matrix = [
  [true, false, false],
  [false, true, false],
  [false, false, false]
]

// console.log(replaceWithNums(matrix))
console.table(minesweeper(matrix))

module.exports = {
  minesweeper
};
