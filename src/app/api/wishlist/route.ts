import { isValidProductId } from "@/db/helpers/validationProductId";
import UserModel from "@/db/models/user";
import WishlistModel from "@/db/models/wishlist";
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    try {
        let idUserLogin = request.headers.get('x-user-id-login')
        if (idUserLogin) {
            let data = await WishlistModel.getWishlistUserLogin(idUserLogin)
            return NextResponse.json(data, { status: 200 })
        } else {
            throw new Error("Invalid token")
        }
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}