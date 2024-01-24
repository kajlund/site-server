import { test } from '@japa/runner'

test('get /ping', async ({ client, assert }) => {
  const response = await client.get('/ping')
  // response.dump()
  assert.equal(response.text(), 'pong')
})
