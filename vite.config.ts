

/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2023/01/14 13:04:35 (GMT+0900)
 */
import { resolve } from 'path'
import { defineConfig } from 'vite'
import pkg from './package.json'
import { formatDate } from './src'

const banner = `/*!
 * date-utils-2020 v${pkg.version}
 * Author: Capricorncd
 * Repository: https://github.com/capricorncd/date-utils-2020#readme
 * Released on: ${formatDate(new Date(), 'yyyy/MM/dd hh:mm:ss g')}
 */
`

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    outDir: resolve(__dirname, './dist'),
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: pkg.name,
      fileName: (format) => `${pkg.name}.${format}.js`,
    },
    rollupOptions: {
      output: {
        banner,
      },
    },
  },
})