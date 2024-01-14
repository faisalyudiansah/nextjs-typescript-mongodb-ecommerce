import UserModel from "@/db/models/user";
import { ZodError } from "zod";
import { NextResponse, NextRequest } from 'next/server'
import { NewInputUser } from "@/type/typeUser";
export async function POST(request: NextRequest) {
    try {
        const body: NewInputUser = await request.json()
        await UserModel.register(body)
        return NextResponse.json({ 
            message: "Your registration is successfully",
            email: body.email
        }, { status: 201 })
    } catch (error) {
        if (error instanceof ZodError) {
            // const err = error.issues[0].path + ' ' + error.issues[0].message
            return NextResponse.json({ error: error.issues[0].message }, { status: 400 })
        }
        if ((error as Error).message === "Username already exists" ||
            (error as Error).message === "E-mail already exists"
        ) {
            return NextResponse.json({ error: (error as Error).message }, { status: 400 })
        }
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}