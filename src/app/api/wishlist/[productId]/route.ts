import { isValidProductId } from '@/db/helpers/validationProductId';
import ProductModel from '@/db/models/product'
import WishlistModel from '@/db/models/wishlist'
import { NextResponse, NextRequest } from 'next/server'

export async function POST(request: NextRequest, { params }: { params: { productId: string } }) {
    try {
        let idUserLogin = request.headers.get('x-user-id-login')
        if (!isValidProductId(params.productId)) {
            throw new Error("Invalid product id");
        }
        await ProductModel.getProductById(params.productId)
        if (idUserLogin) {
            let result = await WishlistModel.addToWishlist(idUserLogin, params.productId)
            return NextResponse.json(result, { status: 201 })
        } else {
            throw new Error("Invalid token")
        }
    } catch (error) {
        if ((error as Error).message === "Invalid token") {
            return NextResponse.json({ error: (error as Error).message }, { status: 401 })
        }
        if ((error as Error).message === "Invalid product id") {
            return NextResponse.json({ error: (error as Error).message }, { status: 400 });
        }
        if ((error as Error).message === "Cannot find a product with that id") {
            return NextResponse.json({ error: (error as Error).message }, { status: 404 })
        }
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { productId: string } }) {
    try {
        let idUserLogin = request.headers.get('x-user-id-login')
        if (!isValidProductId(params.productId)) {
            throw new Error("Invalid product id");
        }
        await WishlistModel.findWishlistWithProductId(params.productId)
        if (idUserLogin) {
            let result = await WishlistModel.removeWishlistUser(idUserLogin, params.productId)
            return NextResponse.json(result, { status: 200 })
        } else {
            throw new Error("Invalid token")
        }
    } catch (error) {
        if ((error as Error).message === "Invalid token") {
            return NextResponse.json({ error: (error as Error).message }, { status: 401 })
        }
        if ((error as Error).message === "Invalid product id") {
            return NextResponse.json({ error: (error as Error).message }, { status: 400 });
        }
        if ((error as Error).message === "Cannot find a product with that id in your wishlist") {
            return NextResponse.json({ error: (error as Error).message }, { status: 404 })
        }
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}