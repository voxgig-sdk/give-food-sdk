// Typed models for the GiveFood SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Article {
  foodbank_slug?: string
  id?: number
  published?: string
  source?: string
  title?: string
  url?: string
}

export interface ArticleListMatch {
  foodbank_slug?: string
  id?: number
  published?: string
  source?: string
  title?: string
  url?: string
}

export interface Donationpoint {
  address?: string
  foodbank_slug?: string
  latitude?: number
  longitude?: number
  name?: string
  postcode?: string
  slug?: string
  type?: string
}

export interface DonationpointLoadMatch {
  id: string
}

export interface DonationpointListMatch {
  address?: string
  foodbank_slug?: string
  latitude?: number
  longitude?: number
  name?: string
  postcode?: string
  slug?: string
  type?: string
}

export interface Foodbank {
  address?: string
  email?: string
  items_needed?: any[]
  latitude?: number
  longitude?: number
  name?: string
  need?: Record<string, any>
  phone?: string
  postcode?: string
  shopping_list_url?: string
  slug?: string
  updated?: string
  url?: string
}

export interface FoodbankLoadMatch {
  id: string
}

export interface FoodbankListMatch {
  address?: string
  email?: string
  items_needed?: any[]
  latitude?: number
  longitude?: number
  name?: string
  need?: Record<string, any>
  phone?: string
  postcode?: string
  shopping_list_url?: string
  slug?: string
  updated?: string
  url?: string
}

export interface Item {
  created?: string
  foodbank_slug?: string
  id?: number
  item?: string
  updated?: string
}

export interface ItemListMatch {
  created?: string
  foodbank_slug?: string
  id?: number
  item?: string
  updated?: string
}

