

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { GiveFoodSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('DonationPointEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GIVE_FOOD_TEST_LIVE=TRUE.
  afterEach(liveDelay('GIVE_FOOD_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GiveFoodSDK.test()
    const ent = testsdk.DonationPoint()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('donation_point hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of GiveFoodSDK.test(offline).DonationPoint().stream('list')) { }
    }, /offline/)

    for await (const _item of GiveFoodSDK.test(offline).DonationPoint()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = GiveFoodSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.DonationPoint().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of GiveFoodSDK.test().DonationPoint().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new GiveFoodSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.DonationPoint().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.DonationPoint().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = GiveFoodSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.DonationPoint().list({"format":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GIVE_FOOD_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'donation_point.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"address":{"a":true,"h":"Address","n":"address","r":false,"sh":"Physical address","t":"`$STRING`","key$":"address","index$":0},"foodbank_slug":{"a":true,"h":"Foodbank Slug","n":"foodbank_slug","r":false,"sh":"Associated food bank identifier","t":"`$STRING`","key$":"foodbank_slug","index$":1},"latitude":{"a":true,"fo":"double","h":"Latitude","n":"latitude","r":false,"sh":"Latitude coordinate","t":"`$NUMBER`","key$":"latitude","index$":2},"longitude":{"a":true,"fo":"double","h":"Longitude","n":"longitude","r":false,"sh":"Longitude coordinate","t":"`$NUMBER`","key$":"longitude","index$":3},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name of the donation point","t":"`$STRING`","key$":"name","index$":4},"postcode":{"a":true,"h":"Postcode","n":"postcode","r":false,"sh":"Postal code","t":"`$STRING`","key$":"postcode","index$":5},"slug":{"a":true,"h":"Slug","n":"slug","r":false,"sh":"Unique identifier for the donation point","t":"`$STRING`","key$":"slug","index$":6},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"Type of donation point (e.g., supermarket, collection point)","t":"`$STRING`","key$":"type","index$":7}},"name":"donation_point","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /donationpoints/","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"json","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/donationpoints/","q":{},"r":{},"rs":{"alternatives":[{"kind":"json","media":"application/geo+json"},{"binary":true,"kind":"raw","media":"application/x-yaml"},{"kind":"raw","media":"application/xml"}],"kind":"json","media":"application/json"},"s":[{"lit":"donationpoints"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /donationpoints/{slug}/","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"slug","or":"slug","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"json","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/donationpoints/{slug}/","q":{"exist":["slug"]},"r":{},"rs":{"alternatives":[{"binary":true,"kind":"raw","media":"application/x-yaml"},{"kind":"raw","media":"application/xml"}],"kind":"json","media":"application/json"},"s":[{"lit":"donationpoints"},{"var":"slug"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"donation_point","name__orig":"donation_point","Name":"DonationPoint","name_":"donation_point","name-":"donation-point","NAME":"DONATION_POINT","index$":1}, {"active":true,"entity":"donation_point","key$":"BasicDonationPointFlow","kind":"basic","name":"BasicDonationPointFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"donation_point_ref01"}}],"index$":0},{"a":false,"d":{},"i":{"ref":"donation_point_ref01","srcdatavar":"donation_point_ref01_data","suffix":"_dt0"},"m":{"id":"donation_point01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-donation_point_ref01"}}],"unreachable":true}]}, 'DonationPoint', {"GET /donationpoints/":{"protocol":"http","parameters":[{"name":"format","in":"query","description":"Response format","required":false,"schema":{"type":"string","enum":["json","geojson","xml","yaml"],"default":"json"},"index$":0}]},"GET /donationpoints/{slug}/":{"protocol":"http","parameters":[{"name":"slug","in":"path","description":"Unique identifier for the donation point","required":true,"schema":{"type":"string"},"index$":0},{"name":"format","in":"query","description":"Response format","required":false,"schema":{"type":"string","enum":["json","xml","yaml"],"default":"json"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let donation_point_ref01_data = Object.values(setup.data.existing.donation_point)[0] as any

    // LIST
    const donation_point_ref01_ent = client.DonationPoint()
    const donation_point_ref01_match: any = {}

    const donation_point_ref01_list = (await donation_point_ref01_ent.list(donation_point_ref01_match)).map((e: any) => e.data())


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/donation_point/DonationPointTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = GiveFoodSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['donation_point01','donation_point02','donation_point03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GIVE_FOOD_TEST_DONATION_POINT_ENTID': idmap,
    'GIVE_FOOD_TEST_LIVE': 'FALSE',
    'GIVE_FOOD_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['GIVE_FOOD_TEST_DONATION_POINT_ENTID']

  const live = 'TRUE' === env.GIVE_FOOD_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GIVE_FOOD_TEST_DONATION_POINT_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new GiveFoodSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.GIVE_FOOD_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
