

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { GiveFoodSDK, BaseFeature, stdutil } from '../../..'

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('DonationpointEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GIVE_FOOD_TEST_LIVE=TRUE.
  afterEach(liveDelay('GIVE_FOOD_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GiveFoodSDK.test()
    const ent = testsdk.Donationpoint()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GIVE_FOOD_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'donationpoint.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"address","req":false,"short":"Physical address","type":"`$STRING`","index$":0},{"active":true,"name":"foodbank_slug","req":false,"short":"Associated food bank identifier","type":"`$STRING`","index$":1},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":2},{"active":true,"format":"double","name":"latitude","req":false,"short":"Latitude coordinate","type":"`$NUMBER`","index$":3},{"active":true,"format":"double","name":"longitude","req":false,"short":"Longitude coordinate","type":"`$NUMBER`","index$":4},{"active":true,"name":"name","req":false,"short":"Name of the donation point","type":"`$STRING`","index$":5},{"active":true,"name":"postcode","req":false,"short":"Postal code","type":"`$STRING`","index$":6},{"active":true,"name":"slug","req":false,"short":"Unique identifier for the donation point","type":"`$STRING`","index$":7},{"active":true,"name":"type","req":false,"short":"Type of donation point (e.g., supermarket, collection point)","type":"`$STRING`","index$":8}],"id":{"field":"id","name":"id"},"name":"donationpoint","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":"json","kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /donationpoints/","json":"{\"operationId\":\"listDonationPoints\",\"parameters\":[{\"description\":\"Response format\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"json\",\"enum\":[\"json\",\"geojson\",\"xml\",\"yaml\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/geo+json\":{\"schema\":{\"properties\":{\"features\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"type\":{\"example\":\"FeatureCollection\",\"type\":\"string\"}},\"type\":\"object\"}},\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"address\":{\"description\":\"Physical address\",\"type\":\"string\"},\"foodbank_slug\":{\"description\":\"Associated food bank identifier\",\"type\":\"string\"},\"latitude\":{\"description\":\"Latitude coordinate\",\"format\":\"double\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude coordinate\",\"format\":\"double\",\"type\":\"number\"},\"name\":{\"description\":\"Name of the donation point\",\"type\":\"string\"},\"postcode\":{\"description\":\"Postal code\",\"type\":\"string\"},\"slug\":{\"description\":\"Unique identifier for the donation point\",\"type\":\"string\"},\"type\":{\"description\":\"Type of donation point (e.g., supermarket, collection point)\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"application/x-yaml\":{\"schema\":{\"type\":\"object\"}},\"application/xml\":{\"schema\":{\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/donationpoints/","segments":[{"lit":"donationpoints"}],"select":{"exist":["format"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"slug","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"example":"json","kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /donationpoints/{slug}/","json":"{\"operationId\":\"getDonationPoint\",\"parameters\":[{\"description\":\"Unique identifier for the donation point\",\"in\":\"path\",\"name\":\"slug\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Response format\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"json\",\"enum\":[\"json\",\"xml\",\"yaml\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"address\":{\"description\":\"Physical address\",\"type\":\"string\"},\"foodbank_slug\":{\"description\":\"Associated food bank identifier\",\"type\":\"string\"},\"latitude\":{\"description\":\"Latitude coordinate\",\"format\":\"double\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude coordinate\",\"format\":\"double\",\"type\":\"number\"},\"name\":{\"description\":\"Name of the donation point\",\"type\":\"string\"},\"postcode\":{\"description\":\"Postal code\",\"type\":\"string\"},\"slug\":{\"description\":\"Unique identifier for the donation point\",\"type\":\"string\"},\"type\":{\"description\":\"Type of donation point (e.g., supermarket, collection point)\",\"type\":\"string\"}},\"type\":\"object\"}},\"application/x-yaml\":{\"schema\":{\"properties\":{\"address\":{\"description\":\"Physical address\",\"type\":\"string\"},\"foodbank_slug\":{\"description\":\"Associated food bank identifier\",\"type\":\"string\"},\"latitude\":{\"description\":\"Latitude coordinate\",\"format\":\"double\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude coordinate\",\"format\":\"double\",\"type\":\"number\"},\"name\":{\"description\":\"Name of the donation point\",\"type\":\"string\"},\"postcode\":{\"description\":\"Postal code\",\"type\":\"string\"},\"slug\":{\"description\":\"Unique identifier for the donation point\",\"type\":\"string\"},\"type\":{\"description\":\"Type of donation point (e.g., supermarket, collection point)\",\"type\":\"string\"}},\"type\":\"object\"}},\"application/xml\":{\"schema\":{\"properties\":{\"address\":{\"description\":\"Physical address\",\"type\":\"string\"},\"foodbank_slug\":{\"description\":\"Associated food bank identifier\",\"type\":\"string\"},\"latitude\":{\"description\":\"Latitude coordinate\",\"format\":\"double\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude coordinate\",\"format\":\"double\",\"type\":\"number\"},\"name\":{\"description\":\"Name of the donation point\",\"type\":\"string\"},\"postcode\":{\"description\":\"Postal code\",\"type\":\"string\"},\"slug\":{\"description\":\"Unique identifier for the donation point\",\"type\":\"string\"},\"type\":{\"description\":\"Type of donation point (e.g., supermarket, collection point)\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Donation point not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/donationpoints/{slug}/","rename":{"param":{"slug":"id"}},"segments":[{"lit":"donationpoints"},{"var":"id"}],"select":{"exist":["format","id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"donationpoint","name__orig":"donationpoint","Name":"Donationpoint","name_":"donationpoint","name-":"donationpoint","NAME":"DONATIONPOINT","index$":1}, {"active":true,"entity":"donationpoint","key$":"BasicDonationpointFlow","kind":"basic","name":"BasicDonationpointFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"donationpoint_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"donationpoint_ref01","srcdatavar":"donationpoint_ref01_data","suffix":"_dt0"},"match":{"id":"donationpoint01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-donationpoint_ref01"}}],"index$":1}]}, 'Donationpoint')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let donationpoint_ref01_data = Object.values(setup.data.existing.donationpoint)[0] as any

    // LIST
    const donationpoint_ref01_ent = client.Donationpoint()
    const donationpoint_ref01_match: any = {}

    const donationpoint_ref01_list = (await donationpoint_ref01_ent.list(donationpoint_ref01_match)).map((e: any) => e.data())


    // LOAD
    const donationpoint_ref01_match_dt0: any = {}
    donationpoint_ref01_match_dt0.id = donationpoint_ref01_data.id
    const donationpoint_ref01_data_dt0 = (await donationpoint_ref01_ent.load(donationpoint_ref01_match_dt0)).data()
    assert(donationpoint_ref01_data_dt0.id === donationpoint_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/donationpoint/DonationpointTestData.json')

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
    ['donationpoint01','donationpoint02','donationpoint03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GIVE_FOOD_TEST_DONATIONPOINT_ENTID': idmap,
    'GIVE_FOOD_TEST_LIVE': 'FALSE',
    'GIVE_FOOD_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['GIVE_FOOD_TEST_DONATIONPOINT_ENTID']

  const live = 'TRUE' === env.GIVE_FOOD_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GIVE_FOOD_TEST_DONATIONPOINT_ENTID']
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
  
