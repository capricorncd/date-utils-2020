/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-04 22:11
 */
/**
 * to two digits
 * @param str
 * @returns {string}
 */
export function toTwoDigits(str: string | number): string {
  return String(str).padStart(2, '0')
}
