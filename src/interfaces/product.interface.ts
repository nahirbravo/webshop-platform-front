import type { User } from "./user.interface";

export interface Product {
    id:          string;
    title:       string;
    price:       number;
    description: string;
    slug:        string;
    stock:       number;
    sizes:       Size[];
    gender:      string;
    tags:        string[];
    images:      string[];
    user:        User;
    products: Product[]
}

export type Size = 'XS'| 'S' | 'M' | 'L' | 'XL' | 'XXL';

export type Gender = 'Women' | 'Men' | 'Kids'| 'Unisex';