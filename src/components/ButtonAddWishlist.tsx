'use client'
import { FaHeartCirclePlus, FaHeart } from "react-icons/fa6"
import { ObjectId } from "mongodb"
import { useCookies } from 'next-client-cookies'
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { AddWishlistAction } from "@/actions/AddWishlistAction"
import { GetWishlistUser } from "@/type/typeWishlist"
export default function ButtonAddWishlist({ productId }: {
  productId: ObjectId
}) {
  let cookies = useCookies()
  let [addClick, setAddClick] = useState<boolean>(false)
  let [isLoading, setIsLoading] = useState<boolean>(false)
  let [isInWishlist, setIsInWishlist] = useState<boolean>(false)

  useEffect(() => {
    let checkWishlistStatus = async () => {
      try {
        let getCookie = cookies.get('Authorization')
        let access_token = getCookie?.split(' ')[1]

        if (productId && access_token) {
          let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist`, {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + access_token,
            },
          })
          let result: GetWishlistUser[] = await res.json()
          let isInWishlist = result.some((wishlistItem) => wishlistItem.products._id === productId)
          setIsInWishlist(isInWishlist)
        }
      } catch (error) {
        console.error(error)
      }
    }

    checkWishlistStatus()
  }, [productId, cookies])

  let addToWishlist = async () => {
    try {
      setIsLoading(true)
      let getCookie = cookies.get('Authorization')
      let access_token = getCookie?.split(' ')[1]
      if (productId && access_token) {
        await AddWishlistAction(productId, access_token)
        setAddClick(true)
        Swal.fire({
          text: "Added to wishlist successfully!",
          icon: "success"
        })
      }
    } catch (error) {
      console.log(error)
      if (error instanceof Error) {
        console.log(error.message)
        Swal.fire({
          icon: 'error',
          text: error.message,
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {!isInWishlist ? (
        addClick ? (
          <button disabled className="btn bg-base-300 hover:bg-base-200">
            <div className="flex items-center">
              <FaHeart className='text-xl mr-2' /> On your wishlist
            </div>
          </button>
        ) : (
          <button onClick={addToWishlist} className="btn bg-base-300 hover:bg-base-200">
            {isLoading ? (
              <div className="flex justify-center items-center">
                <span className="loading loading-spinner loading-md mr-2"></span>
                Loading...
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <FaHeartCirclePlus className='text-xl mr-2' /> Add to wishlist
              </div>
            )}
          </button>
        )
      ) : (
        <button disabled className="btn bg-base-300 hover:bg-base-200">
          <div className="flex items-center">
            <FaHeart className='text-xl mr-2' /> On your wishlist
          </div>
        </button>
      )}
    </>
  )
}