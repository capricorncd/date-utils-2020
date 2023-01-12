/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-04 22:10
 */
import { toTwoDigits } from './helper'
import * as Types from '../types/index'

const DEF_LANGUAGE: Types.ILangPackage = {
  // weeks: ['日', '一', '二', '三', '四', '五', '六']
  weeks: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
}

/**
 * format date
 * @param input
 * @param fmt
 * @param langPackage
 * @returns {string}
 */
function formatDate<T>(input: T, fmt: string, langPackage?: Types.ILangPackage): string {
  const date = toDate(input)
  if (!date || !fmt) return String(input)
  // timestamp
  if (fmt === 'timestamp') return date.getTime().toString()

  if (/(y+)/i.test(fmt)) {
    const $1 = RegExp.$1
    fmt = fmt.replace($1, (date.getFullYear() + '').substring(4 - $1.length))
  }

  if (!langPackage || !Array.isArray(langPackage.weeks)) {
    langPackage = DEF_LANGUAGE
  }

  const obj = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    // week number
    'w+': date.getDay(),
    // week text
    'W+': langPackage.weeks[date.getDay()],
    // am/pm
    'a+': date.getHours() < 12 ? 'am' : 'pm',
    'A+': date.getHours() < 12 ? 'AM' : 'PM'
  }

  let $1
  for (const key in obj) {
    if (new RegExp('(' + key + ')').test(fmt)) {
      $1 = RegExp.$1
      const str = obj[key] + ''
      fmt = fmt.replace($1, ($1.length === 1) ? str : toTwoDigits(str))
    }
  }

  // GMT(Greenwich Mean Time)
  // Chrome: Sun Aug 01 2021 14:20:04 GMT+0900 (Japan Standard Time)
  // FireFox: Sun Aug 01 2021 14:37:53 GMT+0900 (日本标准时间)
  // Safari: Sun Aug 01 2021 14:37:08 GMT+0900 (JST)
  if (/g/i.test(fmt)) {
    const gmt = date.toString().split(/\s+/).slice(5)
    const isLowerCase = fmt.includes('g')
    fmt = fmt.replace(/g/i, isLowerCase ? gmt[0] : gmt.join(' '))
  }

  return fmt
}

/**
 * to date
 * @param input yyyy/MM/dd, yyyy-MM-dd, yyyyMMdd, timestamp
 * @returns {Date}
 */
function toDate<T>(input: T): null | Date {
  let result = null
  if (input instanceof Date) {
    result = input
  }
  // fix: In the case of an array with only one element
  // Example: ['2021/01/02'].toString() => '2021/01/02'
  else if (typeof input === 'number') {
    // timestamp
    result = new Date(input)
  } 
  // string
  else if (typeof input === 'string') {
    let str = input.trim()
    // string number
    if (/^\d+$/.test(str)) {
      const len = str.length
      // yyyyMMdd
      if (len === 8) {
        result = new Date([str.substring(0, 4), str.substring(4, 6), str.substring(6, 8)].join('/'))
      }
      // yyyyMM
      else if (len === 6) {
        result = new Date([str.substring(0, 4), str.substring(4, 6), '01'].join('/'))
      }
      // yyyy
      else if (len === 4) {
        result = new Date(str + '/01/01')
      }
      // Other cases are handled as timestamp
      else {
        // Note that the results of new Date(0) and new Date('0') are different
        result = new Date(parseInt(input))
      }
    } else {
      // replace 年月日
      str = str
        .replace(/[年月日]/g, (match) => {
          return match === '日' ? '' : '/'
        })
        // remove cn/jp week, comment
        // 2020/08/22(星期六) 11:56:21
        // Sat Aug 22 2020 11:56:24 GMT+0900 (Japan Standard Time)
        .replace(/[(（（].*?[)））]/g, ' ')
        .replace(/\bam|pm\b/ig, ' ')
        .replace(/\s+/g, ' ')
      /** yyyy/MM/dd yyyy-MM-dd */
      if (/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/.test(str)) {
        result = new Date([RegExp.$1, RegExp.$2, RegExp.$3].join('/'))
      }
      /** yyyy/MM yyyy-MM */
      else if (/^(\d{4})[-/](\d{1,2})$/.test(str)) {
        result = new Date([RegExp.$1, RegExp.$2, '01'].join('/'))
      } else {
        result = new Date(str)
      }
    }
  }
  return result && !isNaN(result.getFullYear()) ? result : null
}

export {
  formatDate,
  toDate,
  toTwoDigits,
}
