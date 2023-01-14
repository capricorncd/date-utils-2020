/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-04 23:39
 */
import { describe, expect, test } from 'vitest';
import { formatDate, toDate, toTwoDigits }from '../src'

const langPackage = {
  // ['日', '一', '二', '三', '四', '五', '六']
  weeks: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日']
}

describe('formatDate', () => {
  test('now', () => {
    const nowDate = new Date()
    const year = nowDate.getFullYear()
    const month = nowDate.getMonth() + 1
    const day = nowDate.getDate()
    const hour = nowDate.getHours()
    const minute = nowDate.getMinutes()
    const second = nowDate.getSeconds()
    expect(formatDate(nowDate, 'yyyy-MM-dd hh:mm:ss')).toEqual(
      `${year}-${toTwoDigits(month)}-${toTwoDigits(day)} ${toTwoDigits(hour)}:${toTwoDigits(minute)}:${toTwoDigits(second)}`
    )

    expect(formatDate(nowDate, 'yy-M-d h:m:s')).toEqual(
      `${String(year).substring(2)}-${month}-${day} ${hour}:${minute}:${second}`
    )
  })

  test('string or number', () => {
    expect(formatDate('2022', 'yyyy/MM/dd')).toEqual('2022/01/01')
    expect(formatDate('202209', 'yyyy/MM/dd')).toEqual('2022/09/01')
    expect(formatDate('20220105', 'yyyy/MM/dd')).toEqual('2022/01/05')
    expect(formatDate('20221212', 'yyyy/MM/dd')).toEqual('2022/12/12')

    expect(formatDate(20210101, 'yyyy-MM-dd hh:mm:ss g')).toEqual('1970-01-01 14:36:50 GMT+0900')
    expect(formatDate('20210101', 'yyyy-MM-dd hh:mm:ss G')).toEqual('2021-01-01 00:00:00 GMT+0900 (Japan Standard Time)')
  })

  test('timestamp', () => {
    expect(formatDate(1673267831232, 'yyyy/MM/dd hh:mm')).toEqual('2023/01/09 21:37')
    expect(formatDate(0, 'yyyy-MM-dd hh:mm:ss g')).toEqual('1970-01-01 09:00:00 GMT+0900')
  })

  test('language', () => {
    expect(formatDate('2020/12/05 12:22:52', 'yyyy/MM/dd(W) hh:mm:ss', langPackage)).toEqual('2020/12/05(土曜日) 12:22:52')
    expect(formatDate('2020/12/05 12:22:52', 'yyyy/MM/dd(W) hh:mm:ss')).toEqual('2020/12/05(Sat) 12:22:52')
  })

  test('week', () => {
    expect(formatDate('2020-12-04', 'yyyy/MM/dd W')).toEqual('2020/12/04 Fri')

    expect(formatDate('2020/12/05', 'w')).toBe('6')
    expect(formatDate('2020/12/05', 'W')).toBe('Sat')
    expect(formatDate('2020/12/05', 'W', langPackage)).toBe('土曜日')
  })

  test('Returns null if invalid value', () => {
    expect(formatDate('sd2', 'yyyy/MM/dd')).toEqual('sd2')
    expect(formatDate(null, 'yyyy/MM/dd')).toEqual('null')
  })

  test('toTwoDigits', () => {
    expect(toTwoDigits(1)).toBe('01')
    expect(toTwoDigits(0)).toBe('00')
    expect(toTwoDigits('0')).toBe('00')
    expect(toTwoDigits(12)).toBe('12')
    expect(toTwoDigits('12')).toBe('12')
    expect(toTwoDigits('12222')).toBe('12222')
    expect(toTwoDigits('some string')).toBe('some string')
  })
})

describe('toDate', () => {
  test('any string', () => {
    expect(toDate('20230113')!.toString().split(' GMT')[0]).toEqual('Fri Jan 13 2023 00:00:00')
    // 2023 => 20230101
    const result = 'Sun Jan 01 2023 00:00:00'
    expect(toDate('2023')!.toString().split(' GMT')[0]).toEqual(result)
    expect(toDate('202301')!.toString().split(' GMT')[0]).toEqual(result)
    expect(toDate('20230101')!.toString().split(' GMT')[0]).toEqual(result)
  })

  test('timestamp', () => {
    expect(toDate(0)!.getHours()).toEqual(9)
    expect(toDate(0)!.getUTCHours()).toEqual(0)
  })

  test('Returns null if invalid value', () => {
    expect(toDate('null')).toBeNull()
    expect(toDate(null)).toBeNull()
    expect(toDate(void 0)).toBeNull()
    expect(toDate('34d')).toBeNull()
    expect(toDate('x')).toBeNull()
  })
})

