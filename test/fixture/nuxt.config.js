import { resolve } from 'path'

export default {
  rootDir: resolve(__dirname, '../..'),
  srcDir: __dirname,
  dev: false,
  babel: {
    plugins: [
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      ['@babel/plugin-proposal-private-methods', { loose: true }],
      ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    ]
  },
  render: {
    resourceHints: false
  },
  modules: ['@@']
}
