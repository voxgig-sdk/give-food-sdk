# frozen_string_literal: true

# Typed models for the GiveFood SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Article entity data model.
#
# @!attribute [rw] foodbank_slug
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] published
#   @return [String, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Article = Struct.new(
  :foodbank_slug,
  :id,
  :published,
  :source,
  :title,
  :url,
  keyword_init: true
)

# Request payload for Article#list.
#
# @!attribute [rw] format
#   @return [String, nil]
ArticleListMatch = Struct.new(
  :format,
  keyword_init: true
)

# DonationPoint entity data model.
#
# @!attribute [rw] address
#   @return [String, nil]
#
# @!attribute [rw] foodbank_slug
#   @return [String, nil]
#
# @!attribute [rw] latitude
#   @return [Float, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] postcode
#   @return [String, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
DonationPoint = Struct.new(
  :address,
  :foodbank_slug,
  :latitude,
  :longitude,
  :name,
  :postcode,
  :slug,
  :type,
  keyword_init: true
)

# Request payload for DonationPoint#load.
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] format
#   @return [String, nil]
DonationPointLoadMatch = Struct.new(
  :slug,
  :format,
  keyword_init: true
)

# Request payload for DonationPoint#list.
#
# @!attribute [rw] format
#   @return [String, nil]
DonationPointListMatch = Struct.new(
  :format,
  keyword_init: true
)

# FoodBank entity data model.
#
# @!attribute [rw] address
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] items_needed
#   @return [Array, nil]
#
# @!attribute [rw] latitude
#   @return [Float, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] needs
#   @return [Hash, nil]
#
# @!attribute [rw] phone
#   @return [String, nil]
#
# @!attribute [rw] postcode
#   @return [String, nil]
#
# @!attribute [rw] shopping_list_url
#   @return [String, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] updated
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
FoodBank = Struct.new(
  :address,
  :email,
  :items_needed,
  :latitude,
  :longitude,
  :name,
  :needs,
  :phone,
  :postcode,
  :shopping_list_url,
  :slug,
  :updated,
  :url,
  keyword_init: true
)

# Request payload for FoodBank#load.
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] format
#   @return [String, nil]
FoodBankLoadMatch = Struct.new(
  :slug,
  :format,
  keyword_init: true
)

# Request payload for FoodBank#list.
#
# @!attribute [rw] format
#   @return [String, nil]
FoodBankListMatch = Struct.new(
  :format,
  keyword_init: true
)

# Item entity data model.
#
# @!attribute [rw] created
#   @return [String, nil]
#
# @!attribute [rw] foodbank_slug
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] item
#   @return [String, nil]
#
# @!attribute [rw] updated
#   @return [String, nil]
Item = Struct.new(
  :created,
  :foodbank_slug,
  :id,
  :item,
  :updated,
  keyword_init: true
)

# Request payload for Item#list.
#
# @!attribute [rw] format
#   @return [String, nil]
ItemListMatch = Struct.new(
  :format,
  keyword_init: true
)

