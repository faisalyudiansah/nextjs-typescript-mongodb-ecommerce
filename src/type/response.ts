export type MyResponse<T> = {
    data?: T | null,
    message?: string,
    error?: string
}