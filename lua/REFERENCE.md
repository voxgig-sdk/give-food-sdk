# GiveFood Lua SDK Reference

Complete API reference for the GiveFood Lua SDK.


## GiveFoodSDK

### Constructor

```lua
local sdk = require("give-food_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Article(data)`

Create a new `Article` entity instance. Pass `nil` for no initial data.

#### `Donationpoint(data)`

Create a new `Donationpoint` entity instance. Pass `nil` for no initial data.

#### `Foodbank(data)`

Create a new `Foodbank` entity instance. Pass `nil` for no initial data.

#### `Item(data)`

Create a new `Item` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## ArticleEntity

```lua
local article = client:Article(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `foodbank_slug` | `string` | No | Related food bank identifier |
| `id` | `number` | No | Unique identifier for the article |
| `published` | `string` | No | Publication date |
| `source` | `string` | No | Publication source |
| `title` | `string` | No | Article title |
| `url` | `string` | No | URL to the article |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Article():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ArticleEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DonationpointEntity

```lua
local donationpoint = client:Donationpoint(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | No | Physical address |
| `foodbank_slug` | `string` | No | Associated food bank identifier |
| `id` | `string` | No |  |
| `latitude` | `number` | No | Latitude coordinate |
| `longitude` | `number` | No | Longitude coordinate |
| `name` | `string` | No | Name of the donation point |
| `postcode` | `string` | No | Postal code |
| `slug` | `string` | No | Unique identifier for the donation point |
| `type` | `string` | No | Type of donation point (e.g., supermarket, collection point) |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Donationpoint():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Donationpoint():load({ id = "donationpoint_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DonationpointEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## FoodbankEntity

```lua
local foodbank = client:Foodbank(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | No | Physical address of the food bank |
| `email` | `string` | No | Contact email address |
| `id` | `string` | No |  |
| `items_needed` | `table` | No | List of items currently needed for donation |
| `latitude` | `number` | No | Latitude coordinate |
| `longitude` | `number` | No | Longitude coordinate |
| `name` | `string` | No | Name of the food bank |
| `needs` | `table` | No | Current needs status |
| `phone` | `string` | No | Contact phone number |
| `postcode` | `string` | No | Postal code |
| `shopping_list_url` | `string` | No | URL to the food bank's detailed shopping list |
| `slug` | `string` | No | Unique identifier for the food bank |
| `updated` | `string` | No | Last update timestamp |
| `url` | `string` | No | Website URL |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Foodbank():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Foodbank():load({ id = "foodbank_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FoodbankEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ItemEntity

```lua
local item = client:Item(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created` | `string` | No | When this need was recorded |
| `foodbank_slug` | `string` | No | Food bank identifier |
| `id` | `number` | No | Unique identifier for the item need record |
| `item` | `string` | No | Name of the item needed |
| `updated` | `string` | No | Last update timestamp |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Item():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ItemEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

