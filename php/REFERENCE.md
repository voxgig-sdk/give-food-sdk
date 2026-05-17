# GiveFood PHP SDK Reference

Complete API reference for the GiveFood PHP SDK.


## GiveFoodSDK

### Constructor

```php
require_once __DIR__ . '/give-food_sdk.php';

$client = new GiveFoodSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
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

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. Returns `[$result, $err]`.

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

**Returns:** `array [$result, $err]`

#### `prepare(array $fetchargs = []): array`

Prepare a fetch definition without sending the request. Returns `[$fetchdef, $err]`.


---

## ArticleEntity

```php
$article = $client->Article();
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

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Article()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ArticleEntity`

Create a new `ArticleEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## DonationpointEntity

```php
$donationpoint = $client->Donationpoint();
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

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Donationpoint()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Donationpoint()->load(["id" => "donationpoint_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): DonationpointEntity`

Create a new `DonationpointEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## FoodbankEntity

```php
$foodbank = $client->Foodbank();
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

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Foodbank()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Foodbank()->load(["id" => "foodbank_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): FoodbankEntity`

Create a new `FoodbankEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## ItemEntity

```php
$item = $client->Item();
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

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Item()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ItemEntity`

Create a new `ItemEntity` instance with the same client and
options.

#### `getName(): string`

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

