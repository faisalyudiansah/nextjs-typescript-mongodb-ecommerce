import Link from "next/link";
import CardProduct from "@/components/CardProduct";
import { Product } from "@/type/typeProduct";

type ProductHome = {
  data: Product[]
}

async function getData(): Promise<ProductHome> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/home`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}
export default async function ListHomeProduct() {
  let dataProducts = await getData()
  return (
    <>
      <section id="products" className='bg-base-300 p-10 min-h-screen'>
        <div className="p-10">
          <div className="mb-5 text-center">
            <h1 className="text-2xl font-bold md:text-4xl font-serif mx-auto">Let&apos;s shop now!</h1>
          </div>
          <div className="flex lg:justify-end justify-center">
            <Link href={'/products'} className="btn bg-base-100 hover:bg-base-200 mr:0 md:mr-20">See all products</Link>
          </div>
        </div>
        <div className="flex flex-wrap pb-5 justify-center gap-6">
          {dataProducts.data.map((product, i) => (
            <CardProduct key={i} product={product} />
          ))}
        </div>
      </section>
    </>
  )
}
