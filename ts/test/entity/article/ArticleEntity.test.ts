

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


describe('ArticleEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GIVE_FOOD_TEST_LIVE=TRUE.
  afterEach(liveDelay('GIVE_FOOD_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GiveFoodSDK.test()
    const ent = testsdk.Article()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GIVE_FOOD_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'article.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"foodbank_slug":{"a":true,"h":"Foodbank Slug","n":"foodbank_slug","r":false,"sh":"Related food bank identifier","t":"`$STRING`","key$":"foodbank_slug","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the article","t":"`$INTEGER`","key$":"id","index$":1},"published":{"a":true,"fo":"date-time","h":"Published","n":"published","r":false,"sh":"Publication date","t":"`$STRING`","key$":"published","index$":2},"source":{"a":true,"h":"Source","n":"source","r":false,"sh":"Publication source","t":"`$STRING`","key$":"source","index$":3},"title":{"a":true,"h":"Title","n":"title","r":false,"sh":"Article title","t":"`$STRING`","key$":"title","index$":4},"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":false,"sh":"URL to the article","t":"`$STRING`","key$":"url","index$":5}},"id":{"field":"id","name":"id"},"name":"article","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /articles/","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"json","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/articles/","q":{"exist":["format"]},"r":{},"s":[{"lit":"articles"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"article","name__orig":"article","Name":"Article","name_":"article","name-":"article","NAME":"ARTICLE","index$":0}, {"active":true,"entity":"article","key$":"BasicArticleFlow","kind":"basic","name":"BasicArticleFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"article_ref01"}}],"index$":0}]}, 'Article', {"GET /articles/":{"protocol":"http","operationId":"listArticles","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"Unique identifier for the article","key$":"id"},"title":{"type":"string","description":"Article title","key$":"title"},"url":{"type":"string","format":"uri","description":"URL to the article","key$":"url"},"published":{"type":"string","format":"date-time","description":"Publication date","key$":"published"},"source":{"type":"string","description":"Publication source","key$":"source"},"foodbank_slug":{"type":"string","description":"Related food bank identifier","key$":"foodbank_slug"}},"x-ref":"#/components/schemas/Article","index$":0}}},"application/xml":{"schema":{"type":"object"}},"application/x-yaml":{"schema":{"type":"object"}}}}},"parameters":[{"name":"format","in":"query","description":"Response format","required":false,"schema":{"type":"string","enum":["json","xml","yaml"],"default":"json"},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let article_ref01_data = Object.values(setup.data.existing.article)[0] as any

    // LIST
    const article_ref01_ent = client.Article()
    const article_ref01_match: any = {}

    const article_ref01_list = (await article_ref01_ent.list(article_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/article/ArticleTestData.json')

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
    ['article01','article02','article03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GIVE_FOOD_TEST_ARTICLE_ENTID': idmap,
    'GIVE_FOOD_TEST_LIVE': 'FALSE',
    'GIVE_FOOD_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['GIVE_FOOD_TEST_ARTICLE_ENTID']

  const live = 'TRUE' === env.GIVE_FOOD_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GIVE_FOOD_TEST_ARTICLE_ENTID']
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
  
