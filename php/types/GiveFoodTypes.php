<?php
declare(strict_types=1);

// Typed models for the GiveFood SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Article entity data model. */
class Article
{
    public ?string $foodbank_slug = null;
    public ?int $id = null;
    public ?string $published = null;
    public ?string $source = null;
    public ?string $title = null;
    public ?string $url = null;
}

/** Match filter for Article#list (any subset of Article fields). */
class ArticleListMatch
{
    public ?string $foodbank_slug = null;
    public ?int $id = null;
    public ?string $published = null;
    public ?string $source = null;
    public ?string $title = null;
    public ?string $url = null;
}

/** Donationpoint entity data model. */
class Donationpoint
{
    public ?string $address = null;
    public ?string $foodbank_slug = null;
    public ?float $latitude = null;
    public ?float $longitude = null;
    public ?string $name = null;
    public ?string $postcode = null;
    public ?string $slug = null;
    public ?string $type = null;
}

/** Request payload for Donationpoint#load. */
class DonationpointLoadMatch
{
    public string $id;
}

/** Match filter for Donationpoint#list (any subset of Donationpoint fields). */
class DonationpointListMatch
{
    public ?string $address = null;
    public ?string $foodbank_slug = null;
    public ?float $latitude = null;
    public ?float $longitude = null;
    public ?string $name = null;
    public ?string $postcode = null;
    public ?string $slug = null;
    public ?string $type = null;
}

/** Foodbank entity data model. */
class Foodbank
{
    public ?string $address = null;
    public ?string $email = null;
    public ?array $items_needed = null;
    public ?float $latitude = null;
    public ?float $longitude = null;
    public ?string $name = null;
    public ?array $need = null;
    public ?string $phone = null;
    public ?string $postcode = null;
    public ?string $shopping_list_url = null;
    public ?string $slug = null;
    public ?string $updated = null;
    public ?string $url = null;
}

/** Request payload for Foodbank#load. */
class FoodbankLoadMatch
{
    public string $id;
}

/** Match filter for Foodbank#list (any subset of Foodbank fields). */
class FoodbankListMatch
{
    public ?string $address = null;
    public ?string $email = null;
    public ?array $items_needed = null;
    public ?float $latitude = null;
    public ?float $longitude = null;
    public ?string $name = null;
    public ?array $need = null;
    public ?string $phone = null;
    public ?string $postcode = null;
    public ?string $shopping_list_url = null;
    public ?string $slug = null;
    public ?string $updated = null;
    public ?string $url = null;
}

/** Item entity data model. */
class Item
{
    public ?string $created = null;
    public ?string $foodbank_slug = null;
    public ?int $id = null;
    public ?string $item = null;
    public ?string $updated = null;
}

/** Match filter for Item#list (any subset of Item fields). */
class ItemListMatch
{
    public ?string $created = null;
    public ?string $foodbank_slug = null;
    public ?int $id = null;
    public ?string $item = null;
    public ?string $updated = null;
}

