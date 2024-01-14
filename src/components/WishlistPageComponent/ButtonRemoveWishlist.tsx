'use client'
import { ObjectId } from "mongodb";
import { useCookies } from 'next-client-cookies'
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";
import { RemoveWishlistAction } from "@/actions/RemoveWishlistAction";
export default function ButtonRemoveWishlist({ productId, setRefresh }: {
    productId: ObjectId,
    setRefresh: (value: boolean) => void
}) {
    let cookies = useCookies()
    let [isLoading, setIsLoading] = useState<boolean>(false)

    let removeWishlist = async () => {
        try {
            setIsLoading(true)
            let getCookie = cookies.get('Authorization')
            let access_token = getCookie?.split(' ')[1]
            if (productId && access_token) {
                await RemoveWishlistAction(productId, access_token)
                Swal.fire({
                    text: "Product has been removed from your wishlist",
                    icon: "success"
                })
                setRefresh(true)
            }
        } catch (error) {
            console.log(error)
            if (error instanceof Error) {
                console.log(error.message)
                Swal.fire({
                    icon: 'error',
                    text: error.message,
                });
            }
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <button onClick={removeWishlist} className="btn bg-base-300 hover:bg-base-200">
            {isLoading ? (
                <div className="flex justify-center items-center">
                    <span className="loading loading-spinner loading-md mr-2"></span>
                    Loading...
                </div>
            ) : (
                <div className="flex items-center">
                    <FaTrashAlt className='text-xl mr-2' /> Remove from wishlist
                </div>
            )}
        </button>
    )
}