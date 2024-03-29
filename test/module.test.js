import { Nuxt, Builder } from 'nuxt';
import request from 'request-promise-native';
import config from './fixture/nuxt.config';
const url = path => `http://localhost:3000${path}`
const get = path => request(url(path))

describe('basic', () => {
  let nuxt

  beforeAll(async () => {
    nuxt = new Nuxt(config)
    await new Builder(nuxt).build()
    await nuxt.listen(3000)
  }, 60000)

  afterAll(async () => {
    await nuxt.close()
  })

  test('render', async () => {
    const html = await get('/')
    expect(html).toContain('Works!')
  })

  test('get express path', async () => {
    const response = await get('/api/test')
    expect(response).toBe('testing success')
  })
})
