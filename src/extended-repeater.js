const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create a repeating string based on the given parameters
 *  
 * @param {String} str string to repeat
 * @param {Object} options options object 
 * @return {String} repeating string
 * 
 *
 * @example
 * 
 * repeater('STRING', { repeatTimes: 3, separator: '**', 
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater(str, options) {
  const { 
    repeatTimes = 1,
    separator = '+',
    addition,
    additionRepeatTimes,
    additionSeparator = '|'
  } = options
  str = String(str)
  const strAddition = addition !== undefined ? String(addition) : ''
  let newStr = ''
  for (let i = 0; i < repeatTimes; i++) {
    newStr += str
    if (strAddition) {
      if (additionRepeatTimes) {
        for (let j = 0; j < additionRepeatTimes; j++) {
          newStr += strAddition
          if (additionSeparator && j !== additionRepeatTimes - 1) {
            newStr += additionSeparator
          }
        }
      } else {
        newStr +=strAddition
      }
    }
    if (separator && i !== repeatTimes - 1) {
      newStr += separator
    }
  }
  return newStr
}

module.exports = {
  repeater
};
