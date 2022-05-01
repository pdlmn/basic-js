const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */

function generateAlphabet(key = 0) {
  let alphabet = ''
  let startingLetter = 65 + key

  for (let i = 0; i < 26; i++) {
    if (startingLetter >= 91) {
      startingLetter = 65
    }
    alphabet += String.fromCharCode(startingLetter++)
  }

  return alphabet
}

function generateCipheringTable() {
  const table = []

  for (let i = 0; i < 26; i++) {
    table.push(generateAlphabet(i))
  }

  return table
}

function reverseString(str) {
  let reversed = ''
  let last = str.length - 1
  for (let i = last; i >= 0; i--) {
    reversed += str[i]
  }
  return reversed
}

class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect
    this.alphabet = generateAlphabet()
    this.table = generateCipheringTable()
  }

  repeatString(str, until) {
    let result = ''
    let startingLetter = 0

    for (let i = 0; i < until; i++) {
      if (startingLetter > str.length - 1) {
        startingLetter = 0
      }
      result += str[startingLetter++]
    }

    return result
  }

  encrypt(msg, key) {
    if (!msg || !key) throw new Error('Incorrect arguments!')

    const upperCaseMsg = msg.toUpperCase()
    let upperCaseKey = key.toUpperCase()
    let encrypted = ''

    if (upperCaseKey.length < upperCaseMsg.length) {
      upperCaseKey = this.repeatString(upperCaseKey, upperCaseMsg.length)
    }

    let currentKeyLetter = 0
    for (let i = 0; i < msg.length; i++) {
      let column = this.alphabet.indexOf(upperCaseMsg[i])
      let row = this.alphabet.indexOf(upperCaseKey[currentKeyLetter])
      if (column >= 0) {
        encrypted += this.table[column][row]
        currentKeyLetter++
      } else {
        encrypted += upperCaseMsg[i]
      }
    }

    if (!this.isDirect) {
      encrypted = reverseString(encrypted)
    }

    return encrypted
  }

  decrypt(encryptedMsg, key) {
    if (!encryptedMsg || !key) throw new Error('Incorrect arguments!')

    const upperCaseMsg = encryptedMsg.toUpperCase()
    let upperCaseKey = key.toUpperCase()
    let decrypted = ''

    if (upperCaseKey.length < upperCaseMsg.length) {
      upperCaseKey = this.repeatString(upperCaseKey, upperCaseMsg.length)
    }

    let currentKeyLetter = 0
    for (let i = 0; i < upperCaseMsg.length; i++) {
      let row = this.alphabet.indexOf(upperCaseKey[currentKeyLetter])
      let column = this.table[row].indexOf(upperCaseMsg[i])
      if (column >= 0) {
        decrypted += this.alphabet[column]
        currentKeyLetter++
      } else {
        decrypted += upperCaseMsg[i]
      }
    }

    if (!this.isDirect) {
      decrypted = reverseString(decrypted)
    }

    return decrypted
  }
}

const cipheringMachine = new VigenereCipheringMachine()
const reverseMachine = new VigenereCipheringMachine(false)
console.log(cipheringMachine.encrypt('attack all!', 'aabaac'))
console.log(cipheringMachine.decrypt('UWJJW XAGWLNFM VNNNDXHVWWL :)', 'js'))
console.log(cipheringMachine.repeatString('lmao', 6))
console.log(reverseMachine.encrypt('attack all!', 'aabaac'))
console.log(reverseMachine.decrypt('UWJJW XAGWLNFM VNNNDXHVWWL :)', 'js'))
console.log(reverseMachine.repeatString('lmao', 6))

console.log(reverseString('Heh! I am winning!'))

module.exports = {
  VigenereCipheringMachine
};
