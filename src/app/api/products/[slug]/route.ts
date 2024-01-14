import ProductModel from "@/db/models/product"
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const data = await ProductModel.getProductBySlug(params.slug)
        return NextResponse.json({ data }, { status: 200 })
    } catch (error) {
        if ((error as Error).message === "Cannot find a product with that slug") {
            return NextResponse.json({ error: (error as Error).message }, { status: 404 })
        }
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}