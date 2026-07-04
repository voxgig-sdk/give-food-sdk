// Typed models for the GiveFood SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Article is the typed data model for the article entity.
type Article struct {
	FoodbankSlug *string `json:"foodbank_slug,omitempty"`
	Id *int `json:"id,omitempty"`
	Published *string `json:"published,omitempty"`
	Source *string `json:"source,omitempty"`
	Title *string `json:"title,omitempty"`
	Url *string `json:"url,omitempty"`
}

// ArticleListMatch mirrors the article fields as an all-optional match
// filter (Go analog of Partial<Article>).
type ArticleListMatch struct {
	FoodbankSlug *string `json:"foodbank_slug,omitempty"`
	Id *int `json:"id,omitempty"`
	Published *string `json:"published,omitempty"`
	Source *string `json:"source,omitempty"`
	Title *string `json:"title,omitempty"`
	Url *string `json:"url,omitempty"`
}

// Donationpoint is the typed data model for the donationpoint entity.
type Donationpoint struct {
	Address *string `json:"address,omitempty"`
	FoodbankSlug *string `json:"foodbank_slug,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	Name *string `json:"name,omitempty"`
	Postcode *string `json:"postcode,omitempty"`
	Slug *string `json:"slug,omitempty"`
	Type *string `json:"type,omitempty"`
}

// DonationpointLoadMatch is the typed request payload for Donationpoint.LoadTyped.
type DonationpointLoadMatch struct {
	Id string `json:"id"`
}

// DonationpointListMatch mirrors the donationpoint fields as an all-optional match
// filter (Go analog of Partial<Donationpoint>).
type DonationpointListMatch struct {
	Address *string `json:"address,omitempty"`
	FoodbankSlug *string `json:"foodbank_slug,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	Name *string `json:"name,omitempty"`
	Postcode *string `json:"postcode,omitempty"`
	Slug *string `json:"slug,omitempty"`
	Type *string `json:"type,omitempty"`
}

// Foodbank is the typed data model for the foodbank entity.
type Foodbank struct {
	Address *string `json:"address,omitempty"`
	Email *string `json:"email,omitempty"`
	ItemsNeeded *[]any `json:"items_needed,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	Name *string `json:"name,omitempty"`
	Need *map[string]any `json:"need,omitempty"`
	Phone *string `json:"phone,omitempty"`
	Postcode *string `json:"postcode,omitempty"`
	ShoppingListUrl *string `json:"shopping_list_url,omitempty"`
	Slug *string `json:"slug,omitempty"`
	Updated *string `json:"updated,omitempty"`
	Url *string `json:"url,omitempty"`
}

// FoodbankLoadMatch is the typed request payload for Foodbank.LoadTyped.
type FoodbankLoadMatch struct {
	Id string `json:"id"`
}

// FoodbankListMatch mirrors the foodbank fields as an all-optional match
// filter (Go analog of Partial<Foodbank>).
type FoodbankListMatch struct {
	Address *string `json:"address,omitempty"`
	Email *string `json:"email,omitempty"`
	ItemsNeeded *[]any `json:"items_needed,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	Name *string `json:"name,omitempty"`
	Need *map[string]any `json:"need,omitempty"`
	Phone *string `json:"phone,omitempty"`
	Postcode *string `json:"postcode,omitempty"`
	ShoppingListUrl *string `json:"shopping_list_url,omitempty"`
	Slug *string `json:"slug,omitempty"`
	Updated *string `json:"updated,omitempty"`
	Url *string `json:"url,omitempty"`
}

// Item is the typed data model for the item entity.
type Item struct {
	Created *string `json:"created,omitempty"`
	FoodbankSlug *string `json:"foodbank_slug,omitempty"`
	Id *int `json:"id,omitempty"`
	Item *string `json:"item,omitempty"`
	Updated *string `json:"updated,omitempty"`
}

// ItemListMatch mirrors the item fields as an all-optional match
// filter (Go analog of Partial<Item>).
type ItemListMatch struct {
	Created *string `json:"created,omitempty"`
	FoodbankSlug *string `json:"foodbank_slug,omitempty"`
	Id *int `json:"id,omitempty"`
	Item *string `json:"item,omitempty"`
	Updated *string `json:"updated,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
