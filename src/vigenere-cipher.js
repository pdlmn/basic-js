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
    const upperCaseKey = key.toUpperCase()
    const alphabet = this.generateAlphabet()
    const table = this.generateCipheringTable()
    let encrypted = ''

    for (let i = 0; i < msg.length; i++) {
      let column = alphabet.indexOf(upperCaseMsg[i])
      let row = alphabet.indexOf(upperCaseKey)
      if (column >= 0) {
        encrypted += table[column][row]
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
    let decrypted = ''

    let row = alphabet.indexOf(key)
    let column = table[row].indexOf(upperCaseMsg)

    return alphabet[column]
  }
}

const cipheringMachine = new VigenereCipheringMachine()
console.log(cipheringMachine.encrypt('attack all!', 'b')) // должно быть BUUBDL BMM!
console.log(cipheringMachine.decrypt('x', 'E')) // должно быть T
console.log(cipheringMachine.generateCipheringTable())


module.exports = {
  VigenereCipheringMachine
};
