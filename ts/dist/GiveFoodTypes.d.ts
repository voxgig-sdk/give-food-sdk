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
export interface DonationPoint {
    address?: string;
    foodbank_slug?: string;
    latitude?: number;
    longitude?: number;
    name?: string;
    postcode?: string;
    slug?: string;
    type?: string;
}
export interface DonationPointLoadMatch {
    slug: string;
    format?: string;
}
export interface DonationPointListMatch {
    format?: string;
}
export interface FoodBank {
    address?: string;
    email?: string;
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
export interface FoodBankLoadMatch {
    slug: string;
    format?: string;
}
export interface FoodBankListMatch {
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
