'use server'
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache"

export async function AddWishlistAction(productId: ObjectId, access_token: string) {
    let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist/${productId}`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + access_token // FROM COOKIE
        },
    })
    let result = await res.json()
    if (!res.ok) {
        throw new Error(result.error)
    }
    revalidatePath('/wishlist')
    revalidatePath('/products')
    revalidatePath('/')
}