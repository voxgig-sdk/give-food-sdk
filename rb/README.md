# GiveFood Ruby SDK



The Ruby SDK for the GiveFood API — an entity-oriented client using idiomatic Ruby conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/give-food-sdk/releases](https://github.com/voxgig-sdk/give-food-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "GiveFood_sdk"

client = GiveFoodSDK.new
```

### 2. List article records

```ruby
begin
  # list returns an Array of Article records — iterate directly.
  articles = client.Article.list
  articles.each do |item|
    puts "#{item["id"]} #{item["name"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  warn result["err"]
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```ruby
client = GiveFoodSDK.test({
  "entity" => { "article" => { "test01" => { "id" => "test01" } } },
})

# load returns the bare mock record (raises on error).
article = client.Article.load({ "id" => "test01" })
puts article
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = GiveFoodSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
GIVE_FOOD_TEST_LIVE=TRUE
```

Then run:

```bash
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### GiveFoodSDK

```ruby
require_relative "GiveFood_sdk"
client = GiveFoodSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = GiveFoodSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### GiveFoodSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `Article` | `(data) -> ArticleEntity` | Create an Article entity instance. |
| `Donationpoint` | `(data) -> DonationpointEntity` | Create a Donationpoint entity instance. |
| `Foodbank` | `(data) -> FoodbankEntity` | Create a Foodbank entity instance. |
| `Item` | `(data) -> ItemEntity` | Create an Item entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch, ctrl) -> Array` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `GiveFoodError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

### Entities

#### Article

| Field | Description |
| --- | --- |
| `foodbank_slug` |  |
| `id` |  |
| `published` |  |
| `source` |  |
| `title` |  |
| `url` |  |

Operations: List.

API path: `/articles/`

#### Donationpoint

| Field | Description |
| --- | --- |
| `address` |  |
| `foodbank_slug` |  |
| `latitude` |  |
| `longitude` |  |
| `name` |  |
| `postcode` |  |
| `slug` |  |
| `type` |  |

Operations: List, Load.

API path: `/donationpoints/`

#### Foodbank

| Field | Description |
| --- | --- |
| `address` |  |
| `email` |  |
| `items_needed` |  |
| `latitude` |  |
| `longitude` |  |
| `name` |  |
| `need` |  |
| `phone` |  |
| `postcode` |  |
| `shopping_list_url` |  |
| `slug` |  |
| `updated` |  |
| `url` |  |

Operations: List, Load.

API path: `/foodbanks/`

#### Item

| Field | Description |
| --- | --- |
| `created` |  |
| `foodbank_slug` |  |
| `id` |  |
| `item` |  |
| `updated` |  |

Operations: List.

API path: `/items/`



## Entities


### Article

Create an instance: `article = client.Article`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `foodbank_slug` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `published` | ``$STRING`` |  |
| `source` | ``$STRING`` |  |
| `title` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

#### Example: List

```ruby
# list returns an Array of Article records (raises on error).
articles = client.Article.list
```


### Donationpoint

Create an instance: `donationpoint = client.Donationpoint`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | ``$STRING`` |  |
| `foodbank_slug` | ``$STRING`` |  |
| `latitude` | ``$NUMBER`` |  |
| `longitude` | ``$NUMBER`` |  |
| `name` | ``$STRING`` |  |
| `postcode` | ``$STRING`` |  |
| `slug` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |

#### Example: Load

```ruby
# load returns the bare Donationpoint record (raises on error).
donationpoint = client.Donationpoint.load({ "id" => "donationpoint_id" })
```

#### Example: List

```ruby
# list returns an Array of Donationpoint records (raises on error).
donationpoints = client.Donationpoint.list
```


### Foodbank

Create an instance: `foodbank = client.Foodbank`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | ``$STRING`` |  |
| `email` | ``$STRING`` |  |
| `items_needed` | ``$ARRAY`` |  |
| `latitude` | ``$NUMBER`` |  |
| `longitude` | ``$NUMBER`` |  |
| `name` | ``$STRING`` |  |
| `need` | ``$OBJECT`` |  |
| `phone` | ``$STRING`` |  |
| `postcode` | ``$STRING`` |  |
| `shopping_list_url` | ``$STRING`` |  |
| `slug` | ``$STRING`` |  |
| `updated` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

#### Example: Load

```ruby
# load returns the bare Foodbank record (raises on error).
foodbank = client.Foodbank.load({ "id" => "foodbank_id" })
```

#### Example: List

```ruby
# list returns an Array of Foodbank records (raises on error).
foodbanks = client.Foodbank.list
```


### Item

Create an instance: `item = client.Item`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created` | ``$STRING`` |  |
| `foodbank_slug` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `item` | ``$STRING`` |  |
| `updated` | ``$STRING`` |  |

#### Example: List

```ruby
# list returns an Array of Item records (raises on error).
items = client.Item.list
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller as a second return value.

### Features and hooks

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── GiveFood_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`GiveFood_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```ruby
article = client.Article
article.load({ "id" => "example_id" })

# article.data_get now returns the loaded article data
# article.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
