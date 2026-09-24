

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


loadEnvLocal(__dirname + '/../../../.env.local')


describe('FoodBankEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GIVE_FOOD_TEST_LIVE=TRUE.
  afterEach(liveDelay('GIVE_FOOD_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GiveFoodSDK.test()
    const ent = testsdk.FoodBank()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GIVE_FOOD_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'food_bank.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"address":{"a":true,"h":"Address","n":"address","r":false,"sh":"Physical address of the food bank","t":"`$STRING`","key$":"address","index$":0},"email":{"a":true,"fo":"email","h":"Email","n":"email","r":false,"sh":"Contact email address","t":"`$STRING`","key$":"email","index$":1},"items_needed":{"a":true,"h":"Items Needed","n":"items_needed","r":false,"sh":"List of items currently needed for donation","t":"`$ARRAY`","key$":"items_needed","index$":2},"latitude":{"a":true,"fo":"double","h":"Latitude","n":"latitude","r":false,"sh":"Latitude coordinate","t":"`$NUMBER`","key$":"latitude","index$":3},"longitude":{"a":true,"fo":"double","h":"Longitude","n":"longitude","r":false,"sh":"Longitude coordinate","t":"`$NUMBER`","key$":"longitude","index$":4},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name of the food bank","t":"`$STRING`","key$":"name","index$":5},"needs":{"a":true,"h":"Needs","n":"needs","r":false,"sh":"Current needs status","t":"`$OBJECT`","key$":"needs","index$":6},"phone":{"a":true,"h":"Phone","n":"phone","r":false,"sh":"Contact phone number","t":"`$STRING`","key$":"phone","index$":7},"postcode":{"a":true,"h":"Postcode","n":"postcode","r":false,"sh":"Postal code","t":"`$STRING`","key$":"postcode","index$":8},"shopping_list_url":{"a":true,"fo":"uri","h":"Shopping List Url","n":"shopping_list_url","r":false,"sh":"URL to the food bank's detailed shopping list","t":"`$STRING`","key$":"shopping_list_url","index$":9},"slug":{"a":true,"h":"Slug","n":"slug","r":false,"sh":"Unique identifier for the food bank","t":"`$STRING`","key$":"slug","index$":10},"updated":{"a":true,"fo":"date-time","h":"Updated","n":"updated","r":false,"sh":"Last update timestamp","t":"`$STRING`","key$":"updated","index$":11},"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":false,"sh":"Website URL","t":"`$STRING`","key$":"url","index$":12}},"name":"food_bank","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /foodbanks/","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"json","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/foodbanks/","q":{"exist":["format"]},"r":{},"s":[{"lit":"foodbanks"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /foodbanks/{slug}/","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"slug","or":"slug","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"json","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/foodbanks/{slug}/","q":{"exist":["format","slug"]},"r":{},"s":[{"lit":"foodbanks"},{"var":"slug"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"food_bank","name__orig":"food_bank","Name":"FoodBank","name_":"food_bank","name-":"food-bank","NAME":"FOOD_BANK","index$":2}, {"active":true,"entity":"food_bank","key$":"BasicFoodBankFlow","kind":"basic","name":"BasicFoodBankFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"food_bank_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"food_bank_ref01","srcdatavar":"food_bank_ref01_data","suffix":"_dt0"},"m":{"id":"food_bank01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-food_bank_ref01"}}],"index$":1}]}, 'FoodBank', {"GET /foodbanks/":{"protocol":"http","operationId":"listFoodBanks","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"slug":{"type":"string","description":"Unique identifier for the food bank","key$":"slug"},"name":{"type":"string","description":"Name of the food bank","key$":"name"},"address":{"type":"string","description":"Physical address of the food bank","key$":"address"},"postcode":{"type":"string","description":"Postal code","key$":"postcode"},"url":{"type":"string","format":"uri","description":"Website URL","key$":"url"},"latitude":{"type":"number","format":"double","description":"Latitude coordinate","key$":"latitude"},"longitude":{"type":"number","format":"double","description":"Longitude coordinate","key$":"longitude"},"phone":{"type":"string","description":"Contact phone number","key$":"phone"},"email":{"type":"string","format":"email","description":"Contact email address","key$":"email"}},"x-ref":"#/components/schemas/FoodBank","index$":0}}},"application/geo+json":{"schema":{"type":"object","properties":{"type":{"type":"string","example":"FeatureCollection"},"features":{"type":"array","items":{"type":"object"}}}}},"application/xml":{"schema":{"type":"object"}},"application/x-yaml":{"schema":{"type":"object"}}}}},"parameters":[{"name":"format","in":"query","description":"Response format","required":false,"schema":{"type":"string","enum":["json","geojson","xml","yaml"],"default":"json"},"index$":0}],"securitySource":"unspecified"},"GET /foodbanks/{slug}/":{"protocol":"http","operationId":"getFoodBank","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"allOf":[{"type":"object","properties":{"slug":{"type":"string","description":"Unique identifier for the food bank","key$":"slug"},"name":{"type":"string","description":"Name of the food bank","key$":"name"},"address":{"type":"string","description":"Physical address of the food bank","key$":"address"},"postcode":{"type":"string","description":"Postal code","key$":"postcode"},"url":{"type":"string","format":"uri","description":"Website URL","key$":"url"},"latitude":{"type":"number","format":"double","description":"Latitude coordinate","key$":"latitude"},"longitude":{"type":"number","format":"double","description":"Longitude coordinate","key$":"longitude"},"phone":{"type":"string","description":"Contact phone number","key$":"phone"},"email":{"type":"string","format":"email","description":"Contact email address","key$":"email"}},"x-ref":"#/components/schemas/FoodBank","index$":0},{"type":"object","properties":{"items_needed":{"type":"array","items":{"type":"string"},"description":"List of items currently needed for donation","key$":"items_needed"},"shopping_list_url":{"type":"string","format":"uri","description":"URL to the food bank's detailed shopping list","key$":"shopping_list_url"},"updated":{"type":"string","format":"date-time","description":"Last update timestamp","key$":"updated"},"needs":{"type":"object","description":"Current needs status","key$":"needs"}},"index$":1}],"x-ref":"#/components/schemas/FoodBankDetail"}},"application/xml":{"schema":{"allOf":[{"type":"object","properties":{"slug":{"type":"string","description":"Unique identifier for the food bank","key$":"slug"},"name":{"type":"string","description":"Name of the food bank","key$":"name"},"address":{"type":"string","description":"Physical address of the food bank","key$":"address"},"postcode":{"type":"string","description":"Postal code","key$":"postcode"},"url":{"type":"string","format":"uri","description":"Website URL","key$":"url"},"latitude":{"type":"number","format":"double","description":"Latitude coordinate","key$":"latitude"},"longitude":{"type":"number","format":"double","description":"Longitude coordinate","key$":"longitude"},"phone":{"type":"string","description":"Contact phone number","key$":"phone"},"email":{"type":"string","format":"email","description":"Contact email address","key$":"email"}},"x-ref":"#/components/schemas/FoodBank","index$":0},{"type":"object","properties":{"items_needed":{"type":"array","items":{"type":"string"},"description":"List of items currently needed for donation","key$":"items_needed"},"shopping_list_url":{"type":"string","format":"uri","description":"URL to the food bank's detailed shopping list","key$":"shopping_list_url"},"updated":{"type":"string","format":"date-time","description":"Last update timestamp","key$":"updated"},"needs":{"type":"object","description":"Current needs status","key$":"needs"}},"index$":1}],"x-ref":"#/components/schemas/FoodBankDetail"}},"application/x-yaml":{"schema":{"allOf":[{"type":"object","properties":{"slug":{"type":"string","description":"Unique identifier for the food bank","key$":"slug"},"name":{"type":"string","description":"Name of the food bank","key$":"name"},"address":{"type":"string","description":"Physical address of the food bank","key$":"address"},"postcode":{"type":"string","description":"Postal code","key$":"postcode"},"url":{"type":"string","format":"uri","description":"Website URL","key$":"url"},"latitude":{"type":"number","format":"double","description":"Latitude coordinate","key$":"latitude"},"longitude":{"type":"number","format":"double","description":"Longitude coordinate","key$":"longitude"},"phone":{"type":"string","description":"Contact phone number","key$":"phone"},"email":{"type":"string","format":"email","description":"Contact email address","key$":"email"}},"x-ref":"#/components/schemas/FoodBank","index$":0},{"type":"object","properties":{"items_needed":{"type":"array","items":{"type":"string"},"description":"List of items currently needed for donation","key$":"items_needed"},"shopping_list_url":{"type":"string","format":"uri","description":"URL to the food bank's detailed shopping list","key$":"shopping_list_url"},"updated":{"type":"string","format":"date-time","description":"Last update timestamp","key$":"updated"},"needs":{"type":"object","description":"Current needs status","key$":"needs"}},"index$":1}],"x-ref":"#/components/schemas/FoodBankDetail"}}}},"404":{"description":"Food bank not found"}},"parameters":[{"name":"slug","in":"path","description":"Unique identifier for the food bank","required":true,"schema":{"type":"string"},"index$":0},{"name":"format","in":"query","description":"Response format","required":false,"schema":{"type":"string","enum":["json","xml","yaml"],"default":"json"},"index$":1}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let food_bank_ref01_data = Object.values(setup.data.existing.food_bank)[0] as any

    // LIST
    const food_bank_ref01_ent = client.FoodBank()
    const food_bank_ref01_match: any = {}

    const food_bank_ref01_list = (await food_bank_ref01_ent.list(food_bank_ref01_match)).map((e: any) => e.data())



  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/food_bank/FoodBankTestData.json')

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
    ['food_bank01','food_bank02','food_bank03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GIVE_FOOD_TEST_FOOD_BANK_ENTID': idmap,
    'GIVE_FOOD_TEST_LIVE': 'FALSE',
    'GIVE_FOOD_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['GIVE_FOOD_TEST_FOOD_BANK_ENTID']

  const live = 'TRUE' === env.GIVE_FOOD_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GIVE_FOOD_TEST_FOOD_BANK_ENTID']
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
  
