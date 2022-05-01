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
    const table = this.generateCipheringTable()
    
  }
  decrypt(encryptedMsg, key) {
  }
}

const cipheringMachine = new VigenereCipheringMachine()
console.log(cipheringMachine.decrypt('T', 'E')) // должны быть X


module.exports = {
  VigenereCipheringMachine
};
