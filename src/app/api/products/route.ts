import ProductModel from "@/db/models/product"
import { NextResponse, NextRequest } from 'next/server'

// INI UNTUK MANGGIL SEMUA
export async function GET(request: NextRequest) {
    try {
        const data = await ProductModel.showAllProducts()
        return NextResponse.json(data, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}