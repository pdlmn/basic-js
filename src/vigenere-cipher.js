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

class VigenereCipheringMachine {
  constructor(isReverse = true) {
    this.isReverse = isReverse
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

  generateAlphabet(key = 0) {
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

  generateCipheringTable() {
    const table = []

    for (let i = 0; i < 26; i++) {
      table.push(this.generateAlphabet(i))
    }

    return table
  }

  encrypt(msg, key) {
    const upperCaseMsg = msg.toUpperCase()
    const alphabet = this.generateAlphabet()
    const table = this.generateCipheringTable()
    let upperCaseKey = key.toUpperCase()
    let encrypted = ''

    if (upperCaseKey.length < upperCaseMsg.length) {
      upperCaseKey = this.repeatString(upperCaseKey, upperCaseMsg.length)
    }

    let currentKeyLetter = 0
    for (let i = 0; i < msg.length; i++) {
      let column = alphabet.indexOf(upperCaseMsg[i])
      let row = alphabet.indexOf(upperCaseKey[currentKeyLetter])
      if (column >= 0) {
        encrypted += table[column][row]
        currentKeyLetter++
      } else {
        encrypted += upperCaseMsg[i]
      }
    }

    return encrypted
  }

  decrypt(encryptedMsg, key) {
    const upperCaseMsg = encryptedMsg.toUpperCase()
    const alphabet = this.generateAlphabet()
    const table = this.generateCipheringTable()
    let upperCaseKey = key.toUpperCase()
    let decrypted = ''

    if (upperCaseKey.length < upperCaseMsg.length) {
      upperCaseKey = this.repeatString(upperCaseKey, upperCaseMsg.length)
    }

    let currentKeyLetter = 0
    for (let i = 0; i < upperCaseMsg.length; i++) {
      let row = alphabet.indexOf(upperCaseKey[currentKeyLetter])
      let column = table[row].indexOf(upperCaseMsg[i])
      if (column >= 0) {
        decrypted += alphabet[column]
        currentKeyLetter++
      } else {
        decrypted += upperCaseMsg[i]
      }
    }

    return decrypted
  }
}

const cipheringMachine = new VigenereCipheringMachine()
console.log(cipheringMachine.encrypt('attack all!', 'aabaac'))
console.log(cipheringMachine.decrypt('UWJJW XAGWLNFM VNNNDXHVWWL :)', 'js'))
console.log(cipheringMachine.repeatString('lmao', 6))

module.exports = {
  VigenereCipheringMachine
};
