# Typed models for the GiveFood SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Article:
    foodbank_slug: Optional[str] = None
    id: Optional[int] = None
    published: Optional[str] = None
    source: Optional[str] = None
    title: Optional[str] = None
    url: Optional[str] = None


@dataclass
class ArticleListMatch:
    foodbank_slug: Optional[str] = None
    id: Optional[int] = None
    published: Optional[str] = None
    source: Optional[str] = None
    title: Optional[str] = None
    url: Optional[str] = None


@dataclass
class Donationpoint:
    address: Optional[str] = None
    foodbank_slug: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    name: Optional[str] = None
    postcode: Optional[str] = None
    slug: Optional[str] = None
    type: Optional[str] = None


@dataclass
class DonationpointLoadMatch:
    id: str


@dataclass
class DonationpointListMatch:
    address: Optional[str] = None
    foodbank_slug: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    name: Optional[str] = None
    postcode: Optional[str] = None
    slug: Optional[str] = None
    type: Optional[str] = None


@dataclass
class Foodbank:
    address: Optional[str] = None
    email: Optional[str] = None
    items_needed: Optional[list] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    name: Optional[str] = None
    need: Optional[dict] = None
    phone: Optional[str] = None
    postcode: Optional[str] = None
    shopping_list_url: Optional[str] = None
    slug: Optional[str] = None
    updated: Optional[str] = None
    url: Optional[str] = None


@dataclass
class FoodbankLoadMatch:
    id: str


@dataclass
class FoodbankListMatch:
    address: Optional[str] = None
    email: Optional[str] = None
    items_needed: Optional[list] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    name: Optional[str] = None
    need: Optional[dict] = None
    phone: Optional[str] = None
    postcode: Optional[str] = None
    shopping_list_url: Optional[str] = None
    slug: Optional[str] = None
    updated: Optional[str] = None
    url: Optional[str] = None


@dataclass
class Item:
    created: Optional[str] = None
    foodbank_slug: Optional[str] = None
    id: Optional[int] = None
    item: Optional[str] = None
    updated: Optional[str] = None


@dataclass
class ItemListMatch:
    created: Optional[str] = None
    foodbank_slug: Optional[str] = None
    id: Optional[int] = None
    item: Optional[str] = None
    updated: Optional[str] = None

