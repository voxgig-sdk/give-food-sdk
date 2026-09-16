"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('FoodbankEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GIVE_FOOD_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GIVE_FOOD_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GiveFoodSDK.test();
        const ent = testsdk.Foodbank();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GIVE_FOOD_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'foodbank.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "address", "req": false, "short": "Physical address of the food bank", "type": "`$STRING`", "index$": 0 }, { "active": true, "format": "email", "name": "email", "req": false, "short": "Contact email address", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "items_needed", "req": false, "short": "List of items currently needed for donation", "type": "`$ARRAY`", "index$": 3 }, { "active": true, "format": "double", "name": "latitude", "req": false, "short": "Latitude coordinate", "type": "`$NUMBER`", "index$": 4 }, { "active": true, "format": "double", "name": "longitude", "req": false, "short": "Longitude coordinate", "type": "`$NUMBER`", "index$": 5 }, { "active": true, "name": "name", "req": false, "short": "Name of the food bank", "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "needs", "req": false, "short": "Current needs status", "type": "`$OBJECT`", "index$": 7 }, { "active": true, "name": "phone", "req": false, "short": "Contact phone number", "type": "`$STRING`", "index$": 8 }, { "active": true, "name": "postcode", "req": false, "short": "Postal code", "type": "`$STRING`", "index$": 9 }, { "active": true, "format": "uri", "name": "shopping_list_url", "req": false, "short": "URL to the food bank's detailed shopping list", "type": "`$STRING`", "index$": 10 }, { "active": true, "name": "slug", "req": false, "short": "Unique identifier for the food bank", "type": "`$STRING`", "index$": 11 }, { "active": true, "format": "date-time", "name": "updated", "req": false, "short": "Last update timestamp", "type": "`$STRING`", "index$": 12 }, { "active": true, "format": "uri", "name": "url", "req": false, "short": "Website URL", "type": "`$STRING`", "index$": 13 }], "id": { "field": "id", "name": "id" }, "name": "foodbank", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "json", "kind": "query", "name": "format", "orig": "format", "reqd": false, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /foodbanks/", "json": "{\"operationId\":\"listFoodBanks\",\"parameters\":[{\"description\":\"Response format\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"json\",\"enum\":[\"json\",\"geojson\",\"xml\",\"yaml\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/geo+json\":{\"schema\":{\"properties\":{\"features\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"type\":{\"example\":\"FeatureCollection\",\"type\":\"string\"}},\"type\":\"object\"}},\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"address\":{\"description\":\"Physical address of the food bank\",\"type\":\"string\"},\"email\":{\"description\":\"Contact email address\",\"format\":\"email\",\"type\":\"string\"},\"latitude\":{\"description\":\"Latitude coordinate\",\"format\":\"double\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude coordinate\",\"format\":\"double\",\"type\":\"number\"},\"name\":{\"description\":\"Name of the food bank\",\"type\":\"string\"},\"phone\":{\"description\":\"Contact phone number\",\"type\":\"string\"},\"postcode\":{\"description\":\"Postal code\",\"type\":\"string\"},\"slug\":{\"description\":\"Unique identifier for the food bank\",\"type\":\"string\"},\"url\":{\"description\":\"Website URL\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"application/x-yaml\":{\"schema\":{\"type\":\"object\"}},\"application/xml\":{\"schema\":{\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/foodbanks/", "segments": [{ "lit": "foodbanks" }], "select": { "exist": ["format"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "slug", "reqd": true, "type": "`$STRING`", "index$": 0 }], "query": [{ "active": true, "example": "json", "kind": "query", "name": "format", "orig": "format", "reqd": false, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /foodbanks/{slug}/", "json": "{\"operationId\":\"getFoodBank\",\"parameters\":[{\"description\":\"Unique identifier for the food bank\",\"in\":\"path\",\"name\":\"slug\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Response format\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"json\",\"enum\":[\"json\",\"xml\",\"yaml\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"allOf\":[{\"properties\":{\"address\":{\"description\":\"Physical address of the food bank\",\"type\":\"string\"},\"email\":{\"description\":\"Contact email address\",\"format\":\"email\",\"type\":\"string\"},\"latitude\":{\"description\":\"Latitude coordinate\",\"format\":\"double\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude coordinate\",\"format\":\"double\",\"type\":\"number\"},\"name\":{\"description\":\"Name of the food bank\",\"type\":\"string\"},\"phone\":{\"description\":\"Contact phone number\",\"type\":\"string\"},\"postcode\":{\"description\":\"Postal code\",\"type\":\"string\"},\"slug\":{\"description\":\"Unique identifier for the food bank\",\"type\":\"string\"},\"url\":{\"description\":\"Website URL\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},{\"properties\":{\"items_needed\":{\"description\":\"List of items currently needed for donation\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"needs\":{\"description\":\"Current needs status\",\"type\":\"object\"},\"shopping_list_url\":{\"description\":\"URL to the food bank's detailed shopping list\",\"format\":\"uri\",\"type\":\"string\"},\"updated\":{\"description\":\"Last update timestamp\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}]}},\"application/x-yaml\":{\"schema\":{\"allOf\":[{\"properties\":{\"address\":{\"description\":\"Physical address of the food bank\",\"type\":\"string\"},\"email\":{\"description\":\"Contact email address\",\"format\":\"email\",\"type\":\"string\"},\"latitude\":{\"description\":\"Latitude coordinate\",\"format\":\"double\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude coordinate\",\"format\":\"double\",\"type\":\"number\"},\"name\":{\"description\":\"Name of the food bank\",\"type\":\"string\"},\"phone\":{\"description\":\"Contact phone number\",\"type\":\"string\"},\"postcode\":{\"description\":\"Postal code\",\"type\":\"string\"},\"slug\":{\"description\":\"Unique identifier for the food bank\",\"type\":\"string\"},\"url\":{\"description\":\"Website URL\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},{\"properties\":{\"items_needed\":{\"description\":\"List of items currently needed for donation\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"needs\":{\"description\":\"Current needs status\",\"type\":\"object\"},\"shopping_list_url\":{\"description\":\"URL to the food bank's detailed shopping list\",\"format\":\"uri\",\"type\":\"string\"},\"updated\":{\"description\":\"Last update timestamp\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}]}},\"application/xml\":{\"schema\":{\"allOf\":[{\"properties\":{\"address\":{\"description\":\"Physical address of the food bank\",\"type\":\"string\"},\"email\":{\"description\":\"Contact email address\",\"format\":\"email\",\"type\":\"string\"},\"latitude\":{\"description\":\"Latitude coordinate\",\"format\":\"double\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude coordinate\",\"format\":\"double\",\"type\":\"number\"},\"name\":{\"description\":\"Name of the food bank\",\"type\":\"string\"},\"phone\":{\"description\":\"Contact phone number\",\"type\":\"string\"},\"postcode\":{\"description\":\"Postal code\",\"type\":\"string\"},\"slug\":{\"description\":\"Unique identifier for the food bank\",\"type\":\"string\"},\"url\":{\"description\":\"Website URL\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},{\"properties\":{\"items_needed\":{\"description\":\"List of items currently needed for donation\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"needs\":{\"description\":\"Current needs status\",\"type\":\"object\"},\"shopping_list_url\":{\"description\":\"URL to the food bank's detailed shopping list\",\"format\":\"uri\",\"type\":\"string\"},\"updated\":{\"description\":\"Last update timestamp\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}]}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Food bank not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/foodbanks/{slug}/", "rename": { "param": { "slug": "id" } }, "segments": [{ "lit": "foodbanks" }, { "var": "id" }], "select": { "exist": ["format", "id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "foodbank", "name__orig": "foodbank", "Name": "Foodbank", "name_": "foodbank", "name-": "foodbank", "NAME": "FOODBANK", "index$": 2 }, { "active": true, "entity": "foodbank", "key$": "BasicFoodbankFlow", "kind": "basic", "name": "BasicFoodbankFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "foodbank_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "foodbank_ref01", "srcdatavar": "foodbank_ref01_data", "suffix": "_dt0" }, "match": { "id": "foodbank01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-foodbank_ref01" } }], "index$": 1 }] }, 'Foodbank');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let foodbank_ref01_data = Object.values(setup.data.existing.foodbank)[0];
        // LIST
        const foodbank_ref01_ent = client.Foodbank();
        const foodbank_ref01_match = {};
        const foodbank_ref01_list = (await foodbank_ref01_ent.list(foodbank_ref01_match)).map((e) => e.data());
        // LOAD
        const foodbank_ref01_match_dt0 = {};
        foodbank_ref01_match_dt0.id = foodbank_ref01_data.id;
        const foodbank_ref01_data_dt0 = (await foodbank_ref01_ent.load(foodbank_ref01_match_dt0)).data();
        (0, node_assert_1.default)(foodbank_ref01_data_dt0.id === foodbank_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/foodbank/FoodbankTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GiveFoodSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['foodbank01', 'foodbank02', 'foodbank03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GIVE_FOOD_TEST_FOODBANK_ENTID': idmap,
        'GIVE_FOOD_TEST_LIVE': 'FALSE',
        'GIVE_FOOD_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['GIVE_FOOD_TEST_FOODBANK_ENTID'];
    const live = 'TRUE' === env.GIVE_FOOD_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GIVE_FOOD_TEST_FOODBANK_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.GiveFoodSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=FoodbankEntity.test.js.map