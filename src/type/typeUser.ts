import { ObjectId } from "mongodb";

export type User = {
    _id: ObjectId,
    name: string,
    username: string,
    email: string,
    password: string,
    profileImg: string
}

export type NewInputUser = Omit<User, '_id'>

export type InputLogin = {
    email: string,
    password: string,
}

export type LoginResponse = {
    message?: string,
    access_token?: string,
    error?: string
}

export type PayloadJwt = {
    _id: string,
    username: string,
    email: string
}