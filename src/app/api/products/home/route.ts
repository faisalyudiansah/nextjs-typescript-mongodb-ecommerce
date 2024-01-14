import ProductModel from "@/db/models/product"
import { NextResponse, NextRequest } from 'next/server'

// bahaya naruh route home disini tapi so far so good
export async function GET(request: NextRequest) {
    try {
        const data = await ProductModel.showProductsHome()
        return NextResponse.json({ data }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}