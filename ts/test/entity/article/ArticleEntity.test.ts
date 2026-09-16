

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"foodbank_slug","req":false,"short":"Related food bank identifier","type":"`$STRING`","index$":0},{"active":true,"name":"id","req":false,"short":"Unique identifier for the article","type":"`$INTEGER`","index$":1},{"active":true,"format":"date-time","name":"published","req":false,"short":"Publication date","type":"`$STRING`","index$":2},{"active":true,"name":"source","req":false,"short":"Publication source","type":"`$STRING`","index$":3},{"active":true,"name":"title","req":false,"short":"Article title","type":"`$STRING`","index$":4},{"active":true,"format":"uri","name":"url","req":false,"short":"URL to the article","type":"`$STRING`","index$":5}],"id":{"field":"id","name":"id"},"name":"article","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":"json","kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /articles/","json":"{\"operationId\":\"listArticles\",\"parameters\":[{\"description\":\"Response format\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"json\",\"enum\":[\"json\",\"xml\",\"yaml\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"foodbank_slug\":{\"description\":\"Related food bank identifier\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the article\",\"type\":\"integer\"},\"published\":{\"description\":\"Publication date\",\"format\":\"date-time\",\"type\":\"string\"},\"source\":{\"description\":\"Publication source\",\"type\":\"string\"},\"title\":{\"description\":\"Article title\",\"type\":\"string\"},\"url\":{\"description\":\"URL to the article\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"application/x-yaml\":{\"schema\":{\"type\":\"object\"}},\"application/xml\":{\"schema\":{\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/articles/","segments":[{"lit":"articles"}],"select":{"exist":["format"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"article","name__orig":"article","Name":"Article","name_":"article","name-":"article","NAME":"ARTICLE","index$":0}, {"active":true,"entity":"article","key$":"BasicArticleFlow","kind":"basic","name":"BasicArticleFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"article_ref01"}}],"index$":0}]}, 'Article')
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
  
