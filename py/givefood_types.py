# Typed models for the GiveFood SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Article(TypedDict, total=False):
    foodbank_slug: str
    id: int
    published: str
    source: str
    title: str
    url: str


class ArticleListMatch(TypedDict, total=False):
    foodbank_slug: str
    id: int
    published: str
    source: str
    title: str
    url: str


class Donationpoint(TypedDict, total=False):
    address: str
    foodbank_slug: str
    latitude: float
    longitude: float
    name: str
    postcode: str
    slug: str
    type: str


class DonationpointLoadMatch(TypedDict):
    id: str


class DonationpointListMatch(TypedDict, total=False):
    address: str
    foodbank_slug: str
    latitude: float
    longitude: float
    name: str
    postcode: str
    slug: str
    type: str


class Foodbank(TypedDict, total=False):
    address: str
    email: str
    items_needed: list
    latitude: float
    longitude: float
    name: str
    need: dict
    phone: str
    postcode: str
    shopping_list_url: str
    slug: str
    updated: str
    url: str


class FoodbankLoadMatch(TypedDict):
    id: str


class FoodbankListMatch(TypedDict, total=False):
    address: str
    email: str
    items_needed: list
    latitude: float
    longitude: float
    name: str
    need: dict
    phone: str
    postcode: str
    shopping_list_url: str
    slug: str
    updated: str
    url: str


class Item(TypedDict, total=False):
    created: str
    foodbank_slug: str
    id: int
    item: str
    updated: str


class ItemListMatch(TypedDict, total=False):
    created: str
    foodbank_slug: str
    id: int
    item: str
    updated: str
