/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-04 23:39
 */
const { formatDate, toDate } = require('../dist/date-utils-2020')

const test = formatDate(new Date, 'yyyy-MM-dd hh:mm:ss')

console.log(test)

console.log(toDate(test))
