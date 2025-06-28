import { test } from 'node:test'
import * as assert from 'node:assert'
import { build } from '../helper.js'

test('list users returns array', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/api/v1/listUsers?roomId=defaultRoom'
  })
  const payload = JSON.parse(res.payload)
  assert.ok(Array.isArray(payload.users))
})
