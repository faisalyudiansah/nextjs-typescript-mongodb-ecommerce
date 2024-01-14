'use client'
import CardWishlist from "@/components/WishlistPageComponent/CardWishlist"
import { GetWishlistUser } from "@/type/typeWishlist"
import { useCookies } from 'next-client-cookies'
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { LuFileSearch2 } from "react-icons/lu"
import Link from "next/link"
export default function Wishlist() {
  let cookies = useCookies()
  let [wishlist, setWishlist] = useState<GetWishlistUser[]>([])
  let [loading, setLoading] = useState<boolean>(true)
  let [refresh, setRefresh] = useState<boolean>(false)

  async function getWishlist() {
    try {
      setLoading(true)
      let getCookie = cookies.get('Authorization')
      let access_token = getCookie?.split(' ')[1]
      let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + access_token // FROM COOKIE
        },
      })
      let result: GetWishlistUser[] = await res.json()
      setWishlist(result)
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
      setLoading(false)
    }
  }

  useEffect(() => {
    getWishlist()
    setRefresh(false)
  }, [refresh])

  return (
    <>
      <div className="m-3 md:m-10">
        <div className="mockup-window border bg-base-200 p-10 flex flex-col shadow-lg">
          <h2 className="font-bold flex justify-center font-serif mb-10 text-2xl">Your wishlist</h2>
          <div className="flex flex-wrap pb-5 justify-center gap-6">
            {loading ? (
              <div className="m-10">
                <div className="bg-base-200 p-10 flex flex-col items-center">
                  <h2 className="font-bold flex justify-center font-serif mb-7 text-2xl text-primary-500">Loading...</h2>
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              </div>
            ) : (
              wishlist.length > 0 ? (
                wishlist.map((item, index) => (
                  <CardWishlist key={index} product={item.products} setRefresh={setRefresh} />
                ))
              ) : (
                <div className="mockup-window w-[500px] bg-base-300 shadow-lg">
                  <div className="flex justify-center px-4 py-16 bg-base-100">
                    <div className='text-center'>
                      <div className="mb-5">
                        <LuFileSearch2 size={50} className="mx-auto" />
                      </div>
                      <h2 className='text-xl font-semibold font-sans'>Looks like your wishlist is empty</h2>
                      <h2 className='mb-4 text-sm'>Explore our products and add to your wishlist!</h2>
                      <Link href={'/products'} className="btn bg-base-200 hover:bg-base-300">See all products</Link>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  )
}