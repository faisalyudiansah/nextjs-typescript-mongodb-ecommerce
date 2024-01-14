import ProductModel from "@/db/models/product"
import { ShowAllProduct } from "@/type/typeProduct"
import { NextResponse, NextRequest } from 'next/server'

// INI UNTUK INFINTE SCROLL
export async function GET(request: NextRequest, { params }: { params: {} }) {
    try {
        let page: number | null = Number(request.nextUrl.searchParams.get('page'))
        let limit: number | null = Number(request.nextUrl.searchParams.get('limit'))
        let search: string | null = request.nextUrl.searchParams.get('search')
        const data: ShowAllProduct = await ProductModel.allProductPagenation(page, limit, search)
        return NextResponse.json(data, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}