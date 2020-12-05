# date-utils-2020

date utils 2020, format(date: Date, formatter: string)/toDate(a?: any)...

<p align="left">
  <a href="https://npmcharts.com/compare/date-utils-2020?minimal=true"><img src="https://img.shields.io/npm/dm/date-utils-2020.svg?sanitize=true" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/date-utils-2020"><img src="https://img.shields.io/npm/v/date-utils-2020.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/date-utils-2020"><img src="https://img.shields.io/npm/l/date-utils-2020.svg?sanitize=true" alt="License"></a>
</p>

```shell script
npm i -S date-utils-2020
# or
yarn add date-utils-2020
```

## Usage

```javascript
import { formatDate, toDate } from 'date-utils-2020'

const date = toDate('2020-12-04')
console.log(date) 
// Fri Dec 04 2020 09:00:00 GMT+0900 (Japan Standard Time)

const result = formatDate('2020-12-04', 'yyyy/MM/dd W')
console.log(result)
// 2020/12/04 五
```

## Methods

|Method|Parameters|Description|
|:--|:--|:--|
|formatDate|(date: any, fmt: string, langPackage?: langPackage)|return `string`|
|toDate|(s: any)|return `Date` or `null`|
|isNumberLike|(n: any)| return Boolean `true` or `false`|
|isString|(n: any)| return Boolean `true` or `false`|
|toTwoDigits|(n: number)| return `string`|

#### langPackage

|Props|Type|Description|
|:--|:--|:--|
|weeks|`string[]`|Example: `['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']`, Default: `['日', '一', '二', '三', '四', '五', '六']`|

```javascript
const langPackage = {
  weeks: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日']
}

formatDate(new Date(), 'yyyy/MM/dd(W) hh:mm:ss', langPackage)
// 2020/12/05(土曜日) 12:22:52
```
