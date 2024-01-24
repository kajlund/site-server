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
    assert.deepEqual(body.query, { filter: null, sort: 'tag', limit: 50, skip: 0 })
    assert.equal(body.data.length, 50)
    // response.dump()
  })

  test('Check filter param', async ({ client, assert }) => {
    const response = await client.get('/api/v1/tags?filter=ti')
    assert.equal(response.status(), 200)
    const body = response.body()
    assert.properties(body, ['success', 'message', 'query', 'data'])
    assert.equal(body.success, true)
    assert.deepEqual(body.query, { filter: { field: 'tag', value: 'ti' }, sort: 'tag', limit: 50, skip: 0 })
    assert.equal(body.data.length, 2)
    // response.dump()
  })

  test('Check sort and limit param', async ({ client, assert }) => {
    const response = await client.get('/api/v1/tags?sort=createdAt&limit=1')
    assert.equal(response.status(), 200)
    const body = response.body()
    assert.properties(body, ['success', 'message', 'query', 'data'])
    assert.equal(body.success, true)
    assert.deepEqual(body.query, { filter: null, sort: 'createdAt', limit: 1, skip: 0 })
    assert.equal(body.data[0].tag, 'analytics')
    assert.equal(body.data.length, 1)
    // response.dump()
  })

  test('Check skip param', async ({ client, assert }) => {
    const response = await client.get('/api/v1/tags?skip=3')
    assert.equal(response.status(), 200)
    const body = response.body()
    assert.properties(body, ['success', 'message', 'query', 'data'])
    assert.equal(body.success, true)
    assert.deepEqual(body.query, { filter: null, sort: 'tag', limit: 50, skip: 3 })
    response.dump()
    assert.equal(body.data[0].tag, 'api')
  })
})
