
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { GiveFoodSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await GiveFoodSDK.test()
    equal(null !== testsdk, true)
  })

})
