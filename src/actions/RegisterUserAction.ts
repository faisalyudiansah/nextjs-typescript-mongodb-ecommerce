'use server'
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createUser(formData: FormData) {
    const newInputRegister = {
        name: formData.get('name'),
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        profileImg: "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg",
    }
    let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInputRegister),
    })
    let result = await res.json()
    if (!res.ok) {
        redirect(`/register?error=${result.error}`)
    }
    revalidatePath('/products')
    redirect(`/login?message=${result.message}`)
}