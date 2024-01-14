import { ObjectId } from "mongodb";

export type Product = {
    _id: ObjectId,
    name: string,
    slug: string,
    description: string,
    excerpt: string,
    price: number,
    tags: string[],
    thumbnail: string,
    images: string[],
    createdAt: string,
    updatedAt: string
}

export type ShowAllProduct = {
    page: number,
    per_page_or_limit: number,
    page_count_or_total_page: number,
    total_count_or_total_data: number,
    data: Product[]
}