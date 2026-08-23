# GiveFood Golang SDK Reference

Complete API reference for the GiveFood Golang SDK.


## GiveFoodSDK

### Constructor

```go
func NewGiveFoodSDK(options map[string]any) *GiveFoodSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *GiveFoodSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *GiveFoodSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Article(data map[string]any) GiveFoodEntity`

Create a new `Article` entity instance. Pass `nil` for no initial data.

#### `Donationpoint(data map[string]any) GiveFoodEntity`

Create a new `Donationpoint` entity instance. Pass `nil` for no initial data.

#### `Foodbank(data map[string]any) GiveFoodEntity`

Create a new `Foodbank` entity instance. Pass `nil` for no initial data.

#### `Item(data map[string]any) GiveFoodEntity`

Create a new `Item` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## ArticleEntity

```go
article := client.Article(nil)
fmt.Println(article.GetName()) // "article"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `foodbank_slug` | `string` | No | Related food bank identifier |
| `id` | `int` | No | Unique identifier for the article |
| `published` | `string` | No | Publication date |
| `source` | `string` | No | Publication source |
| `title` | `string` | No | Article title |
| `url` | `string` | No | URL to the article |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Article(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ArticleEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## DonationpointEntity

```go
donationpoint := client.Donationpoint(nil)
fmt.Println(donationpoint.GetName()) // "donationpoint"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | No | Physical address |
| `foodbank_slug` | `string` | No | Associated food bank identifier |
| `latitude` | `float64` | No | Latitude coordinate |
| `longitude` | `float64` | No | Longitude coordinate |
| `name` | `string` | No | Name of the donation point |
| `postcode` | `string` | No | Postal code |
| `slug` | `string` | No | Unique identifier for the donation point |
| `type` | `string` | No | Type of donation point (e.g., supermarket, collection point) |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Donationpoint(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Donationpoint(nil).Load(map[string]any{"id": "donationpoint_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DonationpointEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## FoodbankEntity

```go
foodbank := client.Foodbank(nil)
fmt.Println(foodbank.GetName()) // "foodbank"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | No | Physical address of the food bank |
| `email` | `string` | No | Contact email address |
| `items_needed` | `[]any` | No | List of items currently needed for donation |
| `latitude` | `float64` | No | Latitude coordinate |
| `longitude` | `float64` | No | Longitude coordinate |
| `name` | `string` | No | Name of the food bank |
| `needs` | `map[string]any` | No | Current needs status |
| `phone` | `string` | No | Contact phone number |
| `postcode` | `string` | No | Postal code |
| `shopping_list_url` | `string` | No | URL to the food bank's detailed shopping list |
| `slug` | `string` | No | Unique identifier for the food bank |
| `updated` | `string` | No | Last update timestamp |
| `url` | `string` | No | Website URL |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Foodbank(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Foodbank(nil).Load(map[string]any{"id": "foodbank_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `FoodbankEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ItemEntity

```go
item := client.Item(nil)
fmt.Println(item.GetName()) // "item"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created` | `string` | No | When this need was recorded |
| `foodbank_slug` | `string` | No | Food bank identifier |
| `id` | `int` | No | Unique identifier for the item need record |
| `item` | `string` | No | Name of the item needed |
| `updated` | `string` | No | Last update timestamp |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Item(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ItemEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewGiveFoodSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

