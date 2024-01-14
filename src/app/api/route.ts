import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    return NextResponse.json({ message: 'Server is running...' }, { status: 200 })
}