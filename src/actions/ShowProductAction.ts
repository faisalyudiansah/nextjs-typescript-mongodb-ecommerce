'use server'
import { ShowAllProduct } from "@/type/typeProduct"

export async function getAllDataProduct(page: number, limit: number, searchKeyword: string | null): Promise<ShowAllProduct> {
    try {
        let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/pagination-search?page=${page}&limit=${limit}&search=${searchKeyword}`)
        if (!res.ok) {
            throw new Error('Failed to fetch data')
        }
        return await res.json()
    } catch (error) {
        console.log(error)
        throw error
    }
}