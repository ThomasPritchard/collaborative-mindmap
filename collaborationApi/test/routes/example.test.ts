import { test } from 'node:test'
import * as assert from 'node:assert'
import { build } from '../helper.js'

test('example route not found', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/example'
  })

  assert.strictEqual(res.statusCode, 404)
})
