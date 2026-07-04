# GiveFood TypeScript SDK Reference

Complete API reference for the GiveFood TypeScript SDK.


## GiveFoodSDK

### Constructor

```ts
new GiveFoodSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `GiveFoodSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = GiveFoodSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `GiveFoodSDK` instance in test mode.


### Instance Methods

#### `Article(data?: object)`

Create a new `Article` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ArticleEntity` instance.

#### `Donationpoint(data?: object)`

Create a new `Donationpoint` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DonationpointEntity` instance.

#### `Foodbank(data?: object)`

Create a new `Foodbank` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FoodbankEntity` instance.

#### `Item(data?: object)`

Create a new `Item` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ItemEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `GiveFoodSDK.test()`.

**Returns:** `GiveFoodSDK` instance in test mode.


---

## ArticleEntity

```ts
const article = client.Article()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `foodbank_slug` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `published` | ``$STRING`` | No |  |
| `source` | ``$STRING`` | No |  |
| `title` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Article().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ArticleEntity` instance with the same client and
options.

#### `client()`

Return the parent `GiveFoodSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DonationpointEntity

```ts
const donationpoint = client.Donationpoint()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | ``$STRING`` | No |  |
| `foodbank_slug` | ``$STRING`` | No |  |
| `latitude` | ``$NUMBER`` | No |  |
| `longitude` | ``$NUMBER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `postcode` | ``$STRING`` | No |  |
| `slug` | ``$STRING`` | No |  |
| `type` | ``$STRING`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Donationpoint().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Donationpoint().load({ id: 'donationpoint_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DonationpointEntity` instance with the same client and
options.

#### `client()`

Return the parent `GiveFoodSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FoodbankEntity

```ts
const foodbank = client.Foodbank()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | ``$STRING`` | No |  |
| `email` | ``$STRING`` | No |  |
| `items_needed` | ``$ARRAY`` | No |  |
| `latitude` | ``$NUMBER`` | No |  |
| `longitude` | ``$NUMBER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `need` | ``$OBJECT`` | No |  |
| `phone` | ``$STRING`` | No |  |
| `postcode` | ``$STRING`` | No |  |
| `shopping_list_url` | ``$STRING`` | No |  |
| `slug` | ``$STRING`` | No |  |
| `updated` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Foodbank().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Foodbank().load({ id: 'foodbank_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FoodbankEntity` instance with the same client and
options.

#### `client()`

Return the parent `GiveFoodSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ItemEntity

```ts
const item = client.Item()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created` | ``$STRING`` | No |  |
| `foodbank_slug` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `item` | ``$STRING`` | No |  |
| `updated` | ``$STRING`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Item().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ItemEntity` instance with the same client and
options.

#### `client()`

Return the parent `GiveFoodSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new GiveFoodSDK({
  feature: {
    test: { active: true },
  }
})
```

