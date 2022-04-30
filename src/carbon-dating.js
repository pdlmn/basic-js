const { NotImplementedError } = require('../extensions/index.js');

const MODERN_ACTIVITY = 15;
const HALF_LIFE_PERIOD = 5730;

/**
 * Determine the age of archeological find by using
 * given MODERN_ACTIVITY and HALF_LIFE_PERIOD values
 * 
 * @param {String} sampleActivity string representation of current activity 
 * @return {Number | Boolean} calculated age in years or false
 * in case of incorrect sampleActivity
 *
 * @example
 * 
 * dateSample('1') => 22387
 * dateSample('WOOT!') => false
 *
 */
function dateSample(sampleActivity) {
  const numSampleActivity = Number(sampleActivity)
  if (
    typeof sampleActivity !== 'string' ||
    !numSampleActivity ||
    isNaN(numSampleActivity) ||
    numSampleActivity < 0 ||
    numSampleActivity > 15
  ) {
    return false
  }
  const k = 0.693 / HALF_LIFE_PERIOD
  return Math.ceil(Math.log(MODERN_ACTIVITY / numSampleActivity) / k)
}

module.exports = {
  dateSample
};
