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
export function isNumberLike<T>(n: T): boolean {
  return typeof n === 'number' || (typeof n === 'string' && /^-?(\d+|\d+\.\d+)$/.test(n))
}

/**
 * is string
 * @param s
 * @returns {boolean}
 */
export function isString<T>(s: T): boolean {
  return typeof s === 'string'
}

/**
 * to two digits
 * @param n
 * @returns {string}
 */
export function toTwoDigits<T>(n: T): string {
  const str = n + ''
  return str[1] ? str : '0' + str
}
