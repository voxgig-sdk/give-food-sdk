
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { GiveFoodSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = GiveFoodSDK.test()
    equal(testsdk instanceof GiveFoodSDK, true,
      'GiveFoodSDK.test() must return a client synchronously')
  })

})
