export interface Article {
    foodbank_slug?: string;
    id?: number;
    published?: string;
    source?: string;
    title?: string;
    url?: string;
}
export interface ArticleListMatch {
    format?: string;
}
export interface Donationpoint {
    address?: string;
    foodbank_slug?: string;
    id?: string;
    latitude?: number;
    longitude?: number;
    name?: string;
    postcode?: string;
    slug?: string;
    type?: string;
}
export interface DonationpointLoadMatch {
    id: string;
    format?: string;
}
export interface DonationpointListMatch {
    format?: string;
}
export interface Foodbank {
    address?: string;
    email?: string;
    id?: string;
    items_needed?: any[];
    latitude?: number;
    longitude?: number;
    name?: string;
    needs?: Record<string, any>;
    phone?: string;
    postcode?: string;
    shopping_list_url?: string;
    slug?: string;
    updated?: string;
    url?: string;
}
export interface FoodbankLoadMatch {
    id: string;
    format?: string;
}
export interface FoodbankListMatch {
    format?: string;
}
export interface Item {
    created?: string;
    foodbank_slug?: string;
    id?: number;
    item?: string;
    updated?: string;
}
export interface ItemListMatch {
    format?: string;
}
