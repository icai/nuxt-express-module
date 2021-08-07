import { resolve } from 'path'

export default {
  rootDir: resolve(__dirname, '../..'),
  srcDir: __dirname,
  dev: false,
  babel: {
    presets() {
      return [
        [
          '@nuxt/babel-preset-app',
          {
            corejs: { version: 3 }
          }
        ]
      ]
    }
  },
  render: {
    resourceHints: false
  },
  modules: ['@@']
}
