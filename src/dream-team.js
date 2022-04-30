const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create name of dream team based on the names of its members
 *  
 * @param {Array} members names of the members 
 * @return {String | Boolean} name of the team or false
 * in case of incorrect members
 *
 * @example
 * 
 * createDreamTeam(['Matt', 'Ann', 'Dmitry', 'Max']) => 'ADMM'
 * createDreamTeam(['Olivia', 1111, 'Lily', 'Oscar', true, null]) => 'LOO'
 *
 */
function createDreamTeam(members) {
  if (!Array.isArray(members)) return false
  const coolName = []
  for (let i = 0; i < members.length; i++) {
    const member = members[i]
    if (member && typeof member === 'string') {
      coolName.push(member.trim()[0])
    }
  }
  return coolName.map(l => l.toUpperCase()).sort().join('')
}

module.exports = {
  createDreamTeam
};
