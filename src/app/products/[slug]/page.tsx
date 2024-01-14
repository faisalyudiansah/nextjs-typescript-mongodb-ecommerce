import GalleryImages from "@/components/DetailProductPageComponent/GalleryImages";
import { Product } from "@/type/typeProduct";
import { FaHeartCirclePlus } from "react-icons/fa6";
import type { Metadata, ResolvingMetadata } from 'next'
import ButtonAddWishlist from "@/components/ButtonAddWishlist";

type ProductDetail = {
  data: Product
}

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  let { slug } = params
  let product = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${slug}`)
    .then((res) => res.json()) as ProductDetail
  return {
    title: `Laptop Room - ${product.data.name}`,
    description: product.data.description,
  }
}


async function getProductDetail(slug: string): Promise<ProductDetail> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${slug}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

function setCurrency(price: number): string {
  return price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })
}

export default async function ProductDetail({ params }: { params: { slug: string } }) {
  const dataProductDetail = await getProductDetail(params.slug);

  return (
    <>
      <div className="py-6 bg-base-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">

              <GalleryImages
                dataProductDetail={dataProductDetail}
              />

            </div>
            <div className="md:flex-1 px-4">
              <div className="mockup-window bg-base-100">
                <div className="px-6 py-8 bg-base-300">
                  <h2 className="mb-2 leading-tight tracking-tight font-bold font-serif text-2xl md:text-3xl">{dataProductDetail.data.name}</h2>
                  <p className="text-sm">Tags:&nbsp;
                    <span className="text-base font-semibold">
                      {dataProductDetail.data.tags.join(', ')}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex justify-center md:justify-start items-center space-x-4 my-4">
                <div>
                  <span className="indicator-item badge badge-base-content">20% Discount</span>
                  <div className="rounded-lg bg-base-300 flex py-2 px-3">
                    <span className="font-bold text-3xl">{setCurrency(dataProductDetail.data.price)}</span>
                  </div>
                </div>
              </div>
              <div className="text-justify md:mt-11 mt-4">
                <p>{dataProductDetail.data.excerpt}</p>
                <p className="mt-3">
                  <span className="font-semibold">Description : </span>
                  {dataProductDetail.data.description}
                </p>
              </div>

              <div className="flex py-4">
                <ButtonAddWishlist productId={dataProductDetail.data._id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}