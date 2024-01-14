import { comparePassword } from '@/db/helpers/bcryptjs'
import UserModel from '@/db/models/user'
import { InputLogin, User } from '@/type/typeUser'
import { NextResponse, NextRequest } from 'next/server'
import { ZodError } from 'zod'
export async function POST(request: NextRequest) {
    try {
        let body: InputLogin = await request.json()
        let access_token = await UserModel.login(body)
        return NextResponse.json({
            message: "Login successfully",
            access_token
        }, { status: 200 })
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json({ error: error.issues[0].message }, { status: 400 })
        }
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 })
        }
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}