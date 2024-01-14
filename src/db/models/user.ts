import { ObjectId } from "mongodb";
import { getCollection } from "../config";
import { comparePassword, hashPassword } from "../helpers/bcryptjs";
import { z } from "zod"
import { InputLogin, NewInputUser, User } from "@/type/typeUser";
import * as jose from 'jose'

const NewInputUserSchema = z.object({
    name: z.string(
        {
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
        }).min(4, {
            message: "Name must be 4 or more characters long"
        }),
    username: z.string(
        {
            required_error: "Username is required",
            invalid_type_error: "Username must be a string",
        }).min(4, {
            message: "Username must be 4 or more characters long"
        }),
    email: z.string(
        {
            required_error: "Email is required",
            invalid_type_error: "Email must be a string",
        }).email(),
    password: z.string(
        {
            required_error: "Password is required",
            invalid_type_error: "Password must be a string",
        }).min(5, {
            message: "Password must be 5 or more characters long"
        }),
    profileImg: z.string(
        {
            required_error: "Profile image url is required",
            invalid_type_error: "Profile image url must be a string",
        }).url({
            message: "Profile image url is invalid"
        })
})

const InputRegisterSchema = z.object({
    email: z.string(
        {
            required_error: "Email is required",
            invalid_type_error: "Email must be a string",
        }).email(),
    password: z.string(
        {
            required_error: "Password is required",
            invalid_type_error: "Password must be a string",
        }),
})

class UserModel {
    static getCollection() {
        return getCollection('users')
    }

    static async register(newUser: NewInputUser) {
        let validateResult = NewInputUserSchema.safeParse(newUser)
        if (!validateResult.success) {
            throw validateResult.error
        }
        let checkUsername = (await this.getCollection().findOne({
            username: newUser.username
        })) as User | null
        if (checkUsername) {
            throw new Error("Username already exists")
        }
        let checkEmail = (await this.getCollection().findOne({
            email: newUser.email
        })) as User | null
        if (checkEmail) {
            throw new Error("E-mail already exists")
        }
        return await this.getCollection().insertOne({
            ...newUser,
            password: hashPassword(newUser.password)
        })
    }

    static async login(body:InputLogin) {
        let validateResult = InputRegisterSchema.safeParse(body)
        if(!validateResult.success){
            throw validateResult.error
        }
        let findUserByEmail = await this.findUserByEmail(body.email)
        if (!findUserByEmail) {
            throw new Error("Invalid email/password")
        }
        let checkPassword = comparePassword(body.password, findUserByEmail.password)
        if (!checkPassword) {
            throw new Error("Invalid email/password")
        }
        let secret = new TextEncoder().encode(process.env.NEXT_JWT_SECRET as string)
        let alg = 'HS256'
        let jwt = await new jose.SignJWT({
            _id: findUserByEmail._id,
            username: findUserByEmail.username,
            email: findUserByEmail.email
        })
            .setProtectedHeader({ alg })
            .setIssuedAt()
            .sign(secret)
        return jwt
    }

    static async findAllUsers() {
        return (await this.getCollection().find({}, {
            projection: { password: 0 }
        }).toArray()) as User[]
    }

    static async findUserById(id: string) {
        return (await this.getCollection().findOne(
            {
                _id: new ObjectId(id)
            },
            {
                projection: { password: 0 }
            }
        )) as User | null
    }

    static async findUserByEmail(email: string) {
        let findUser = (await this.getCollection().findOne({
            email
        })) as User | null
        return findUser as User
    }
}

export default UserModel