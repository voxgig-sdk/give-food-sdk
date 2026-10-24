"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "article",
        "accessor": "Article",
        "op": "list",
        "method": "GET",
        "path": "/articles/",
        "args": [],
        "select": {
            "format": "json"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json",
            "application/xml",
            "application/x-yaml"
        ],
        "query": [
            "format"
        ],
        "queryArgs": [
            {
                "name": "format",
                "wire": "format"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "id": 1,
                "title": "x",
                "url": "x",
                "published": "2026-01-01T00:00:00Z",
                "source": "x",
                "foodbank_slug": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "donation_point",
        "accessor": "DonationPoint",
        "op": "list",
        "method": "GET",
        "path": "/donationpoints/",
        "args": [],
        "select": {
            "format": "json"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json",
            "application/geo+json",
            "application/xml",
            "application/x-yaml"
        ],
        "query": [
            "format"
        ],
        "queryArgs": [
            {
                "name": "format",
                "wire": "format"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "slug": "x",
                "name": "x",
                "address": "x",
                "postcode": "x",
                "latitude": 1,
                "longitude": 1,
                "foodbank_slug": "x",
                "type": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "donation_point",
        "accessor": "DonationPoint",
        "op": "load",
        "method": "GET",
        "path": "/donationpoints/{slug}/",
        "args": [
            {
                "name": "slug",
                "wire": "slug",
                "value": "p1"
            }
        ],
        "select": {
            "format": "json"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json",
            "application/xml",
            "application/x-yaml"
        ],
        "query": [
            "format"
        ],
        "queryArgs": [
            {
                "name": "format",
                "wire": "format"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "slug": "x",
            "name": "x",
            "address": "x",
            "postcode": "x",
            "latitude": 1,
            "longitude": 1,
            "foodbank_slug": "x",
            "type": "x"
        },
        "idField": "id"
    },
    {
        "entity": "food_bank",
        "accessor": "FoodBank",
        "op": "list",
        "method": "GET",
        "path": "/foodbanks/",
        "args": [],
        "select": {
            "format": "json"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json",
            "application/geo+json",
            "application/xml",
            "application/x-yaml"
        ],
        "query": [
            "format"
        ],
        "queryArgs": [
            {
                "name": "format",
                "wire": "format"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "slug": "x",
                "name": "x",
                "address": "x",
                "postcode": "x",
                "url": "x",
                "latitude": 1,
                "longitude": 1,
                "phone": "x",
                "email": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "food_bank",
        "accessor": "FoodBank",
        "op": "load",
        "method": "GET",
        "path": "/foodbanks/{slug}/",
        "args": [
            {
                "name": "slug",
                "wire": "slug",
                "value": "p1"
            }
        ],
        "select": {
            "format": "json"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json",
            "application/xml",
            "application/x-yaml"
        ],
        "query": [
            "format"
        ],
        "queryArgs": [
            {
                "name": "format",
                "wire": "format"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "slug": "x",
            "name": "x",
            "address": "x",
            "postcode": "x",
            "url": "x",
            "latitude": 1,
            "longitude": 1,
            "phone": "x",
            "email": "x",
            "items_needed": [
                "x"
            ],
            "shopping_list_url": "x",
            "updated": "2026-01-01T00:00:00Z",
            "needs": {}
        },
        "idField": "id"
    },
    {
        "entity": "item",
        "accessor": "Item",
        "op": "list",
        "method": "GET",
        "path": "/items/",
        "args": [],
        "select": {
            "format": "json"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json",
            "application/xml",
            "application/x-yaml"
        ],
        "query": [
            "format"
        ],
        "queryArgs": [
            {
                "name": "format",
                "wire": "format"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "id": 1,
                "foodbank_slug": "x",
                "item": "x",
                "created": "2026-01-01T00:00:00Z",
                "updated": "2026-01-01T00:00:00Z"
            }
        ],
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map