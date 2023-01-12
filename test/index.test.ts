/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-04 23:39
 */
import { describe, expect, test } from '@jest/globals';
import { formatDate, toDate, toTwoDigits }from '../src'

describe('formatDate', () => {
  test('', () => {
    const nowDate = new Date()
    const now = formatDate(nowDate, 'yyyy-MM-dd hh:mm:ss')
    expect(now).toEqual(
      `${nowDate.getFullYear()}-${toTwoDigits(nowDate.getMonth() + 1)}-${toTwoDigits(nowDate.getDate())} ${toTwoDigits(nowDate.getHours())}:${toTwoDigits(nowDate.getMinutes())}:${toTwoDigits(nowDate.getSeconds())}`
    )

    expect(formatDate(nowDate, 'yy-M-d h:m:s')).toEqual(
      `${String(nowDate.getFullYear()).substring(2)}-${nowDate.getMonth() + 1}-${nowDate.getDate()} ${nowDate.getHours()}:${nowDate.getMinutes()}:${nowDate.getSeconds()}`
    )

    expect(formatDate('2022', 'yyyy/MM/dd')).toEqual('2022/01/01')
    expect(formatDate('202209', 'yyyy/MM/dd')).toEqual('2022/09/01')
    expect(formatDate('20220105', 'yyyy/MM/dd')).toEqual('2022/01/05')
    expect(formatDate('20221212', 'yyyy/MM/dd')).toEqual('2022/12/12')

    expect(formatDate(20210101, 'yyyy-MM-dd hh:mm:ss g')).toEqual('1970-01-01 14:36:50 GMT+0900')
    expect(formatDate('20210101', 'yyyy-MM-dd hh:mm:ss G')).toEqual('2021-01-01 00:00:00 GMT+0900 (Japan Standard Time)')

    expect(formatDate(1673267831232, 'yyyy/MM/dd hh:mm')).toEqual('2023/01/09 21:37')

    expect(formatDate(0, 'yyyy-MM-dd hh:mm:ss g')).toEqual('1970-01-01 09:00:00 GMT+0900')

    expect(formatDate('sd2', 'yyyy/MM/dd')).toEqual('sd2')
    expect(formatDate(null, 'yyyy/MM/dd')).toEqual('null')
  })
  
  
})

test('toDate', () => {
  expect(toDate('20230113').toString().split(' GMT')[0]).toEqual('Fri Jan 13 2023 00:00:00')

  expect(toDate(0).getHours()).toEqual(9)
  expect(toDate(0).getUTCHours()).toEqual(0)

  expect(toDate('null')).toBeNull()
  expect(toDate(null)).toBeNull()
  expect(toDate(void 0)).toBeNull()
  expect(toDate('34d')).toBeNull()
  expect(toDate('x')).toBeNull()
})
