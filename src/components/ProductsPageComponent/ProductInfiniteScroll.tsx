'use client'
import { FaCartFlatbed } from "react-icons/fa6"
import CardProduct from "@/components/CardProduct"
import InfiniteScroll from 'react-infinite-scroll-component'
import { Product } from "@/type/typeProduct"

export default function ProductInfiniteScroll({ getAllProduct, hasMore, products }: {
  getAllProduct: () => Promise<void>
  hasMore: boolean
  products: Product[]
}) {
  return (
    <>
      <InfiniteScroll
        dataLength={products.length}
        next={getAllProduct}
        hasMore={hasMore}
        loader={
          <div className="flex flex-col items-center mt-10">
            <span className="loading loading-spinner loading-md mb-3"></span>
            <p className="text-xl font-semibold font-serif">Loading...</p>
          </div>
        }
        endMessage={
          <div style={{ textAlign: 'center' }} className="mt-10">
            <div className="flex justify-center items-center">
              <p className="text-xl font-semibold mr-2">No additional products available.</p>
              <FaCartFlatbed size={35} />
            </div>
          </div>
        }
      >
        <div className="flex flex-wrap pb-5 justify-center gap-6">
          {products.map((product, i) => (
            <CardProduct key={i} product={product} />
          ))}
        </div>
      </InfiniteScroll>
    </>
  )
}
