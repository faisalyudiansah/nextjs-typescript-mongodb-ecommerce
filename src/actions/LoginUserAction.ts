'use server'
import { InputLogin, LoginResponse } from "@/type/typeUser";
import { redirect } from "next/navigation";
import { cookies } from 'next/headers'
export async function login(inputLogin: InputLogin) {
    let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputLogin),
        cache: 'no-store'
    })
    let result = await res.json()
    if (!res.ok) {
        throw new Error(result.error)
    }
    cookies().set('Authorization', `Bearer ${result.access_token as string}`)
    redirect('/')
}