const { NotImplementedError } = require('../extensions/index.js');

/**
 * There's a list of file, since two files cannot have equal names,
 * the one which comes later will have a suffix (k),
 * where k is the smallest integer such that the found name is not used yet.
 *
 * Return an array of names that will be given to the files.
 *
 * @param {Array} names
 * @return {Array}
 *
 * @example
 * For input ["file", "file", "image", "file(1)", "file"],
 * the output should be ["file", "file(1)", "image", "file(1)(1)", "file(2)"]
 *
 */
function renameFiles(names) {
  const result = []
  const nameTracker = {}
  const regEx = /(?<=\().?(?=\))/

  for (let name of names) {
    nameTracker[name]
      ? nameTracker[name].push(name)
      : nameTracker[name] = []
    if (result.includes(name)) {
      if (nameTracker[name].length === 0) {
        let last = names[names.lastIndexOf(name)]
        let lastNum = +last.match(regEx)
        result.push(`${name}(1)`)
      } else {
        result.push(`${name}(${nameTracker[name].length})`)
      }
    } else {
      result.push(name)
    }
  }
  console.log(nameTracker)

  return result
}
console.log(renameFiles(['doc', 'doc', 'image', 'doc(1)', 'doc']))

module.exports = {
  renameFiles
};
