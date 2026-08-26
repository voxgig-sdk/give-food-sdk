# GiveFood PHP SDK Reference

Complete API reference for the GiveFood PHP SDK.


## GiveFoodSDK

### Constructor

```php
require_once __DIR__ . '/givefood_sdk.php';

$client = new GiveFoodSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `GiveFoodSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = GiveFoodSDK::test();
```


### Instance Methods

#### `Article($data = null)`

Create a new `ArticleEntity` instance. Pass `null` for no initial data.

#### `Donationpoint($data = null)`

Create a new `DonationpointEntity` instance. Pass `null` for no initial data.

#### `Foodbank($data = null)`

Create a new `FoodbankEntity` instance. Pass `null` for no initial data.

#### `Item($data = null)`

Create a new `ItemEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): GiveFoodUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## ArticleEntity

```php
$article = $client->Article();
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Article()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ArticleEntity`

Create a new `ArticleEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DonationpointEntity

```php
$donationpoint = $client->Donationpoint();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | No | Physical address |
| `foodbank_slug` | `string` | No | Associated food bank identifier |
| `id` | `string` | No |  |
| `latitude` | `float` | No | Latitude coordinate |
| `longitude` | `float` | No | Longitude coordinate |
| `name` | `string` | No | Name of the donation point |
| `postcode` | `string` | No | Postal code |
| `slug` | `string` | No | Unique identifier for the donation point |
| `type` | `string` | No | Type of donation point (e.g., supermarket, collection point) |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Donationpoint()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Donationpoint()->load(["id" => "donationpoint_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DonationpointEntity`

Create a new `DonationpointEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## FoodbankEntity

```php
$foodbank = $client->Foodbank();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | No | Physical address of the food bank |
| `email` | `string` | No | Contact email address |
| `id` | `string` | No |  |
| `items_needed` | `array` | No | List of items currently needed for donation |
| `latitude` | `float` | No | Latitude coordinate |
| `longitude` | `float` | No | Longitude coordinate |
| `name` | `string` | No | Name of the food bank |
| `needs` | `array` | No | Current needs status |
| `phone` | `string` | No | Contact phone number |
| `postcode` | `string` | No | Postal code |
| `shopping_list_url` | `string` | No | URL to the food bank's detailed shopping list |
| `slug` | `string` | No | Unique identifier for the food bank |
| `updated` | `string` | No | Last update timestamp |
| `url` | `string` | No | Website URL |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Foodbank()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Foodbank()->load(["id" => "foodbank_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): FoodbankEntity`

Create a new `FoodbankEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ItemEntity

```php
$item = $client->Item();
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Item()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ItemEntity`

Create a new `ItemEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new GiveFoodSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

