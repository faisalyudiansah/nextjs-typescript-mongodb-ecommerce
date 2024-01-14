import { ShowAllProduct, Product } from "@/type/typeProduct"
import { getCollection } from "../config"
import { ObjectId } from "mongodb"
import { isValidProductId } from "../helpers/validationProductId"

class ProductModel {
    static getCollection() {
        return getCollection('products')
    }

    static async showProductsHome() {
        return (await this.getCollection().find().sort({ createdAt: -1 }).limit(6).toArray()) as Product[]
    }

    static async showAllProducts() {
        return (await this.getCollection().find().sort({ createdAt: -1 }).toArray()) as Product[]
    }

    static async allProductPagenation(page: number, limit: number, search: string | null) {
        let queryToFind = search ? { name: new RegExp(search, 'i') } : {}
        let skip = (page - 1) * limit
        let totalData = await this.getCollection().countDocuments(queryToFind)
        let totalPage = Math.ceil(totalData / limit)
        let data = await this.getCollection()
            .find(queryToFind)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .toArray()
        let result: ShowAllProduct = {
            page,
            per_page_or_limit: limit,
            page_count_or_total_page: totalPage,
            total_count_or_total_data: totalData,
            data
        }
        return result
    }

    static async getProductBySlug(slugProduct: string) {
        let findProduct = (await this.getCollection().findOne({
            slug: slugProduct,
        })) as Product | null
        if (!findProduct) {
            throw new Error("Cannot find a product with that slug")
        }
        return findProduct
    }

    static async getProductById(productId: string) {
        let findProduct = (await this.getCollection().findOne({
            _id: new ObjectId(productId),
        })) as Product | null
        if (!findProduct) {
            throw new Error("Cannot find a product with that id")
        }
        return findProduct
    }
}

export default ProductModel