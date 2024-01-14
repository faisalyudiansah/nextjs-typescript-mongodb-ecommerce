'use client'
import ProductInfiniteScroll from "@/components/ProductsPageComponent/ProductInfiniteScroll";
import SearchInput from "@/components/ProductsPageComponent/SearchInput";
import { Product, ShowAllProduct } from "@/type/typeProduct"
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { LuSearchX } from "react-icons/lu";
import { getAllDataProduct } from "@/actions/ShowProductAction";
export default function Products() {
  let [searchKeyword, setSearchKeyword] = useState<string>('')
  let [page, setPage] = useState<number>(1)
  let [limit, setLimit] = useState<number>(3)
  let [products, setProducts] = useState<Product[]>([])
  let [hasMore, setHasMore] = useState<boolean>(true)
  let debouncedSearchTerm = useDebounce(searchKeyword, 400)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchKeyword(e.target.value)
    setPage(1)
  }

  async function getAllProduct() {
    try {
      let getData: ShowAllProduct = await getAllDataProduct(page, limit, debouncedSearchTerm || searchKeyword)
      if (page > 1) {
        setProducts((prevProducts) => [...prevProducts, ...getData.data])
      } else {
        setProducts(getData.data)
      }
      if (getData.page < getData.page_count_or_total_page) {
        setHasMore(true)
      } else {
        setHasMore(false)
      }
      setPage(page + 1)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllProduct()
  }, [debouncedSearchTerm])

  useEffect(() => {
    handleChange({
      target: {
        value: searchKeyword || ""
      },
    } as ChangeEvent<HTMLInputElement>)
  }, [searchKeyword])

  return (
    <>
      <div className="m-3 md:m-10">
        <div className="mockup-window border bg-base-200 p-10 flex flex-col shadow-lg">
          <h2 className="font-bold flex justify-center font-serif mb-7 text-2xl">All Products</h2>
          <SearchInput handleChange={handleChange} searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} />
          <div className="flex flex-wrap pb-5 justify-center gap-6">
            {debouncedSearchTerm && products.length === 0 ? (
              <div style={{ textAlign: 'center' }} className="mt-10">
                <div className="flex justify-center items-center">
                  <p className="text-xl font-semibold mr-2">No product found.</p>
                  <LuSearchX size={35} />
                </div>
              </div>
            ) : (
              <ProductInfiniteScroll getAllProduct={getAllProduct} hasMore={hasMore} products={products} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}