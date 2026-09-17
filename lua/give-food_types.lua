-- Typed models for the GiveFood SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Article
---@field foodbank_slug? string
---@field id? number
---@field published? string
---@field source? string
---@field title? string
---@field url? string

---@class ArticleListMatch
---@field format? string

---@class DonationPoint
---@field address? string
---@field foodbank_slug? string
---@field latitude? number
---@field longitude? number
---@field name? string
---@field postcode? string
---@field slug? string
---@field type? string

---@class DonationPointLoadMatch
---@field slug string
---@field format? string

---@class DonationPointListMatch
---@field format? string

---@class FoodBank
---@field address? string
---@field email? string
---@field items_needed? table
---@field latitude? number
---@field longitude? number
---@field name? string
---@field needs? table
---@field phone? string
---@field postcode? string
---@field shopping_list_url? string
---@field slug? string
---@field updated? string
---@field url? string

---@class FoodBankLoadMatch
---@field slug string
---@field format? string

---@class FoodBankListMatch
---@field format? string

---@class Item
---@field created? string
---@field foodbank_slug? string
---@field id? number
---@field item? string
---@field updated? string

---@class ItemListMatch
---@field format? string

local M = {}

return M
