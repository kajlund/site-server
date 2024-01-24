import { test } from '@japa/runner'

test.group('Listing tags', (group) => {
  group.setup(async () => {})

  group.teardown(() => {})

  test('Default list should return default amount', async ({ client, assert }) => {
    const response = await client.get('/api/v1/tags')
    assert.equal(response.status(), 200)
    const body = response.body()
    assert.properties(body, ['success', 'message', 'query', 'data'])
    assert.equal(body.success, true)
    assert.deepEqual(body.query, { filter: '', sort: 'tag', limit: 50, skip: 0 })
    assert.equal(body.data.length, 50)
    // response.dump()
  })
})
