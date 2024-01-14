import { ObjectId } from "mongodb";
import { Product } from "./typeProduct";

export type Wishlist = {
    _id: ObjectId,
    userId: ObjectId,
    productId: ObjectId,
    createdAt: Date,
    updatedAt: Date
}

export type GetWishlistUser = {
    _id: ObjectId,
    userId: ObjectId,
    productId: ObjectId,
    createdAt: Date,
    updatedAt: Date
    products: Product
}

export type NewWishlist = Omit<Wishlist, '_id'>