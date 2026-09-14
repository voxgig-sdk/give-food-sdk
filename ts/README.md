# GiveFood TypeScript SDK



The TypeScript SDK for the GiveFood API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Article()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/give-food-sdk/releases](https://github.com/voxgig-sdk/give-food-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { GiveFoodSDK } from '@voxgig-sdk/give-food-sdk'

const client = new GiveFoodSDK()
```

### 2. List article records

`list()` resolves to an array of Article ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const articles = await client.Article().list()

for (const article of articles) {
  console.log(article)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const articles = await client.Article().list()
  console.log(articles)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = GiveFoodSDK.test()

const article = await client.Article().list()
// article is the entity, populated with mock response data
// — call article.data() for the record itself
console.log(article)
```

You can also use the instance method:

```ts
const client = new GiveFoodSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Article()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new GiveFoodSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
GIVE_FOOD_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### GiveFoodSDK

#### Constructor

```ts
new GiveFoodSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Article(data?)` | `ArticleEntity` | Create an Article entity instance. |
| `Donationpoint(data?)` | `DonationpointEntity` | Create a Donationpoint entity instance. |
| `Foodbank(data?)` | `FoodbankEntity` | Create a Foodbank entity instance. |
| `Item(data?)` | `ItemEntity` | Create an Item entity instance. |
| `tester(testopts?, sdkopts?)` | `GiveFoodSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `GiveFoodSDK.test(testopts?, sdkopts?)` | `GiveFoodSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): GiveFoodSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Article

| Field | Description |
| --- | --- |
| `foodbank_slug` | Related food bank identifier |
| `id` | Unique identifier for the article |
| `published` | Publication date |
| `source` | Publication source |
| `title` | Article title |
| `url` | URL to the article |

Operations: list.

API path: `/articles/`

#### Donationpoint

| Field | Description |
| --- | --- |
| `address` | Physical address |
| `foodbank_slug` | Associated food bank identifier |
| `id` |  |
| `latitude` | Latitude coordinate |
| `longitude` | Longitude coordinate |
| `name` | Name of the donation point |
| `postcode` | Postal code |
| `slug` | Unique identifier for the donation point |
| `type` | Type of donation point (e.g., supermarket, collection point) |

Operations: list, load.

API path: `/donationpoints/`

#### Foodbank

| Field | Description |
| --- | --- |
| `address` | Physical address of the food bank |
| `email` | Contact email address |
| `id` |  |
| `items_needed` | List of items currently needed for donation |
| `latitude` | Latitude coordinate |
| `longitude` | Longitude coordinate |
| `name` | Name of the food bank |
| `needs` | Current needs status |
| `phone` | Contact phone number |
| `postcode` | Postal code |
| `shopping_list_url` | URL to the food bank's detailed shopping list |
| `slug` | Unique identifier for the food bank |
| `updated` | Last update timestamp |
| `url` | Website URL |

Operations: list, load.

API path: `/foodbanks/`

#### Item

| Field | Description |
| --- | --- |
| `created` | When this need was recorded |
| `foodbank_slug` | Food bank identifier |
| `id` | Unique identifier for the item need record |
| `item` | Name of the item needed |
| `updated` | Last update timestamp |

Operations: list.

API path: `/items/`



## Entities


### Article

Create an instance: `const article = client.Article()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `foodbank_slug` | `string` | Related food bank identifier |
| `id` | `number` | Unique identifier for the article |
| `published` | `string` | Publication date |
| `source` | `string` | Publication source |
| `title` | `string` | Article title |
| `url` | `string` | URL to the article |

#### Example: List

```ts
const articles = await client.Article().list()
```


### Donationpoint

Create an instance: `const donationpoint = client.Donationpoint()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `string` | Physical address |
| `foodbank_slug` | `string` | Associated food bank identifier |
| `id` | `string` |  |
| `latitude` | `number` | Latitude coordinate |
| `longitude` | `number` | Longitude coordinate |
| `name` | `string` | Name of the donation point |
| `postcode` | `string` | Postal code |
| `slug` | `string` | Unique identifier for the donation point |
| `type` | `string` | Type of donation point (e.g., supermarket, collection point) |

#### Example: Load

```ts
const donationpoint = await client.Donationpoint().load({ id: 'donationpoint_id' })
```

#### Example: List

```ts
const donationpoints = await client.Donationpoint().list()
```


### Foodbank

Create an instance: `const foodbank = client.Foodbank()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `string` | Physical address of the food bank |
| `email` | `string` | Contact email address |
| `id` | `string` |  |
| `items_needed` | `any[]` | List of items currently needed for donation |
| `latitude` | `number` | Latitude coordinate |
| `longitude` | `number` | Longitude coordinate |
| `name` | `string` | Name of the food bank |
| `needs` | `Record<string, any>` | Current needs status |
| `phone` | `string` | Contact phone number |
| `postcode` | `string` | Postal code |
| `shopping_list_url` | `string` | URL to the food bank's detailed shopping list |
| `slug` | `string` | Unique identifier for the food bank |
| `updated` | `string` | Last update timestamp |
| `url` | `string` | Website URL |

#### Example: Load

```ts
const foodbank = await client.Foodbank().load({ id: 'foodbank_id' })
```

#### Example: List

```ts
const foodbanks = await client.Foodbank().list()
```


### Item

Create an instance: `const item = client.Item()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created` | `string` | When this need was recorded |
| `foodbank_slug` | `string` | Food bank identifier |
| `id` | `number` | Unique identifier for the item need record |
| `item` | `string` | Name of the item needed |
| `updated` | `string` | Last update timestamp |

#### Example: List

```ts
const items = await client.Item().list()
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
give-food/
├── src/
│   ├── GiveFoodSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { GiveFoodSDK } from '@voxgig-sdk/give-food-sdk'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const article = client.Article()
await article.list()

// article.data() now returns the article data from the last `list`
// article.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
