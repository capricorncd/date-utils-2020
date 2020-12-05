/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-04 22:11
 */

/**
 * is number like
 * @param n
 * @returns {boolean}
 */
export function isNumberLike(n) {
  return /^-?\d+\.?\d+$/.test(n)
}

/**
 * is string
 * @param s
 * @returns {boolean}
 */
export function isString(s) {
  return typeof s === 'string'
}

/**
 * to two digits
 * @param n
 * @returns {string}
 */
export function toTwoDigits(n) {
  n += ''
  return n[1] ? n : '0' + n
}
