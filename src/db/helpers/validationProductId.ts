export function isValidProductId(productId: string): boolean {
    let isValid = /^[0-9a-fA-F]{24}$/.test(productId)
    return isValid
}