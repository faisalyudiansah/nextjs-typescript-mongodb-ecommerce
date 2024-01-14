import { ObjectId } from "mongodb";
import { getCollection } from "../config";
import { GetWishlistUser, NewWishlist, Wishlist } from "@/type/typeWishlist";
class WishlistModel {
    static getCollection() {
        return getCollection('wishlists')
    }

    static async addToWishlist(idUserLogin: string, productId: string) {
        let newRawWishlist: NewWishlist = {
            userId: new ObjectId(idUserLogin),
            productId: new ObjectId(productId),
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        await this.getCollection().insertOne(newRawWishlist)
        return newRawWishlist
    }

    static async getWishlistUserLogin(idUserLogin: string) {
        let agg = [
            {
                '$match': {
                    'userId': new ObjectId(idUserLogin)
                }
            }, {
                '$lookup': {
                    'from': 'products',
                    'localField': 'productId',
                    'foreignField': '_id',
                    'as': 'products'
                }
            }, {
                '$unwind': {
                    'path': '$products',
                    'preserveNullAndEmptyArrays': true
                }
            }
        ];
        let wishlistItems = await this.getCollection().aggregate(agg).toArray()
        return wishlistItems as GetWishlistUser[]
    }


    static async findWishlistWithProductId(productId: string) {
        let findWishlist = (await this.getCollection().findOne({
            productId: new ObjectId(productId),
        })) as Wishlist | null
        if(!findWishlist){
            throw new Error("Cannot find a product with that id in your wishlist")
        }
        return findWishlist
    }

    static async removeWishlistUser(idUserLogin: string, productId: string) {
        await this.getCollection().deleteOne({
            userId: new ObjectId(idUserLogin),
            productId: new ObjectId(productId),
        })
        return { message: `Product with ID ${productId} has been removed from wishlist` };
    }
}

export default WishlistModel