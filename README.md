# GiveFood SDK

Query the UK's largest open database of food banks, their locations, and what they need donated

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Give Food API

[Give Food](https://www.givefood.org.uk/) maintains the largest public database of UK food banks and the items they are asking the public to donate. The data is curated from food bank websites and social feeds and is offered as a free read-only API to anyone building apps, maps, or services that help people give food where it is needed.

What you get from the API:

- Food bank organisations with contact details, addresses, and current needs.
- Individual food bank locations (distribution centres, donation points) with geographic and political-geography metadata.
- Latest "needs" — short text snapshots of what food banks have been asking for, harvested from their public channels.
- UK parliamentary constituency lookups that tie food banks to their MP and constituency.
- Search by postcode/address or by latitude and longitude to find the nearest open food banks.

Responses are available in JSON, GeoJSON, XML, YAML, and CSV. No authentication or API key is required, and CORS is enabled so the API can be called directly from browser code. Daily data dumps are also published for bulk use.

## Try it

**TypeScript**
```bash
npm install give-food
```

**Python**
```bash
pip install give-food-sdk
```

**PHP**
```bash
composer require voxgig/give-food-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/give-food-sdk/go
```

**Ruby**
```bash
gem install give-food-sdk
```

**Lua**
```bash
luarocks install give-food-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { GiveFoodSDK } from 'give-food'

const client = new GiveFoodSDK({})

// List all articles
const articles = await client.Article().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o give-food-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "give-food": {
      "command": "/abs/path/to/give-food-mcp"
    }
  }
}
```

## Entities

The API exposes 4 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Article** | A news or update article published by Give Food about food banks and the wider donation network. | `/articles/` |
| **Donationpoint** | An individual food bank location or drop-off point with address, geographic coordinates, and political-geography metadata; available via `/api/2/locations` and `/api/2/locations/search`. | `/donationpoints/` |
| **Foodbank** | A food bank organisation — name, address, contact details, and current donation needs; available at `/api/2/foodbanks` and `/api/2/foodbank/{slug}`. | `/foodbanks/` |
| **Item** | A specific item that a food bank is requesting or has in excess, surfaced as part of a food bank's current needs list. | `/items/` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from givefood_sdk import GiveFoodSDK

client = GiveFoodSDK({})

# List all articles
articles, err = client.Article(None).list(None, None)
```

### PHP

```php
<?php
require_once 'givefood_sdk.php';

$client = new GiveFoodSDK([]);

// List all articles
[$articles, $err] = $client->Article(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/give-food-sdk/go"

client := sdk.NewGiveFoodSDK(map[string]any{})

// List all articles
articles, err := client.Article(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "GiveFood_sdk"

client = GiveFoodSDK.new({})

# List all articles
articles, err = client.Article(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("give-food_sdk")

local client = sdk.new({})

-- List all articles
local articles, err = client:Article(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = GiveFoodSDK.test()
const result = await client.Article().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = GiveFoodSDK.test(None, None)
result, err = client.Article(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = GiveFoodSDK::test(null, null);
[$result, $err] = $client->Article(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Article(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = GiveFoodSDK.test(nil, nil)
result, err = client.Article(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Article(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Give Food API

- Upstream: [https://www.givefood.org.uk/](https://www.givefood.org.uk/)
- API docs: [https://www.givefood.org.uk/api/2/docs/](https://www.givefood.org.uk/api/2/docs/)

- Free to use, but attribution is required: credit Give Food with a link wherever the data appears.
- When showing a food bank's details, link to that food bank; when showing needed items, link to the food bank's shopping list URL.
- Do not reorder or modify item lists, and treat them as guidance rather than a strict shopping list.
- Do not use contact details for bulk email, calling, or messaging, and keep cached data fresh (the source updates multiple times daily).

---

Generated from the Give Food API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
