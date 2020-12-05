/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-04 22:10
 */
import { isNumberLike, isString, toTwoDigits } from './utils'

const DEF_LANGUAGE = {
  weeks: ['日', '一', '二', '三', '四', '五', '六']
}

/**
 * format date
 * @param srcDate
 * @param fmt
 * @param langPackage
 * @returns {string}
 */
function formatDate(srcDate, fmt, langPackage) {
  const date = toDate(srcDate)
  if (!date || !fmt) return isString(srcDate) ? srcDate : (srcDate + '')
  // timestamp
  if (fmt === 'timestamp') return +date
  let $1
  if (/(y+)/i.test(fmt)) {
    $1 = RegExp.$1
    fmt = fmt.replace($1, (date.getFullYear() + '').substr(4 - $1.length))
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

  for (const key in obj) {
    if (new RegExp('(' + key + ')').test(fmt)) {
      $1 = RegExp.$1
      const str = obj[key] + ''
      fmt = fmt.replace($1, ($1.length === 1) ? str : toTwoDigits(str))
    }
  }
  return fmt
}

/**
 * to date
 * @param str yyyy/MM/dd, yyyy-MM-dd, yyyyMMdd, timestamp
 * @returns {Date}
 */
function toDate(str) {
  if (!str) return null
  if (str instanceof Date) return str
  let date = null
  if (isNumberLike(str)) {
    const s = str + ''
    const len = s.length
    // yyyyMMdd
    if (len === 8) {
      date = new Date([s.substr(0, 4), s.substr(4, 2), s.substr(6, 2)].join('/'))
    }
    // yyyyMM
    else if (len === 6) {
      date = new Date([s.substr(0, 4), s.substr(4, 2), '01'].join('/'))
    }
    // yyyy
    else if (len === 4) {
      date = new Date(s + '/01/01')
    }
    // timestamp
    else {
      date = new Date(str)
    }
  } else if (isString(str)) {
    // replace 年月日
    str = str.replace(/[年月日]/g, (match) => {
      return match === '日' ? '' : '/'
    })
    // remove cn/jp week, comment
    // 2020/08/22(星期六) 11:56:21
    // Sat Aug 22 2020 11:56:24 GMT+0900 (Japan Standard Time)
    str = str.replace(/[(（（].*?[)））]/g, ' ')
      .replace(/\bam|pm\b/ig, ' ')
      .replace(/\s+/g, ' ')
    /** yyyy/MM/dd yyyy-MM-dd */
    if (/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/.test(str)) {
      date = new Date([RegExp.$1, RegExp.$2, RegExp.$3].join('/'))
    }
    /** yyyy/MM yyyy-MM */
    else if (/^(\d{4})[-/](\d{1,2})$/.test(str)) {
      date = new Date([RegExp.$1, RegExp.$2, '01'].join('/'))
    } else {
      date = new Date(str)
      if (isNaN(date.getFullYear())) {
        date = null
      }
    }
  }
  return date
}

export {
  formatDate,
  isNumberLike,
  isString,
  toDate,
  toTwoDigits
}
